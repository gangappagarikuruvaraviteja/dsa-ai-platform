import { CheckCircle, XCircle, Clock, HardDrive, Loader2, Trophy, AlertTriangle } from "lucide-react";
import type { RunResult, SubmitResult } from "@/services/codeExecution";

interface TestResultsPanelProps {
  result: RunResult | SubmitResult | null;
  loading: boolean;
  mode: "run" | "submit";
}

const TestResultsPanel = ({ result, loading, mode }: TestResultsPanelProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {mode === "run" ? "Running test cases..." : "Submitting solution..."}
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Run your code to see output here.
      </div>
    );
  }

  const isSubmit = "accepted" in result;
  const submitResult = isSubmit ? (result as SubmitResult) : null;

  // Compilation or runtime error
  if (result.compilationError) {
    return (
      <div className="space-y-3 p-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-hard" />
          <span className="font-semibold text-hard">Compilation Error</span>
        </div>
        <pre className="rounded-lg bg-hard/10 p-4 text-sm font-mono text-hard whitespace-pre-wrap">
          {result.compilationError}
        </pre>
      </div>
    );
  }

  if (result.runtimeError) {
    return (
      <div className="space-y-3 p-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-hard" />
          <span className="font-semibold text-hard">Runtime Error</span>
        </div>
        <pre className="rounded-lg bg-hard/10 p-4 text-sm font-mono text-hard whitespace-pre-wrap">
          {result.runtimeError}
        </pre>
      </div>
    );
  }

  const allPassed = result.totalPassed === result.totalTests;

  return (
    <div className="space-y-4 p-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {allPassed ? (
            <>
              {isSubmit ? (
                <Trophy className="h-5 w-5 text-primary" />
              ) : (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
              <span className="font-bold text-primary text-lg">
                {isSubmit ? "Accepted" : "All Tests Passed"}
              </span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-hard" />
              <span className="font-bold text-hard text-lg">
                {isSubmit ? "Wrong Answer" : `${result.totalPassed}/${result.totalTests} Passed`}
              </span>
            </>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {result.totalPassed}/{result.totalTests} test cases passed
        </span>
      </div>

      {/* Stats for accepted submissions */}
      {isSubmit && submitResult?.accepted && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" /> Runtime
            </div>
            <p className="text-lg font-bold text-foreground">{submitResult.runtime}ms</p>
            <p className="text-xs text-primary">Beats {submitResult.runtimePercentile}% of submissions</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <HardDrive className="h-3.5 w-3.5" /> Memory
            </div>
            <p className="text-lg font-bold text-foreground">{submitResult.memory} MB</p>
            <p className="text-xs text-primary">Beats {submitResult.memoryPercentile}% of submissions</p>
          </div>
        </div>
      )}

      {/* Test case results */}
      <div className="space-y-2">
        {result.testCases.map((tc) => (
          <div
            key={tc.testCase}
            className={`rounded-lg border p-3 ${
              tc.passed
                ? "border-primary/20 bg-primary/5"
                : "border-hard/20 bg-hard/5"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {tc.passed ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-hard" />
                )}
                <span className="text-sm font-medium text-foreground">
                  Test Case {tc.testCase}
                </span>
              </div>
              {tc.executionTime !== undefined && (
                <span className="text-xs text-muted-foreground">{tc.executionTime}ms</span>
              )}
            </div>
            <div className="space-y-1 font-mono text-xs">
              <div className="text-muted-foreground">
                Input: <span className="text-foreground">{tc.input}</span>
              </div>
              <div className="text-muted-foreground">
                Expected: <span className="text-foreground">{tc.expectedOutput}</span>
              </div>
              {!tc.passed && (
                <div className="text-muted-foreground">
                  Output: <span className="text-hard">{tc.actualOutput}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultsPanel;
