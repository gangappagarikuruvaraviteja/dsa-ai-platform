import { Trophy, Medal, Flame, Crown, Loader2, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  solved: number;
  streak: number;
  score: number;
}

const Leaderboard = () => {
  const { user } = useAuth();

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("user_id, display_name, username, avatar_url, problems_solved, streak")
        .order("problems_solved", { ascending: false })
        .limit(50);

      if (error) throw error;

      return (profiles || []).map((p, i) => ({
        rank: i + 1,
        userId: p.user_id,
        displayName: p.display_name || p.username || "Anonymous",
        avatarUrl: p.avatar_url,
        solved: p.problems_solved || 0,
        streak: p.streak || 0,
        // Score: solved * 10 + streak * 5
        score: (p.problems_solved || 0) * 10 + (p.streak || 0) * 5,
      }));
    },
  });

  const currentUserRank = entries.find(e => e.userId === user?.id);

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const podiumOrder = [1, 0, 2]; // silver, gold, bronze visual order

  return (
    <div className="container mx-auto px-4 pb-10 pt-24">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="h-7 w-7 text-medium" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">Top coders ranked by problems solved</p>
          </div>
        </div>
        {currentUserRank && (
          <div className="hidden sm:flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5">
            <span className="text-xs text-muted-foreground">Your Rank</span>
            <span className="text-xl font-bold text-primary">#{currentUserRank.rank}</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center gap-3 py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading rankings...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Trophy className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold text-foreground">No rankings yet</h3>
          <p className="text-sm text-muted-foreground">Start solving problems to appear on the leaderboard!</p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {entries.length >= 3 && (
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {podiumOrder.map(idx => {
                const entry = entries[idx];
                if (!entry) return null;
                const isGold = idx === 0;
                return (
                  <div
                    key={entry.userId}
                    className={`relative overflow-hidden rounded-xl border bg-card p-6 shadow-card transition-all ${
                      isGold
                        ? "sm:order-2 border-yellow-500/30 ring-1 ring-yellow-500/20"
                        : idx === 1
                        ? "sm:order-1 border-border"
                        : "sm:order-3 border-border"
                    }`}
                  >
                    {isGold && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none" />
                    )}
                    <div className="relative">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {rankIcon(entry.rank)}
                          <span className="text-sm font-bold text-muted-foreground">#{entry.rank}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Flame className="h-3 w-3 text-medium" />
                          {entry.streak} day streak
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        {entry.avatarUrl ? (
                          <img src={entry.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover border border-border" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-foreground">{entry.displayName}</h3>
                          <p className="text-xs text-muted-foreground">{entry.solved} problems solved</p>
                        </div>
                      </div>
                      <div className={`text-2xl font-extrabold ${isGold ? "text-yellow-400" : "text-primary"}`}>
                        {entry.score.toLocaleString()} pts
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Full Rankings Table */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground w-16">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Player</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Solved</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Streak</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => {
                  const isCurrentUser = entry.userId === user?.id;
                  return (
                    <tr
                      key={entry.userId}
                      className={`border-b border-border/50 transition-colors hover:bg-secondary/20 ${
                        isCurrentUser ? "bg-primary/5" : ""
                      } ${i === entries.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {rankIcon(entry.rank)}
                          <span className={`text-sm font-bold ${entry.rank <= 3 ? "text-foreground" : "text-muted-foreground"}`}>
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          {entry.avatarUrl ? (
                            <img src={entry.avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover border border-border" />
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                              <User className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                          )}
                          <span className={`text-sm font-medium ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
                            {entry.displayName}
                            {isCurrentUser && <span className="ml-1.5 text-xs text-primary">(You)</span>}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center text-sm text-muted-foreground hidden sm:table-cell">{entry.solved}</td>
                      <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <Flame className="h-3 w-3 text-medium" />{entry.streak}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right text-sm font-semibold text-primary">{entry.score.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
