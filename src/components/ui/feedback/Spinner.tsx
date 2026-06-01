import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label }: SpinnerProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
      <span className="text-sm text-muted-foreground">{label ?? t("common.loading")}</span>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner />
    </div>
  );
}
