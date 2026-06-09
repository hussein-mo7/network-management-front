import { cn } from "@/lib/cn";

export interface FilterChipOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterChipBarProps {
  label?: string;
  value: string;
  onChange: (id: string) => void;
  options: FilterChipOption[];
  className?: string;
}

export function FilterChipBar({ label, value, onChange, options, className }: FilterChipBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      ) : null}

      <div
        className={cn(
          "-mx-1 overflow-x-auto overscroll-x-contain px-1",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "sm:mx-0 sm:overflow-visible sm:px-0",
        )}
      >
        <div
          className={cn(
            "flex w-max min-w-full flex-nowrap gap-2 pb-0.5",
            "sm:w-auto sm:flex-wrap",
          )}
          role="tablist"
        >
          {options.map((option) => {
            const selected = value === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onChange(option.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  selected
                    ? "border-primary/40 bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/15"
                    : "border-border/70 bg-background text-muted-foreground shadow-sm hover:border-border hover:bg-muted/40 hover:text-foreground",
                )}
              >
                <span className="whitespace-nowrap">{option.label}</span>
                {option.count !== undefined ? (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums",
                      selected
                        ? "bg-background/20 text-background"
                        : "bg-background text-muted-foreground",
                    )}
                  >
                    {option.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
