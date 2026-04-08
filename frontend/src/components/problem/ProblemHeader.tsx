import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

interface ProblemHeaderProps {
  title: string;
  leetcodeNumber?: number | null;
  difficulty: string;
  topic: string;
  tags: string[];
  solved?: boolean;
  neetcodeLink?: string | null;
}

const ProblemHeader = ({
  title,
  leetcodeNumber,
  difficulty,
  topic,
  tags,
  solved,
  neetcodeLink,
}: ProblemHeaderProps) => {
  const difficultyClass =
    difficulty === "Easy"
      ? "bg-easy/10 text-easy border-easy/20"
      : difficulty === "Medium"
      ? "bg-medium/10 text-medium border-medium/20"
      : "bg-hard/10 text-hard border-hard/20";

  return (
    <div className="px-5 py-4 border-b border-border bg-card">
      <Link
        to="/problems"
        className="mb-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
        Problems
      </Link>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-foreground leading-tight truncate">
            {leetcodeNumber ? `${leetcodeNumber}. ` : ""}
            {title}
          </h1>
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${difficultyClass}`}>
              {difficulty}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {topic}
            </span>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                {tag}
              </span>
            ))}
            {solved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-easy/10 border border-easy/20 px-2.5 py-0.5 text-[11px] font-semibold text-easy">
                <CheckCircle2 className="h-3 w-3" />
                Solved
              </span>
            )}
          </div>
        </div>
        {neetcodeLink && (
          <a
            href={neetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Video
          </a>
        )}
      </div>
    </div>
  );
};

export default ProblemHeader;
