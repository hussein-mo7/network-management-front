import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CHART_COLORS,
  CHART_MARGIN,
  CHART_PALETTE,
  ChartCard,
  ChartLegendRow,
  ChartYAxis,
} from "@/components/ui/charts";
import { CHART_AXIS_TICK } from "@/components/ui/charts/chartLayout";
import type {
  CustomerKindBreakdown,
  StatisticsData,
  SubscriptionStatusKey,
} from "@/types/statistics";

const MONTH_SHORT_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const MONTH_SHORT_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const STATUS_COLORS: Record<SubscriptionStatusKey, string> = {
  new: CHART_COLORS.accent,
  active: CHART_COLORS.primary,
  disabled: CHART_COLORS.danger,
  suspended: CHART_COLORS.warning,
};

const KIND_COLORS = {
  customer: CHART_COLORS.muted,
  subscriber: CHART_COLORS.primary,
  expiring: CHART_COLORS.warning,
  stopped: CHART_COLORS.danger,
} as const;

function monthLabel(monthKey: string, lang: string): string {
  const [y, mo] = monthKey.split("-");
  const idx = parseInt(mo, 10) - 1;
  const names = lang.startsWith("ar") ? MONTH_SHORT_AR : MONTH_SHORT_EN;
  return `${names[idx] ?? mo} ${y}`;
}

function dayLabel(dateKey: string, lang: string): string {
  const [, mo, da] = dateKey.split("-");
  return lang.startsWith("ar") ? `${da}/${mo}` : `${mo}/${da}`;
}

interface StatisticsChartsSectionProps {
  data: StatisticsData;
}

