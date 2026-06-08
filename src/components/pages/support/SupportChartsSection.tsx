import { useTranslation } from "react-i18next";
import {
  CHART_COLORS,
  CHART_MARGIN,
  CHART_PALETTE,
  ChartCard,
  ChartLegendRow,
  ChartYAxis,
} from "@/components/ui/charts";
import { CHART_AXIS_TICK } from "@/components/ui/charts/chartLayout";
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
  getChannelChartData,
  getDailyTrendData,
  getStatusChartData,
} from "@/lib/supportAnalytics";
import type {
  ChartCountItem,
  DailyTrendPoint,
  SupportTicket,
  TicketStatus,
} from "@/types/supportTicket";

/** Match table badges: resolved = green, open = amber, etc. */
const TICKET_STATUS_CHART_COLORS: Record<TicketStatus, string> = {
  open: CHART_COLORS.warning,
  in_progress: CHART_COLORS.primary,
  waiting_customer: CHART_COLORS.accent,
  resolved: CHART_COLORS.success,
};

function statusChartColor(key: string): string {
  return TICKET_STATUS_CHART_COLORS[key as TicketStatus] ?? CHART_COLORS.muted;
}

interface SupportChartsSectionProps {
  tickets: SupportTicket[];
}

export function SupportChartsSection({ tickets }: SupportChartsSectionProps) {
  const { t } = useTranslation();
  const statusData = getStatusChartData(tickets);
  const channelData = getChannelChartData(tickets);
  const dailyTrend = getDailyTrendData(tickets);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <StatusDonutChart data={statusData} title={t("support.charts.byStatus")} />
      <DailyTrendChart data={dailyTrend} title={t("support.charts.dailyTrend")} />
      <WeeklyBarChart data={dailyTrend} title={t("support.charts.weeklyActivity")} />
      <ChannelPieChart data={channelData} title={t("support.charts.byChannel")} />
    </div>
  );
}

function StatusDonutChart({ data, title }: { data: ChartCountItem[]; title: string }) {
  const { t } = useTranslation();

  const chartData = data
    .filter((item) => item.value > 0)
    .map((item) => ({
      ...item,
      name: t(`support.status.${item.key}`),
    }));

  const legendItems = chartData.map((item) => ({
    label: item.name,
    color: statusChartColor(item.key),
    type: "square" as const,
  }));

  return (
    <ChartCard
      title={title}
      description={t("support.charts.byStatusHint")}
      legend={<ChartLegendRow items={legendItems} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={2}
          >
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={statusChartColor(entry.key)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function DailyTrendChart({ data, title }: { data: DailyTrendPoint[]; title: string }) {
  const { t } = useTranslation();

  const legendItems = [
    { label: t("support.charts.created"), color: CHART_COLORS.primary, type: "line" as const },
    { label: t("support.charts.resolved"), color: CHART_COLORS.success, type: "line" as const },
  ];

  return (
    <ChartCard
      title={title}
      description={t("support.charts.dailyTrendHint")}
      legend={<ChartLegendRow items={legendItems} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
          <XAxis dataKey="label" tick={CHART_AXIS_TICK} tickMargin={8} axisLine={false} tickLine={false} />
          <ChartYAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="created"
            name={t("support.charts.created")}
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="resolved"
            name={t("support.charts.resolved")}
            stroke={CHART_COLORS.success}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function WeeklyBarChart({ data, title }: { data: DailyTrendPoint[]; title: string }) {
  const { t } = useTranslation();

  const legendItems = [
    { label: t("support.charts.created"), color: CHART_COLORS.primary, type: "square" as const },
    { label: t("support.charts.resolved"), color: CHART_COLORS.success, type: "square" as const },
  ];

  return (
    <ChartCard
      title={title}
      description={t("support.charts.weeklyActivityHint")}
      legend={<ChartLegendRow items={legendItems} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
          <XAxis dataKey="label" tick={CHART_AXIS_TICK} tickMargin={8} axisLine={false} tickLine={false} />
          <ChartYAxis />
          <Tooltip />
          <Bar
            dataKey="created"
            name={t("support.charts.created")}
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="resolved"
            name={t("support.charts.resolved")}
            fill={CHART_COLORS.success}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChannelPieChart({ data, title }: { data: ChartCountItem[]; title: string }) {
  const { t } = useTranslation();

  const chartData = data
    .filter((item) => item.value > 0)
    .map((item) => ({
      ...item,
      name: t(`support.channel.${item.key}`),
    }));

  const legendItems = chartData.map((item, index) => ({
    label: item.name,
    color: CHART_PALETTE[index % CHART_PALETTE.length],
    type: "square" as const,
  }));

  return (
    <ChartCard
      title={title}
      description={t("support.charts.byChannelHint")}
      legend={<ChartLegendRow items={legendItems} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={88}
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.key} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
