import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

export type SubscriberProfileTab = "stats" | "invoices" | "username";

interface SubscriberProfileTabsProps {
  active: SubscriberProfileTab;
  onChange: (tab: SubscriberProfileTab) => void;
}

const TABS: SubscriberProfileTab[] = ["stats", "invoices", "username"];

export function SubscriberProfileTabs({ active, onChange }: SubscriberProfileTabsProps) {
  const { t } = useTranslation();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            "shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
            active === tab
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {t(`subscribers.profile.tabs.${tab}`)}
        </button>
      ))}
    </nav>
  );
}
