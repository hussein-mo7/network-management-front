import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/ui/branding";
import { Sheet, SheetHeader } from "@/components/ui/overlays";
import { useAuthUserLabels } from "@/hooks/useAuthUserLabels";
import { usePermissions } from "@/hooks/usePermissions";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebarPanel } from "./DashboardSidebarPanel";

export function DashboardLayout() {
  const { t } = useTranslation();
  const { displayName, displayRole } = useAuthUserLabels();
  const { can } = usePermissions();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const canAccess = (permission?: string) => !permission || can(permission);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="dashboard-sidebar sticky top-0 hidden h-screen w-64 shrink-0 self-start flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <DashboardSidebarPanel
          displayName={displayName}
          displayRole={displayRole}
          canAccess={canAccess}
          className="h-full"
        />
      </aside>

      <Sheet
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        ariaLabel={t("nav.closeMenu")}
      >
        <SheetHeader
          onClose={() => setMobileNavOpen(false)}
          closeLabel={t("nav.closeMenu")}
        >
          <Logo size="sm" variant="on-dark" preferImage />
        </SheetHeader>
        <DashboardSidebarPanel
          displayName={displayName}
          displayRole={displayRole}
          canAccess={canAccess}
          onNavigate={() => setMobileNavOpen(false)}
          showLogo={false}
          className="min-h-0 flex-1"
        />
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
