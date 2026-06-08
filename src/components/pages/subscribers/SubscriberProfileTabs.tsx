import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { subscriberProfilePath } from "@/lib/routePaths";
import { cn } from "@/lib/cn";

export type SubscriberProfileTab = "stats" | "invoices" | "username";

const TABS: SubscriberProfileTab[] = ["stats", "invoices", "username"];

interface SubscriberProfileTabsProps {
  lineId: string;
}

export function SubscriberProfileTabs({ lineId }: SubscriberProfileTabsProps) {
  const { t } = useTranslation();

  if (!lineId.trim()) return null;

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-border">
      {TABS.map((tab) => (
        <NavLink
          key={tab}
          to={subscriberProfilePath(lineId, tab)}
          end
          className={({ isActive }) =>
            cn(
              "shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )
          }
        >
          {t(`subscribers.profile.tabs.${tab}`)}
        </NavLink>
      ))}
    </nav>
  );
}
