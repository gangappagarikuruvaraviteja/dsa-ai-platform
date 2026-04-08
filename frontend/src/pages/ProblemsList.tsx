import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProblems, useTopics, type Difficulty } from "@/hooks/useProblems";
import TopicSection from "@/components/problems/TopicSection";
import ProgressRing from "@/components/problems/ProgressRing";
import { CheckCircle, Search, Filter, LayoutList, LayoutGrid, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { USE_SPRING_BOOT } from "@/config/backend";
import { getLeetcodeUrl } from "@/lib/leetcode";

const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

const ProblemsList = () => {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'topic' | 'list'>('topic');
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set(['Arrays & Hashing']));
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: problems = [],
    isLoading,
    isError: problemsError,
    error: problemsErrorObj,
    refetch: refetchProblems,
  } = useProblems({
    difficulty: selectedDifficulty,
    search: viewMode === 'list' ? search : undefined,
  });

  const {
    data: topics = [],
    isError: topicsError,
    error: topicsErrorObj,
    refetch: refetchTopics,
  } = useTopics();

  // Auto-seed if no problems exist
  useEffect(() => {
    if (!USE_SPRING_BOOT && !isLoading && problems.length === 0 && !seeding) {
      setSeeding(true);
      supabase.functions.invoke('seed-problems')
        .then(({ data, error }) => {
          if (error) {
            toast({ title: "Error seeding problems", description: error.message, variant: "destructive" });
          } else {
            toast({ title: "Problems loaded!", description: data?.message || "Database seeded successfully" });
            queryClient.invalidateQueries({ queryKey: ["problems"] });
            queryClient.invalidateQueries({ queryKey: ["topics"] });
          }
          setSeeding(false);
        });
    }
  }, [isLoading, problems.length, seeding]);

  const toggleTopic = (topic: string) => {
    setOpenTopics(prev => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const topicGroups = topics.map(t => ({
    topic: t.topic,
    problems: problems.filter(p => p.topic === t.topic),
  })).filter(g => g.problems.length > 0);

  const filtered = problems.filter(p => {
    if (selectedTopic && p.topic !== selectedTopic) return false;
    return true;
  });

  const totalSolved = problems.filter(p => p.solved).length;
  const easySolved = problems.filter(p => p.difficulty === 'Easy' && p.solved).length;
  const mediumSolved = problems.filter(p => p.difficulty === 'Medium' && p.solved).length;
  const hardSolved = problems.filter(p => p.difficulty === 'Hard' && p.solved).length;
  const totalEasy = problems.filter(p => p.difficulty === 'Easy').length;
  const totalMedium = problems.filter(p => p.difficulty === 'Medium').length;
  const totalHard = problems.filter(p => p.difficulty === 'Hard').length;

  const beginnerTopics = ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List'];
  const intermediateTopics = ['Trees', 'Tries', 'Heap / Priority Queue', 'Backtracking', 'Graphs', '1-D DP'];
  const advancedTopics = ['Intervals', 'Greedy', 'Advanced Graphs', 'Math & Geometry', '2-D DP', 'Bit Manipulation'];

  const sections = [
    { label: 'Beginner', color: 'text-easy', bgColor: 'bg-easy/10', topics: beginnerTopics },
    { label: 'Intermediate', color: 'text-medium', bgColor: 'bg-medium/10', topics: intermediateTopics },
    { label: 'Advanced', color: 'text-hard', bgColor: 'bg-hard/10', topics: advancedTopics },
  ];

  if (isLoading || seeding) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-20 flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">{seeding ? "Seeding problem database..." : "Loading problems..."}</p>
      </div>
    );
  }

  if (problemsError || topicsError) {
    const problemMsg = (problemsErrorObj as Error | null)?.message;
    const topicMsg = (topicsErrorObj as Error | null)?.message;
    const message = problemMsg || topicMsg || "Failed to load problems data.";

    return (
      <div className="container mx-auto px-4 pt-24 pb-20 flex flex-col items-center gap-4">
        <p className="text-sm text-hard font-semibold">Could not load problems</p>
        <p className="text-muted-foreground text-center max-w-xl">{message}</p>
        <button
          onClick={() => {
            refetchProblems();
            refetchTopics();
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-10 pt-24">
      {/* ── Header with Progress ── */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <ProgressRing solved={totalSolved} total={problems.length} />
          <div>
            <h1 className="mb-1 text-3xl font-bold text-foreground">DSA Easy Curated</h1>
            <p className="text-sm text-muted-foreground mb-3">
              {problems.length} problems across {topics.length} topics
            </p>
            {/* Difficulty mini-bars */}
            <div className="flex items-center gap-4">
              {[
                { label: 'Easy', solved: easySolved, total: totalEasy, color: 'bg-easy', textColor: 'text-easy' },
                { label: 'Med', solved: mediumSolved, total: totalMedium, color: 'bg-medium', textColor: 'text-medium' },
                { label: 'Hard', solved: hardSolved, total: totalHard, color: 'bg-hard', textColor: 'text-hard' },
              ].map(d => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${d.textColor}`}>{d.label}</span>
                  <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${d.color} transition-all`} style={{ width: `${d.total > 0 ? (d.solved / d.total) * 100 : 0}%` }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{d.solved}/{d.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border bg-card overflow-hidden">
            <button
              onClick={() => setViewMode('topic')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${viewMode === 'topic' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Topics</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutList className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Topic View ── */}
      {viewMode === 'topic' ? (
        <div className="space-y-8">
          {sections.map(section => {
            const sectionGroups = topicGroups.filter(g => section.topics.includes(g.topic));
            if (sectionGroups.length === 0) return null;
            const sectionTotal = sectionGroups.reduce((sum, g) => sum + g.problems.length, 0);
            const sectionSolved = sectionGroups.reduce((sum, g) => sum + g.problems.filter(p => p.solved).length, 0);

            return (
              <div key={section.label}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${section.color} ${section.bgColor}`}>
                    {section.label}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">{sectionSolved}/{sectionTotal} solved</span>
                </div>
                <div className="space-y-3">
                  {section.topics
                    .map(t => sectionGroups.find(g => g.topic === t))
                    .filter(Boolean)
                    .map(g => (
                      <TopicSection
                        key={g!.topic}
                        topic={g!.topic}
                        problems={g!.problems}
                        isOpen={openTopics.has(g!.topic)}
                        onToggle={() => toggleTopic(g!.topic)}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── List View ── */
        <>
          <div className="mb-6 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
                <Filter className="h-3 w-3" /> Difficulty
              </span>
              {difficulties.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === d ? null : d)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedDifficulty === d
                      ? d === 'Easy' ? 'bg-easy/20 text-easy ring-1 ring-easy/30' : d === 'Medium' ? 'bg-medium/20 text-medium ring-1 ring-medium/30' : 'bg-hard/20 text-hard ring-1 ring-hard/30'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}

              <span className="ml-4 flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
                <Filter className="h-3 w-3" /> Topic
              </span>
              {topics.map(t => (
                <button
                  key={t.topic}
                  onClick={() => setSelectedTopic(selectedTopic === t.topic ? null : t.topic)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTopic === t.topic
                      ? 'bg-primary/20 text-primary ring-1 ring-primary/30'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.topic} ({t.count})
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground w-10">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell">Topic</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Acceptance</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((problem, i) => (
                  <tr key={problem.id} className={`border-b border-border transition-colors hover:bg-secondary/20 ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-4 py-3.5">
                      {problem.solved ? <CheckCircle className="h-4 w-4 text-primary" /> : <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <a
                          href={getLeetcodeUrl(problem)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {problem.leetcode_number ? `${problem.leetcode_number}. ` : ''}{problem.title}
                        </a>
                        <Link
                          to={`/problem/${problem.id}`}
                          className="rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                        >
                          AI Help
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        problem.difficulty === 'Easy' ? 'bg-easy/10 text-easy' :
                        problem.difficulty === 'Medium' ? 'bg-medium/10 text-medium' :
                        'bg-hard/10 text-hard'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{problem.topic}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-xs text-muted-foreground hidden lg:table-cell">
                      {problem.acceptance_rate}%
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      No problems found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProblemsList;
