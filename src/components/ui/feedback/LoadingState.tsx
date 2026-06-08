import { useTranslation } from "react-i18next";
import { Loader } from "@/components/ui/feedback/Loader";
import {
  AvailableUsernamesPageSkeleton,
  DataTableSkeleton,
  SpeedTiersGridSkeleton,
  StatCardsRowSkeleton,
  SupportContentSkeleton,
  SupportPageSkeleton,
} from "@/components/ui/feedback/loading-skeletons";
import { cn } from "@/lib/cn";

export type LoadingLayout =
  | "default"
  | "speed-tiers"
  | "support"
  | "support-content"
  | "available-usernames"
  | "table"
  | "stats";

type LoadingVariant = "page" | "section" | "inline" | "fullscreen";

interface LoadingStateProps {
  /** Visual: spinner only, or content-shaped skeleton */
  mode?: "spinner" | "skeleton";
  layout?: LoadingLayout;
  variant?: LoadingVariant;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function SkeletonLayout({ layout }: { layout: LoadingLayout }) {
  switch (layout) {
    case "speed-tiers":
      return <SpeedTiersGridSkeleton />;
    case "support":
      return <SupportPageSkeleton />;
    case "support-content":
      return <SupportContentSkeleton />;
    case "available-usernames":
      return <AvailableUsernamesPageSkeleton />;
    case "table":
      return <DataTableSkeleton />;
    case "stats":
      return <StatCardsRowSkeleton />;
    default:
      return (
        <div className="space-y-3">
          <div className="h-24 rounded-xl border border-border bg-surface" />
          <div className="h-24 rounded-xl border border-border bg-surface" />
        </div>
      );
  }
}

export function LoadingState({
  mode = "skeleton",
  layout = "default",
  variant = "section",
  label,
  className,
  size = "md",
}: LoadingStateProps) {
  const { t } = useTranslation();
  const message = label ?? t("common.loading");

  if (mode === "spinner") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 text-center",
          variant === "page" && "min-h-[min(50vh,28rem)] w-full",
          variant === "section" && "min-h-[12rem] w-full py-12",
          variant === "inline" && "py-4",
          variant === "fullscreen" && "min-h-screen w-full bg-background",
          className,
        )}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Loader size={size} />
        <p className="max-w-xs text-sm text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full",
        variant === "page" && "min-h-[min(50vh,28rem)]",
        variant === "fullscreen" && "min-h-screen bg-background px-0 py-8",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={message}
    >
      <span className="sr-only">{message}</span>
      <SkeletonLayout layout={layout} />
    </div>
  );
}
