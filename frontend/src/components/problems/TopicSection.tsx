import { Link } from "react-router-dom";
import { topicConcepts } from "@/data/mockData";
import { CheckCircle, ChevronDown, ChevronRight, BookOpen, Lightbulb, ExternalLink } from "lucide-react";
import { getLeetcodeUrl } from "@/lib/leetcode";

interface TopicSectionProps {
  topic: string;
  problems: any[];
  isOpen: boolean;
  onToggle: () => void;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-easy/10 text-easy',
  Intermediate: 'bg-medium/10 text-medium',
  Advanced: 'bg-hard/10 text-hard',
};

const TopicSection = ({ topic, problems, isOpen, onToggle }: TopicSectionProps) => {
  const concept = topicConcepts.find(c => c.topic === topic);
  const solved = problems.filter(p => p.solved).length;
  const easy = problems.filter(p => p.difficulty === 'Easy').length;
  const medium = problems.filter(p => p.difficulty === 'Medium').length;
  const hard = problems.filter(p => p.difficulty === 'Hard').length;
  const pct = problems.length > 0 ? (solved / problems.length) * 100 : 0;

  return (
    <div className={`rounded-xl border bg-card overflow-hidden transition-colors ${isOpen ? 'border-primary/20 shadow-card' : 'border-border'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen
            ? <ChevronDown className="h-4 w-4 text-primary" />
            : <ChevronRight className="h-4 w-4 text-muted-foreground" />
          }
          <div className="text-left">
            <h3 className="text-base font-semibold text-foreground">{topic}</h3>
            {concept && (
              <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyColors[concept.difficulty]}`}>
                {concept.difficulty}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            {easy > 0 && <span className="text-easy">{easy} Easy</span>}
            {medium > 0 && <span className="text-medium">{medium} Med</span>}
            {hard > 0 && <span className="text-hard">{hard} Hard</span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{solved}/{problems.length}</span>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-easy' : 'bg-primary'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border">
          {concept && (
            <div className="bg-secondary/20 px-5 py-4 border-b border-border">
              <div className="flex items-start gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{concept.description}</p>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-medium mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1.5">Key Patterns & Concepts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.keyConcepts.map((kc, i) => (
                      <span key={i} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                        {kc.split('—')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="divide-y divide-border/50">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/20 group"
              >
                <div className="w-6 flex-shrink-0">
                  {problem.solved
                    ? <CheckCircle className="h-4 w-4 text-primary" />
                    : <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                  }
                </div>
                <a
                  href={getLeetcodeUrl(problem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate"
                >
                  {problem.leetcode_number ? `${problem.leetcode_number}. ` : ''}{problem.title}
                </a>
                <span className={`hidden sm:inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                  problem.difficulty === 'Easy' ? 'bg-easy/10 text-easy' :
                  problem.difficulty === 'Medium' ? 'bg-medium/10 text-medium' :
                  'bg-hard/10 text-hard'
                }`}>
                  {problem.difficulty}
                </span>
                <Link
                  to={`/problem/${problem.id}`}
                  className="text-[11px] px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  AI Help
                </Link>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                <span className="hidden md:inline-block text-xs text-muted-foreground w-12 text-right">
                  {problem.acceptance_rate}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicSection;
