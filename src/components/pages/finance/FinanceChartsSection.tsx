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
import { formatFinanceMethodLabel } from "@/lib/mocks/finance.mock";
import { formatMoney } from "@/lib/formatMoney";
import type { FinancialStats } from "@/types/finance";

const MONTH_SHORT_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const MONTH_SHORT_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthLabel(monthKey: string, lang: string): string {
  const [, mo] = monthKey.split("-");
  const idx = parseInt(mo, 10) - 1;
  const names = lang.startsWith("ar") ? MONTH_SHORT_AR : MONTH_SHORT_EN;
  const [y] = monthKey.split("-");
  return `${names[idx] ?? mo} ${y}`;
}

interface FinanceChartsSectionProps {
  stats: FinancialStats;
}

export function FinanceChartsSection({ stats }: FinanceChartsSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const trendData = stats.monthlyTrend.map((m) => ({
    key: m.month,
    label: monthLabel(m.month, lang),
    revenue: m.revenue,
    count: m.count,
  }));

  const speedData = stats.revenueBySpeed
    .filter((s) => s.revenue > 0)
    .map((s, i) => ({
      key: String(s.speed),
      name: s.label,
      value: s.revenue,
      color: CHART_PALETTE[i % CHART_PALETTE.length],
    }));

  const methodData = stats.byMethod.map((m, i) => ({
    key: m.method,
    name: formatFinanceMethodLabel(m.method, t),
    value: m.total,
    color: CHART_PALETTE[i % CHART_PALETTE.length],
  }));

  const tooltipMoney = (value: number | string | undefined) =>
    formatMoney(Number(value ?? 0), lang);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChartCard
        className="md:col-span-2"
        title={t("finance.charts.revenueTrend")}
        description={t("finance.charts.revenueTrendSub")}
        legend={
          <ChartLegendRow
            items={[{ label: t("finance.charts.paidLabel"), color: CHART_COLORS.primary }]}
          />
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={CHART_AXIS_TICK} interval="preserveStartEnd" />
            <ChartYAxis />
            <Tooltip formatter={(v) => tooltipMoney(v as number)} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              dot={{ r: 3 }}
              fill="rgba(20,184,166,0.08)"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title={t("finance.charts.revenueBySpeed")}
        description={t("finance.charts.revenueBySpeedSub")}
        legend={
          speedData.length > 0 ? (
            <ChartLegendRow items={speedData.map((d) => ({ label: d.name, color: d.color }))} />
          ) : undefined
        }
      >
        {speedData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={speedData} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="80%">
                {speedData.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => tooltipMoney(v as number)} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title={t("finance.charts.byMethod")}
        description={t("finance.charts.byMethodSub")}
        legend={
          methodData.length > 0 ? (
            <ChartLegendRow items={methodData.map((d) => ({ label: d.name, color: d.color }))} />
          ) : undefined
        }
      >
        {methodData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={methodData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="78%">
                {methodData.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => tooltipMoney(v as number)} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        className="md:col-span-2"
        title={t("finance.charts.monthlyBars")}
        description={t("finance.charts.monthlyBarsSub")}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={CHART_AXIS_TICK} />
            <ChartYAxis />
            <Tooltip formatter={(v) => tooltipMoney(v as number)} />
            <Bar dataKey="revenue" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <section className="md:col-span-2 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-4 py-3 sm:px-6">
          <h3 className="text-base font-semibold">{t("finance.charts.topSubscribers")}</h3>
          <p className="text-sm text-muted-foreground">{t("finance.charts.topSubscribersSub")}</p>
        </div>
        {stats.topSubscribers.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-muted-foreground">—</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t("finance.topTable.name")}
                  </th>
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t("finance.topTable.lineId")}
                  </th>
                  <th className="px-4 py-3 text-end font-medium text-muted-foreground">
                    {t("finance.topTable.totalPaid")}
                  </th>
                  <th className="px-4 py-3 text-end font-medium text-muted-foreground">
                    {t("finance.topTable.invoices")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.topSubscribers.map((row) => (
                  <tr key={row.lineId} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{row.fullName}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.lineId}</td>
                    <td className="px-4 py-3 text-end tabular-nums">{formatMoney(row.totalPaid, lang)}</td>
                    <td className="px-4 py-3 text-end tabular-nums">{row.invoiceCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
