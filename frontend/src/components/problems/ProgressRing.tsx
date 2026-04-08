import { CheckCircle } from "lucide-react";

interface ProgressRingProps {
  solved: number;
  total: number;
  size?: number;
}

const ProgressRing = ({ solved, total, size = 120 }: ProgressRingProps) => {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {pct === 100 ? (
          <CheckCircle className="h-6 w-6 text-easy" />
        ) : (
          <>
            <span className="text-2xl font-bold text-foreground">{solved}</span>
            <span className="text-[10px] text-muted-foreground">/{total}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
