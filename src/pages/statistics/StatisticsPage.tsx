import { CalendarDays, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  StatisticsActivitySection,
  StatisticsChartsSection,
  StatisticsLifecycleCards,
  StatisticsOverviewCards,
  StatisticsPoolSection,
  StatisticsRecentSection,
} from "@/components/pages/statistics";
import { Button } from "@/components/ui/buttons";
import { Heading, Text } from "@/components/ui/typography";
import { getStatisticsMock } from "@/lib/mocks/statistics.mock";
import { cn } from "@/lib/cn";

const YEAR_OPTIONS = [0, 1, 2].map((offset) => new Date().getFullYear() - offset);

export function StatisticsPage() {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [tick, setTick] = useState(0);

  const data = useMemo(() => getStatisticsMock(year), [year, tick]);

  const locale = i18n.language.startsWith("ar") ? ar : enUS;
  const todayLabel = format(new Date(), "PPP", { locale });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <Heading as="h1">{t("statistics.title")}</Heading>
          <Text muted className="mt-2 max-w-2xl">
            {t("statistics.subtitle")}
          </Text>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>{todayLabel}</span>
          </div>

          <label className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t("statistics.yearLabel")}</span>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className={cn(
                "h-10 min-w-[5.5rem] rounded-lg border border-border bg-surface px-3 text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
              )}
            >
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setTick((n) => n + 1)}
          >
            <RefreshCw className="h-4 w-4" />
            {t("statistics.refresh")}
          </Button>
        </div>
      </div>

      <StatisticsOverviewCards
        overview={data.overview}
        weekNewSubscribers={data.thisWeek.newSubscribers}
        weekUsernamesAdded={data.thisWeek.availableUsernamesAdded}
      />

      <StatisticsLifecycleCards summary={data.subscription.summary} />

      <StatisticsActivitySection
        thisWeek={data.thisWeek}
        newThisMonth={data.thisMonth.newSubscribers}
      />

      <StatisticsChartsSection data={data} />

      <StatisticsPoolSection rows={data.availableDaysBreakdownBySpeed} />

      <StatisticsRecentSection
        newSubscribers={data.recentNewSubscribers}
        usernameChanges={data.todayUsernameChanges}
      />

      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <QuickLink to="/customers" label={t("statistics.links.viewCustomers")} />
        <QuickLink to="/subscribers" label={t("statistics.links.viewSubscribers")} />
        <QuickLink to="/expiring" label={t("statistics.links.viewExpiring")} />
        <QuickLink to="/stopped" label={t("statistics.links.viewStopped")} />
      </div>
    </div>
  );
}

function QuickLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {label}
    </Link>
  );
}
