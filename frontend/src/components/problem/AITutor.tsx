import { useState } from "react";
import { Lightbulb, BookOpen, Clock, Brain, Sparkles, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface AITutorProps {
  problemTitle: string;
  problemDescription: string;
  constraints: string[];
}

const actions = [
  { key: "hint", label: "Get Hint", icon: Lightbulb, color: "text-medium" },
  { key: "explain", label: "Explain Solution", icon: BookOpen, color: "text-primary" },
  { key: "complexity", label: "Complexity Analysis", icon: Clock, color: "text-accent" },
  { key: "similar", label: "Similar Problems", icon: Brain, color: "text-easy" },
];

const AI_TUTOR_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

function getFallbackResponse(type: string, title: string, customQuestion?: string): string {
  const responses: Record<string, string> = {
    hint: `💡 **Hint for "${title}"**\n\nThink about which data structure gives the most efficient lookup. Consider:\n- Can a **hash map** reduce your search from O(n) to O(1)?\n- Is there a **sorting** step that simplifies the logic?\n- Could **two pointers** or a **sliding window** help?\n\nTry to solve it in a single pass before optimizing further.`,
    explain: `📖 **General Approach**\n\nFor most DSA problems, follow this framework:\n\n1. **Understand** — Restate the problem in your own words\n2. **Examples** — Trace through the given examples by hand\n3. **Brute Force** — Write the simplest correct solution first\n4. **Optimize** — Identify repeated work and use better data structures\n5. **Code** — Implement cleanly with edge case handling\n6. **Test** — Verify with edge cases (empty input, single element, duplicates)`,
    complexity: `⏱️ **Complexity Cheat Sheet**\n\n| Approach | Time | Space |\n|---|---|---|\n| Brute force (nested loops) | O(n²) | O(1) |\n| Hash map single pass | O(n) | O(n) |\n| Sort + two pointers | O(n log n) | O(1) |\n| Binary search | O(log n) | O(1) |\n| BFS/DFS on graph | O(V + E) | O(V) |\n| Dynamic programming | O(n × m) | O(n) or O(n × m) |\n\nAlways consider the tradeoff between time and space.`,
    similar: `🔗 **Finding Similar Problems**\n\nTo find related practice:\n1. Identify the **core technique** (hash map, two pointers, BFS, DP, etc.)\n2. Search by **topic tag** in the problems list\n3. Look for problems with the same **difficulty level**\n4. Practice variations with different **constraints** (sorted input, negative numbers, etc.)`,
  };
  if (customQuestion) {
    return `I can't reach the AI service right now, but here's a practical guide for **${title}** based on your question:\n\n` +
      `- Question: **${customQuestion}**\n` +
      `- Start with a brute-force approach and write the time complexity\n` +
      `- Identify repeated computations and store prefix/suffix or map state\n` +
      `- Optimize to O(n) where possible, then verify edge cases (empty, duplicates, negatives)\n\n` +
      `If you want, ask: "Give me the optimal approach step-by-step".`;
  }
  return responses[type] || "Try breaking the problem into smaller sub-problems.";
}


const AITutor = ({ problemTitle, problemDescription, constraints }: AITutorProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi! I can help with **hints**, **approaches**, and **complexity** for **${problemTitle}**. Ask me anything about this problem.`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");

  const handleAI = async (type: string, userQuestion?: string) => {
    setActiveType(type);
    setLoading(true);

    if (userQuestion?.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: userQuestion }]);
    }

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const resp = await fetch(AI_TUTOR_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type,
          problemTitle,
          problemDescription,
          constraints,
          userQuestion,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "AI service error" }));
        
        // Fall back to static hints when AI is unavailable (402/429)
        if (resp.status === 402 || resp.status === 429) {
          toast.info("AI credits unavailable — showing general guidance instead");
          const fallback = getFallbackResponse(type, problemTitle, userQuestion);
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: fallback };
            return next;
          });
          setLoading(false);
          return;
        }
        
        toast.error(err.error || "Failed to get AI response");
        setLoading(false);
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      if (!resp.body) {
        toast.error("No response stream");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      const updateAssistant = (content: string) => {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content };
          return next;
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              updateAssistant(fullText);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Flush remaining buffer
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              updateAssistant(fullText);
            }
          } catch {}
        }
      }
    } catch (err) {
      console.error("AI tutor error:", err);
      toast.error("Failed to connect to AI tutor");
      const fallback = getFallbackResponse(type, problemTitle, userQuestion);
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: fallback };
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  const submitQuestion = async () => {
    const question = inputText.trim();
    if (!question || loading) return;
    setInputText("");
    await handleAI("explain", question);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          AI Chat Assistant
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {actions.map(({ key, label, icon: Icon, color }) => (
          <Button
            key={key}
            size="sm"
            variant="outline"
            onClick={() => handleAI(key)}
            disabled={loading}
            className={`justify-start border-border text-foreground hover:bg-secondary h-9 ${
              activeType === key && loading ? "opacity-70" : ""
            }`}
          >
            {activeType === key && loading ? (
              <Loader2 className={`mr-2 h-3.5 w-3.5 animate-spin ${color}`} />
            ) : (
              <Icon className={`mr-2 h-3.5 w-3.5 ${color}`} />
            )}
            {label}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-3 overflow-auto h-[55vh] space-y-3">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="prose prose-sm prose-invert max-w-none [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_code]:text-primary [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-secondary [&_pre]:border [&_pre]:border-border [&_a]:text-primary [&_li]:text-muted-foreground [&_p]:text-muted-foreground">
                  <ReactMarkdown>{message.content || "Thinking..."}</ReactMarkdown>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground px-1">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">AI is typing...</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitQuestion();
            }
          }}
          placeholder="Ask for a hint, approach, dry run, or optimization..."
          disabled={loading}
        />
        <Button onClick={submitQuestion} disabled={loading || !inputText.trim()} className="gap-1.5">
          <Send className="h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default AITutor;
