import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Square, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface EnrichResult {
  id: number;
  title: string;
  status: string;
}

const EnrichProblems = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<EnrichResult[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [processed, setProcessed] = useState(0);
  const stopRef = useRef(false);

  const runEnrichment = async () => {
    setRunning(true);
    stopRef.current = false;
    setResults([]);
    setProcessed(0);

    let offset = 0;
    const batchSize = 3;

    while (!stopRef.current) {
      try {
        const { data, error } = await supabase.functions.invoke("enrich-problems", {
          body: { batchSize, offset },
        });

        if (error) {
          toast.error(`Error: ${error.message}`);
          break;
        }

        if (data.error) {
          toast.error(data.error);
          break;
        }

        if (data.results) {
          setResults(prev => [...prev, ...data.results]);
          setProcessed(prev => prev + data.results.length);
        }

        setRemaining(data.remaining ?? 0);

        if (data.done) {
          toast.success("All problems enriched!");
          break;
        }

        offset = data.nextOffset;

        // Check for rate limiting
        const rateLimited = data.results?.some((r: EnrichResult) => r.status === "rate_limited");
        if (rateLimited) {
          toast.info("Rate limited, waiting 20s...");
          await new Promise(r => setTimeout(r, 20000));
        }
      } catch (err: any) {
        toast.error(err.message || "Unknown error");
        break;
      }
    }

    setRunning(false);
  };

  const stop = () => {
    stopRef.current = true;
  };

  const successCount = results.filter(r => r.status === "success").length;
  const errorCount = results.filter(r => r.status !== "success").length;

  return (
    <div className="min-h-screen bg-background p-6 pt-20">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            Enrich Problems with AI
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate descriptions, examples, constraints, and starter code for all problems using AI.
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Controls</CardTitle>
            <CardDescription>Processes 3 problems per batch with delays to avoid rate limits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              {!running ? (
                <Button onClick={runEnrichment} className="gradient-hero text-primary-foreground">
                  <Play className="mr-2 h-4 w-4" /> Start Enrichment
                </Button>
              ) : (
                <Button onClick={stop} variant="destructive">
                  <Square className="mr-2 h-4 w-4" /> Stop
                </Button>
              )}
            </div>

            {running && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing... {processed} done{remaining !== null && `, ~${remaining} remaining`}
              </div>
            )}

            <div className="flex gap-3 text-sm">
              <Badge variant="outline" className="text-green-400 border-green-400/30">
                <CheckCircle className="mr-1 h-3 w-3" /> {successCount} success
              </Badge>
              <Badge variant="outline" className="text-red-400 border-red-400/30">
                <XCircle className="mr-1 h-3 w-3" /> {errorCount} errors
              </Badge>
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-foreground">Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto space-y-1">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between rounded px-3 py-2 text-sm hover:bg-secondary/30">
                    <span className="text-foreground">{r.title}</span>
                    <Badge variant="outline" className={r.status === "success" ? "text-green-400 border-green-400/30" : "text-red-400 border-red-400/30"}>
                      {r.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnrichProblems;
