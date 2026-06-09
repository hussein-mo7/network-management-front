import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
  className?: string;
}

export function SearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
}: SearchFieldProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          "flex h-11 w-full rounded-xl border border-border/80 bg-background ps-10 pe-3 text-sm shadow-sm",
          "placeholder:text-muted-foreground transition-shadow",
          "focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/15",
        )}
      />
    </div>
  );
}
