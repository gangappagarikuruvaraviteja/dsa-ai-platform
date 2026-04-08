import { Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFontSize, type FontSize } from "@/hooks/useFontSize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

export function FontSizeControl() {
  const { fontSize, updateFontSize } = useFontSize();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Adjust font size"
        >
          <Type className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {FONT_SIZE_OPTIONS.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => updateFontSize(value)}
            className={fontSize === value ? 'bg-secondary' : ''}
          >
            <span className={fontSize === value ? 'font-semibold' : ''}>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
