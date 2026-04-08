interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemDescriptionProps {
  description: string;
  examples: Example[];
  constraints: string[];
}

const ProblemDescription = ({ description, examples, constraints }: ProblemDescriptionProps) => {
  const cleanedExamples = (examples || []).filter((ex) => ex?.input || ex?.output);
  const cleanedConstraints = (constraints || []).filter((c) => c?.trim().length > 0);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card/40 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</h3>
        <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {description?.trim() || "No description available for this problem yet."}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-card/40 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Examples</h3>

        {cleanedExamples.length > 0 ? (
          cleanedExamples.map((ex, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground">Example {i + 1}</div>
              <div className="font-mono text-xs space-y-1.5">
                <div>
                  <span className="text-muted-foreground">Input: </span>
                  <span className="text-foreground font-medium">{ex.input || "-"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Output: </span>
                  <span className="text-primary font-medium">{ex.output || "-"}</span>
                </div>
                {ex.explanation && (
                  <div className="pt-2 mt-2 border-t border-border text-muted-foreground">
                    Explanation: {ex.explanation}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">Example data is not available for this problem yet.</p>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Constraints</h3>

        {cleanedConstraints.length > 0 ? (
          <ul className="space-y-1.5">
            {cleanedConstraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <code className="font-mono text-foreground/80 whitespace-pre-wrap">{c}</code>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">No explicit constraints were provided for this problem.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProblemDescription;
