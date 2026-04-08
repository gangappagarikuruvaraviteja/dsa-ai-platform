import Editor from "@monaco-editor/react";
import { Play, Send, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const languageMap: Record<string, string> = {
  java: "java",
};

const languageLabels: Record<string, string> = {
  java: "Java",
};

interface CodeEditorProps {
  language: string;
  code: string;
  onLanguageChange: (lang: string) => void;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  runLoading: boolean;
  submitLoading: boolean;
}

const CodeEditor = ({
  language,
  code,
  onLanguageChange,
  onCodeChange,
  onRun,
  onSubmit,
  onReset,
  runLoading,
  submitLoading,
}: CodeEditorProps) => {
  const disabled = runLoading || submitLoading;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-card">
        <div className="flex items-center gap-0.5">
          {Object.keys(languageMap).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                language === lang
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onReset}
            disabled={disabled}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRun}
            disabled={disabled}
            className="h-8 border-border text-foreground hover:bg-secondary"
          >
            {runLoading ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="mr-1.5 h-3.5 w-3.5 text-easy" />
            )}
            Run
          </Button>
          <Button
            size="sm"
            onClick={onSubmit}
            disabled={disabled}
            className="h-8 gradient-hero text-primary-foreground hover:opacity-90"
          >
            {submitLoading ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="mr-1.5 h-3.5 w-3.5" />
            )}
            Submit
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={languageMap[language]}
          value={code}
          onChange={(v) => onCodeChange(v || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            tabSize: 4,
            wordWrap: "on",
            lineHeight: 1.6,
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 8,
            renderWhitespace: "selection",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
