import { Logo } from "@/components/ui/branding";
import { DashboardSidebarNav } from "@/components/ui/navigation";
import { dashboardNavItems } from "@/lib/dashboardNav";
import { cn } from "@/lib/cn";

interface DashboardSidebarPanelProps {
  displayName: string;
  displayRole: string;
  canAccess: (permission?: string) => boolean;
  onNavigate?: () => void;
  className?: string;
  showLogo?: boolean;
}

export function DashboardSidebarPanel({
  displayName,
  displayRole,
  canAccess,
  onNavigate,
  className,
  showLogo = true,
}: DashboardSidebarPanelProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {showLogo ? (
        <div className="sidebar-shell-header hidden lg:flex">
          <Logo size="sm" variant="on-dark" preferImage />
        </div>
      ) : null}

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <DashboardSidebarNav
          items={dashboardNavItems}
          canAccess={canAccess}
          onNavigate={onNavigate}
        />
      </div>

      <div className="shrink-0 border-t border-white/10 p-4">
        <p className="truncate text-sm font-medium text-white">{displayName}</p>
        <p className="truncate text-xs text-sidebar-foreground">{displayRole}</p>
      </div>
    </div>
  );
}
