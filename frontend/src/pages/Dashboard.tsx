import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Flame, CheckCircle, Target, TrendingUp, Loader2, BookOpen } from "lucide-react";

const TOPIC_ORDER = [
  'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List',
  'Trees', 'Tries', 'Heap / Priority Queue', 'Backtracking', 'Graphs', '1-D DP',
  'Intervals', 'Greedy', 'Advanced Graphs', 'Math & Geometry', '2-D DP', 'Bit Manipulation',
];

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  // Fetch all problems (for totals)
  const { data: problems = [], isLoading: problemsLoading } = useQuery({
    queryKey: ["all-problems-dashboard"],
    queryFn: async () => {
      const { data } = await supabase
        .from("problems")
        .select("id, title, difficulty, topic")
        .limit(1000);
      return data || [];
    },
  });

  // Fetch user progress
  const { data: progress = [], isLoading: progressLoading } = useQuery({
    queryKey: ["user-progress", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_problem_progress")
        .select("problem_id, solved, solved_at")
        .eq("user_id", user!.id)
        .eq("solved", true)
        .order("solved_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  const isLoading = problemsLoading || progressLoading;

  // Compute stats
  const solvedIds = new Set(progress.map(p => p.problem_id));
  const totalSolved = solvedIds.size;

  const solvedProblems = problems.filter(p => solvedIds.has(p.id));
  const easySolved = solvedProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardSolved = solvedProblems.filter(p => p.difficulty === 'Hard').length;

  const totalEasy = problems.filter(p => p.difficulty === 'Easy').length;
  const totalMedium = problems.filter(p => p.difficulty === 'Medium').length;
  const totalHard = problems.filter(p => p.difficulty === 'Hard').length;

  // Topic progress
  const topicTotals: Record<string, number> = {};
  const topicSolved: Record<string, number> = {};
  problems.forEach(p => {
    topicTotals[p.topic] = (topicTotals[p.topic] || 0) + 1;
    if (solvedIds.has(p.id)) {
      topicSolved[p.topic] = (topicSolved[p.topic] || 0) + 1;
    }
  });

  // Recently solved (last 10)
  const recentSolved = progress.slice(0, 10).map(prog => {
    const problem = problems.find(p => p.id === prog.problem_id);
    return problem ? { ...problem, solved_at: prog.solved_at } : null;
  }).filter(Boolean) as (typeof problems[number] & { solved_at: string | null })[];

  const streak = profile?.streak ?? 0;

  const stats = [
    { label: "Problems Solved", value: totalSolved, icon: CheckCircle, color: "text-primary" },
    { label: "Current Streak", value: `${streak} days`, icon: Flame, color: "text-medium" },
    { label: "Total Problems", value: problems.length, icon: TrendingUp, color: "text-info" },
    { label: "Completion", value: problems.length > 0 ? `${Math.round((totalSolved / problems.length) * 100)}%` : "0%", icon: Target, color: "text-accent" },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-10 flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-10 pt-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          {profile?.display_name && (
            <p className="mt-1 text-muted-foreground">Welcome back, {profile.display_name}!</p>
          )}
        </div>
        {totalSolved === 0 && (
          <Link to="/problems" className="rounded-lg gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Start Solving →
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
          </div>
        ))}
      </div>

      {/* Difficulty Breakdown */}
      <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-5 text-lg font-semibold text-foreground">Difficulty Breakdown</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Easy", solved: easySolved, total: totalEasy, color: "bg-easy", textColor: "text-easy" },
            { label: "Medium", solved: mediumSolved, total: totalMedium, color: "bg-medium", textColor: "text-medium" },
            { label: "Hard", solved: hardSolved, total: totalHard, color: "bg-hard", textColor: "text-hard" },
          ].map(({ label, solved, total, color, textColor }) => (
            <div key={label} className="rounded-lg bg-secondary/50 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className={`font-medium ${textColor}`}>{label}</span>
                <span className="font-semibold text-foreground">{solved}/{total}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${total > 0 ? (solved / total) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Progress */}
      <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-5 text-lg font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Topic Progress
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_ORDER.filter(t => topicTotals[t]).map(topic => {
            const solved = topicSolved[topic] || 0;
            const total = topicTotals[topic] || 0;
            const pct = total > 0 ? (solved / total) * 100 : 0;
            return (
              <div key={topic} className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3">
                <span className="text-sm font-medium text-foreground">{topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{solved}/{total}</span>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-easy' : 'bg-primary'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Solved */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-5 text-lg font-semibold text-foreground">Recently Solved</h2>
        {recentSolved.length === 0 ? (
          <div className="rounded-lg bg-secondary/30 p-8 text-center">
            <p className="text-muted-foreground mb-3">No problems solved yet.</p>
            <Link to="/problems" className="text-sm font-medium text-primary hover:underline">
              Start practicing →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recentSolved.map(pr => (
              <Link key={pr.id} to={`/problem/${pr.id}`} className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-secondary/50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{pr.title}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  pr.difficulty === 'Easy' ? 'bg-easy/10 text-easy' :
                  pr.difficulty === 'Medium' ? 'bg-medium/10 text-medium' :
                  'bg-hard/10 text-hard'
                }`}>
                  {pr.difficulty}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
