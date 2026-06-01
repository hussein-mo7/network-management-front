import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";
import type { DashboardNavItem } from "@/lib/dashboardNav";

interface DashboardSidebarNavProps {
  items: DashboardNavItem[];
  canAccess: (permission?: string) => boolean;
  onNavigate?: () => void;
}

export function DashboardSidebarNav({ items, canAccess, onNavigate }: DashboardSidebarNavProps) {
  const { t } = useTranslation();
  const visibleItems = items.filter((item) => canAccess(item.permission));

  return (
    <nav className="flex flex-col gap-0.5 p-3">
      {visibleItems.map(({ labelKey, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-active/15 text-sidebar-active shadow-sm ring-1 ring-sidebar-active/25"
                : "text-sidebar-foreground hover:bg-white/[0.06] hover:text-white",
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="truncate">{t(labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
