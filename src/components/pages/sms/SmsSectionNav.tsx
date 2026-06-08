import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { smsPath, type SmsSection } from "@/lib/routePaths";
import { cn } from "@/lib/cn";

const SECTIONS: SmsSection[] = ["send", "logs", "templates"];

export function SmsSectionNav() {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/20 p-1">
      {SECTIONS.map((section) => (
        <NavLink
          key={section}
          to={smsPath(section)}
          end={section === "send"}
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )
          }
        >
          {t(`sms.sections.${section}`)}
        </NavLink>
      ))}
    </nav>
  );
}