export function StatisticsChartsSection({ data }: StatisticsChartsSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const statusLabel = (key: SubscriptionStatusKey) =>
    t(`statistics.charts.status_${key}`);

  const distribution = data.subscription.distribution
    .filter((d) => d.count > 0)
    .map((d) => ({
      key: d.status,
      name: statusLabel(d.status),
      value: d.count,
      color: STATUS_COLORS[d.status],
    }));

  const trendData = data.subscription.monthlyTrend.map((m) => ({
    key: m.month,
    label: monthLabel(m.month, lang),
    new: m.new,
    active: m.active,
    disabled: m.disabled,
    suspended: m.suspended,
  }));

  const speedSubData = data.subscribersBySpeed.map((s, i) => ({
    key: String(s.speed),
    name: s.label,
    value: s.count,
    color: CHART_PALETTE[i % CHART_PALETTE.length],
  }));

  const speedPoolData = data.availableBySpeed.map((s, i) => ({
    key: String(s.speed),
    name: s.label,
    count: s.count,
    color: CHART_PALETTE[i % CHART_PALETTE.length],
  }));

  const dailyNew = data.charts.dailyNewSubscribers.map((d) => ({
    label: dayLabel(d.date, lang),
    count: d.count,
  }));

  const dailyAvailable = data.charts.dailyAvailableAdded.map((d) => ({
    label: dayLabel(d.date, lang),
    count: d.count,
  }));

  const facilityData = data.facilityTypes.map((f, i) => ({
    key: f.facilityType,
    name: f.facilityType,
    count: f.count,
    color: CHART_PALETTE[i % CHART_PALETTE.length],
  }));

  const kindData = buildKindChartData(data.customerBreakdown, t);

  const trendLegend = (
    ["new", "active", "disabled", "suspended"] as SubscriptionStatusKey[]
  ).map((key) => ({
    label: statusLabel(key),
    color: STATUS_COLORS[key],
    type: "line" as const,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <ChartCard
        title={t("statistics.charts.statusDonut")}
        description={t("statistics.charts.statusDonutSub")}
        legend={
          distribution.length > 0 ? (
            <ChartLegendRow items={distribution.map((d) => ({ label: d.name, color: d.color }))} />
          ) : undefined
        }
      >
        {distribution.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={distribution} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="82%" paddingAngle={2}>
                {distribution.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title={t("statistics.charts.customerKinds")}
        description={t("statistics.charts.customerKindsSub")}
        legend={
          kindData.length > 0 ? (
            <ChartLegendRow items={kindData.map((d) => ({ label: d.name, color: d.color }))} />
          ) : undefined
        }
      >
        {kindData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={kindData} dataKey="value" nameKey="name" outerRadius="82%" paddingAngle={2}>
                {kindData.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        className="xl:col-span-2"
        title={t("statistics.charts.monthlyTrend")}
        description={t("statistics.charts.monthlyTrendSub", { year: data.subscription.year })}
        legend={<ChartLegendRow items={trendLegend} />}
        chartClassName="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
            <XAxis dataKey="label" tick={CHART_AXIS_TICK} interval="preserveStartEnd" />
            <ChartYAxis />
            <Tooltip />
            {(["new", "active", "disabled", "suspended"] as SubscriptionStatusKey[]).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={statusLabel(key)}
                stroke={STATUS_COLORS[key]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        className="xl:col-span-2"
        title={t("statistics.charts.monthlyBars")}
        description={t("statistics.charts.monthlyBarsSub")}
        legend={<ChartLegendRow items={trendLegend.map((i) => ({ ...i, type: "square" as const }))} />}
        chartClassName="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
            <XAxis dataKey="label" tick={CHART_AXIS_TICK} />
            <ChartYAxis />
            <Tooltip />
            {(["new", "active", "disabled", "suspended"] as SubscriptionStatusKey[]).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                name={statusLabel(key)}
                stackId="a"
                fill={STATUS_COLORS[key]}
                radius={key === "suspended" ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title={t("statistics.charts.subscribersBySpeed")}
        description={t("statistics.charts.subscribersBySpeedSub")}
        legend={
          speedSubData.length > 0 ? (
            <ChartLegendRow items={speedSubData.map((d) => ({ label: d.name, color: d.color }))} />
          ) : undefined
        }
      >
        {speedSubData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={speedSubData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="78%">
                {speedSubData.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title={t("statistics.charts.availableBySpeed")}
        description={t("statistics.charts.availableBySpeedSub")}
      >
        {speedPoolData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={speedPoolData} margin={CHART_MARGIN}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
              <XAxis dataKey="name" tick={CHART_AXIS_TICK} />
              <ChartYAxis />
              <Tooltip />
              <Bar dataKey="count" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title={t("statistics.charts.dailyNew")}
        description={t("statistics.charts.dailyNewSub")}
        legend={
          <ChartLegendRow
            items={[{ label: t("statistics.activity.newSubscribers"), color: CHART_COLORS.primary, type: "line" }]}
          />
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyNew} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
            <XAxis dataKey="label" tick={CHART_AXIS_TICK} />
            <ChartYAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title={t("statistics.charts.dailyAvailable")}
        description={t("statistics.charts.dailyAvailableSub")}
        legend={
          <ChartLegendRow
            items={[{ label: t("statistics.activity.usernamesAdded"), color: CHART_COLORS.accent, type: "line" }]}
          />
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyAvailable} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
            <XAxis dataKey="label" tick={CHART_AXIS_TICK} />
            <ChartYAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS.accent}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        className="xl:col-span-2"
        title={t("statistics.charts.facilityTypes")}
        description={t("statistics.charts.facilityTypesSub")}
      >
        {facilityData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={facilityData} layout="vertical" margin={{ ...CHART_MARGIN, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" horizontal={false} />
              <XAxis type="number" tick={CHART_AXIS_TICK} allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={100} tick={CHART_AXIS_TICK} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {facilityData.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

function buildKindChartData(
  breakdown: CustomerKindBreakdown,
  t: (key: string) => string,
) {
  const rows = [
    { key: "customer", name: t("statistics.customers.customer"), value: breakdown.customer, color: KIND_COLORS.customer },
    { key: "subscriber", name: t("statistics.customers.subscriber"), value: breakdown.subscriber, color: KIND_COLORS.subscriber },
    { key: "expiring", name: t("statistics.customers.expiring"), value: breakdown.expiring, color: KIND_COLORS.expiring },
    { key: "stopped", name: t("statistics.customers.stopped"), value: breakdown.stopped, color: KIND_COLORS.stopped },
  ];
  return rows.filter((r) => r.value > 0);
}
