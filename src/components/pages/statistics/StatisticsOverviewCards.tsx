import {
  AlertTriangle,
  Clock,
  PauseCircle,
  UserCheck,
  UserPlus,
  Users,
  Wifi,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/ui/data";
import type { StatisticsOverview } from "@/types/statistics";

interface StatisticsOverviewCardsProps {
  overview: StatisticsOverview;
  weekNewSubscribers: number;
  weekUsernamesAdded: number;
}

export function StatisticsOverviewCards({
  overview,
  weekNewSubscribers,
  weekUsernamesAdded,
}: StatisticsOverviewCardsProps) {
  const { t } = useTranslation();

  const cards = [
    {
      label: t("statistics.overview.totalRecords"),
      value: overview.totalRecords,
      hint: t("statistics.overview.totalRecordsHint"),
      icon: Users,
      iconClassName: "bg-primary/10 text-primary",
      to: "/customers",
    },
    {
      label: t("statistics.overview.totalSubscribers"),
      value: overview.totalSubscribers,
      hint: t("statistics.overview.totalSubscribersHint", {
        week: weekNewSubscribers,
      }),
      icon: UserCheck,
      iconClassName: "bg-accent/10 text-accent",
      to: "/subscribers",
    },
    {
      label: t("statistics.overview.availableUsernames"),
      value: overview.totalAvailableUsernames,
      hint: t("statistics.overview.availableUsernamesHint"),
      icon: Wifi,
      iconClassName: "bg-success/10 text-success",
      to: "/available-usernames",
    },
    {
      label: t("statistics.overview.customersOnly"),
      value: overview.customersOnly,
      hint: t("statistics.overview.customersOnlyHint"),
      icon: UserPlus,
      iconClassName: "bg-muted/20 text-muted-foreground",
      to: "/customers",
    },
    {
      label: t("statistics.overview.expiringSoon"),
      value: overview.expiringSubscribers,
      hint: t("statistics.overview.expiringSoonHint"),
      icon: Clock,
      iconClassName: "bg-warning/10 text-warning",
      to: "/expiring",
    },
    {
      label: t("statistics.overview.expired"),
      value: overview.expiredSubscribers,
      hint: t("statistics.overview.expiredHint"),
      icon: AlertTriangle,
      iconClassName: "bg-danger/10 text-danger",
      to: "/expiring",
    },
    {
      label: t("statistics.overview.stopped"),
      value: overview.stoppedSubscribers,
      hint: t("statistics.overview.stoppedHint"),
      icon: PauseCircle,
      iconClassName: "bg-warning/10 text-warning",
      to: "/stopped",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Link key={card.label} to={card.to} className="block transition-opacity hover:opacity-90">
          <StatCard
            label={card.label}
            value={card.value}
            hint={
              card.to === "/subscribers"
                ? `+${weekNewSubscribers} / ${t("statistics.activity.sectionTitle")}`
                : card.to === "/available-usernames"
                  ? `+${weekUsernamesAdded} / ${t("statistics.activity.sectionTitle")}`
                  : card.hint
            }
            icon={card.icon}
            iconClassName={card.iconClassName}
          />
        </Link>
      ))}
    </div>
  );
}
