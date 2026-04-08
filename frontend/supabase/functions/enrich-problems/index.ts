import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { batchSize = 3, offset = 0 } = await req.json().catch(() => ({}));

    // Fetch problems with placeholder descriptions
    const { data: problems, error: fetchErr } = await supabase
      .from("problems")
      .select("id, title, difficulty, topic, tags, leetcode_number")
      .or("description.like.Solve the%,description.eq.")
      .order("id", { ascending: true })
      .range(offset, offset + batchSize - 1);

    if (fetchErr) throw fetchErr;
    if (!problems || problems.length === 0) {
      return new Response(JSON.stringify({ message: "No more problems to enrich", done: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: { id: number; title: string; status: string }[] = [];

    for (const problem of problems) {
      try {
        const prompt = `Generate a LeetCode-style problem description for the following coding problem. Return ONLY valid JSON with no markdown formatting.

Problem: "${problem.title}" (LeetCode #${problem.leetcode_number || "N/A"})
Difficulty: ${problem.difficulty}
Topic: ${problem.topic}
Tags: ${(problem.tags || []).join(", ")}

Return JSON with these exact keys:
{
  "description": "A clear problem description (2-4 paragraphs). Include what the function should do, what inputs it takes, and what it returns.",
  "examples": [
    {"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9"},
    {"input": "...", "output": "..."}
  ],
  "constraints": ["1 <= nums.length <= 10^4", "..."],
  "starter_code": {
    "python": "class Solution:\\n    def solve(self, ...):\\n        pass",
    "java": "class Solution {\\n    public ... solve(...) {\\n    }\\n}",
    "cpp": "class Solution {\\npublic:\\n    ... solve(...) {\\n    }\\n};",
    "javascript": "var solve = function(...) {\\n    \\n};"
  }
}

Make the description, examples, and constraints realistic and accurate for this well-known problem. Use the actual function signature from LeetCode if known.`;

        const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: "You are a coding problem writer. Return ONLY valid JSON. No markdown code blocks, no extra text." },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (!aiRes.ok) {
          const errText = await aiRes.text();
          console.error(`AI error for ${problem.title}:`, aiRes.status, errText);
          if (aiRes.status === 429) {
            results.push({ id: problem.id, title: problem.title, status: "rate_limited" });
            // Wait longer before continuing
            await new Promise(r => setTimeout(r, 15000));
            continue;
          }
          results.push({ id: problem.id, title: problem.title, status: `ai_error_${aiRes.status}` });
          continue;
        }

        const aiData = await aiRes.json();
        const content = aiData.choices?.[0]?.message?.content || "";

        // Parse JSON from response (handle markdown code blocks)
        let parsed;
        try {
          const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          parsed = JSON.parse(jsonStr);
        } catch {
          console.error(`JSON parse error for ${problem.title}:`, content.substring(0, 200));
          results.push({ id: problem.id, title: problem.title, status: "parse_error" });
          continue;
        }

        // Update problem in database
        const { error: updateErr } = await supabase
          .from("problems")
          .update({
            description: parsed.description || `Solve the "${problem.title}" problem.`,
            examples: parsed.examples || [],
            constraints: parsed.constraints || [],
            starter_code: parsed.starter_code || {},
          })
          .eq("id", problem.id);

        if (updateErr) {
          console.error(`Update error for ${problem.title}:`, updateErr);
          results.push({ id: problem.id, title: problem.title, status: "update_error" });
        } else {
          results.push({ id: problem.id, title: problem.title, status: "success" });
        }

        // Delay between AI calls to avoid rate limits
        await new Promise(r => setTimeout(r, 3000));
      } catch (err) {
        console.error(`Error processing ${problem.title}:`, err);
        results.push({ id: problem.id, title: problem.title, status: "error" });
      }
    }

    // Check how many remain
    const { count } = await supabase
      .from("problems")
      .select("id", { count: "exact", head: true })
      .or("description.like.Solve the%,description.eq.");

    return new Response(JSON.stringify({
      message: `Processed ${results.length} problems`,
      results,
      remaining: count || 0,
      nextOffset: offset + batchSize,
      done: (count || 0) === 0,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("enrich-problems error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
