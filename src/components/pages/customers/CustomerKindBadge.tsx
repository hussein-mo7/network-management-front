import { useTranslation } from "react-i18next";
import type { CustomerKind } from "@/types/customer";
import { cn } from "@/lib/cn";

export function CustomerKindBadge({ kind }: { kind: CustomerKind }) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground",
        (kind === "subscriber" || kind === "stopped") && "text-foreground",
      )}
    >
      {t(`customers.kind.${kind}`)}
    </span>
  );
}
