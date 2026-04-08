import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProblemById } from "@/hooks/useProblems";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { USE_SPRING_BOOT } from "@/config/backend";
import { progressApi } from "@/services/api";
import ProblemHeader from "@/components/problem/ProblemHeader";
import ProblemDescription from "@/components/problem/ProblemDescription";
import AITutor from "@/components/problem/AITutor";
import { BookOpen, Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getLeetcodeUrl } from "@/lib/leetcode";

const ProblemDetail = () => {
  const { id } = useParams();
  const { data: problem, isLoading, error } = useProblemById(id || "");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"description" | "output" | "ai">("description");

  useEffect(() => {
    // keep hook order stable and avoid stale tab when switching problems
    setActiveTab("description");
  }, [id]);

  const fireConfetti = useCallback(() => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"] });
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#10b981", "#34d399"] });
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#10b981", "#34d399"] });
    }, 250);
  }, []);

  const markProblemSolved = useCallback(async () => {
    if (!problem) return;
    try {
      if (USE_SPRING_BOOT) {
        await progressApi.markSolved(problem.id);
        queryClient.invalidateQueries({ queryKey: ["problem"] });
        queryClient.invalidateQueries({ queryKey: ["problems"] });
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
        queryClient.invalidateQueries({ queryKey: ["daily-challenge"] });
        return;
      }

      if (!user) return;

      const { data: existing } = await supabase
        .from("user_problem_progress")
        .select("solved")
        .eq("user_id", user.id)
        .eq("problem_id", problem.id)
        .maybeSingle();

      if (existing?.solved) return;

      const now = new Date().toISOString();
      const { error: upsertErr } = await supabase
        .from("user_problem_progress")
        .upsert(
          { user_id: user.id, problem_id: problem.id, solved: true, solved_at: now },
          { onConflict: "user_id,problem_id" }
        );
      if (upsertErr) console.error("Progress upsert error:", upsertErr);

      const { data: profile } = await supabase
        .from("profiles")
        .select("problems_solved, streak, updated_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        const lastUpdate = new Date(profile.updated_at);
        const nowDate = new Date();
        const hoursSinceLastUpdate = (nowDate.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        const newStreak = hoursSinceLastUpdate <= 24 ? (profile.streak || 0) + 1 : 1;

        await supabase
          .from("profiles")
          .update({ problems_solved: (profile.problems_solved || 0) + 1, streak: newStreak })
          .eq("user_id", user.id);
      }

      // Daily challenge tracking
      try {
        const today = new Date().toISOString().split("T")[0];
        const { data: dailyChallenge } = await supabase
          .from("daily_challenges")
          .select("problem_id")
          .eq("challenge_date", today)
          .maybeSingle();

        if (dailyChallenge && dailyChallenge.problem_id === problem.id) {
          await supabase
            .from("daily_challenge_solvers")
            .upsert(
              { challenge_date: today, user_id: user.id, solved_at: new Date().toISOString() },
              { onConflict: "challenge_date,user_id" }
            );
        }
      } catch (e) {
        console.error("Daily challenge track error:", e);
      }

      queryClient.invalidateQueries({ queryKey: ["problem"] });
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      queryClient.invalidateQueries({ queryKey: ["navbar-profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["daily-challenge"] });
    } catch (err) {
      console.error("Error marking solved:", err);
    }
  }, [user, problem, queryClient]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Problem not found</h1>
          <Link to="/problems" className="text-primary hover:underline text-sm">Back to problems</Link>
        </div>
      </div>
    );
  }

  const examples = (problem.examples || []) as { input: string; output: string; explanation?: string }[];


  const tabs = [
    { key: "description" as const, label: "Description", icon: BookOpen },
    { key: "ai" as const, label: "AI Tutor", icon: Brain },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 bg-background">
      <div className="flex flex-col h-full">
        <ProblemHeader
          title={problem.title}
          leetcodeNumber={problem.leetcode_number}
          difficulty={problem.difficulty}
          topic={problem.topic}
          tags={problem.tags}
          solved={problem.solved}
          neetcodeLink={problem.neetcode_link}
        />

        <div className="border-b border-border bg-card/40 px-5 py-3 flex flex-wrap items-center gap-2">
          <a
            href={getLeetcodeUrl(problem)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button size="sm" className="gap-1.5">
              Solve on LeetCode
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
          <Button
            size="sm"
            variant="outline"
            onClick={async () => {
              if (!user) {
                toast.info("Please login to track progress");
                return;
              }
              await markProblemSolved();
              fireConfetti();
              toast.success("Marked as solved");
            }}
          >
            Mark Solved
          </Button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-border bg-card/50 px-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all relative ${
                activeTab === key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {activeTab === key && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin max-w-5xl w-full mx-auto">
          {activeTab === "description" && (
            <ProblemDescription
              description={problem.description}
              examples={examples}
              constraints={problem.constraints}
            />
          )}
          {activeTab === "ai" && (
            <AITutor
              problemTitle={problem.title}
              problemDescription={problem.description}
              constraints={problem.constraints}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
