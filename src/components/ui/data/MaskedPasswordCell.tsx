import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { cn } from "@/lib/cn";

const MASK = "••••••••••••";

interface MaskedPasswordCellProps {
  value: string;
  className?: string;
}

export function MaskedPasswordCell({ value, className }: MaskedPasswordCellProps) {
  const { t } = useTranslation();
  const { canManage } = useRoleAccess();
  const [visible, setVisible] = useState(false);

  if (!canManage) {
    return (
      <span className={cn("font-mono text-sm text-muted-foreground", className)}>{MASK}</span>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-mono text-sm">{visible ? value : MASK}</span>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t("auth.hidePassword") : t("auth.showPassword")}
        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
