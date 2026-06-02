import {
  endOfDay,
  format,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";

export type TicketStatus = "open" | "in_progress" | "waiting_customer" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketChannel = "phone" | "visit" | "whatsapp" | "other";

export interface SupportTicket {
  id: number;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  subscriberName: string;
  subscriberPhone: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

const today = new Date();

function daysAgo(days: number, hour = 10): string {
  const date = subDays(today, days);
  date.setHours(hour, 30, 0, 0);
  return date.toISOString();
}

export const mockSupportTickets: SupportTicket[] = [
  {
    id: 1,
    ticketNumber: "TKT-2026-0142",
    title: "No internet connection",
    description: "Subscriber reports complete outage since morning. Router lights are normal.",
    status: "in_progress",
    priority: "high",
    channel: "phone",
    subscriberName: "Ahmad Khalil",
    subscriberPhone: "0599123456",
    assignedTo: "Sara N.",
    createdAt: daysAgo(0, 9),
    updatedAt: daysAgo(0, 11),
  },
  {
    id: 2,
    ticketNumber: "TKT-2026-0141",
    title: "Slow speed during evening",
    description: "Speed drops below 2 Mbps after 6 PM. Wants speed check on the line.",
    status: "open",
    priority: "medium",
    channel: "whatsapp",
    subscriberName: "Layla Mansour",
    subscriberPhone: "0598765432",
    assignedTo: "Unassigned",
    createdAt: daysAgo(0, 8),
    updatedAt: daysAgo(0, 8),
  },
  {
    id: 3,
    ticketNumber: "TKT-2026-0140",
    title: "Router replacement request",
    description: "Old router overheating. Subscriber visited the office and requested a swap.",
    status: "waiting_customer",
    priority: "medium",
    channel: "visit",
    subscriberName: "Omar Haddad",
    subscriberPhone: "0599111222",
    assignedTo: "Mohammad R.",
    createdAt: daysAgo(1, 14),
    updatedAt: daysAgo(0, 10),
  },
  {
    id: 4,
    ticketNumber: "TKT-2026-0139",
    title: "Billing question — double charge",
    description: "Paid cash at office but account still shows debt. Needs finance follow-up.",
    status: "resolved",
    priority: "low",
    channel: "visit",
    subscriberName: "Nour Saleh",
    subscriberPhone: "0599333444",
    assignedTo: "Sara N.",
    createdAt: daysAgo(2, 11),
    updatedAt: daysAgo(0, 15),
    resolvedAt: daysAgo(0, 15),
  },
  {
    id: 5,
    ticketNumber: "TKT-2026-0138",
    title: "PPPoE password reset",
    description: "Forgot WiFi password after phone reset. Provided username over the phone.",
    status: "resolved",
    priority: "low",
    channel: "phone",
    subscriberName: "Yousef Darwish",
    subscriberPhone: "0599444555",
    assignedTo: "Mohammad R.",
    createdAt: daysAgo(0, 7),
    updatedAt: daysAgo(0, 7),
    resolvedAt: daysAgo(0, 7),
  },
  {
    id: 6,
    ticketNumber: "TKT-2026-0137",
    title: "Cable cut in building",
    description: "Whole building offline. Technician dispatched to junction box.",
    status: "in_progress",
    priority: "urgent",
    channel: "phone",
    subscriberName: "Building 12 — Admin",
    subscriberPhone: "0599555666",
    assignedTo: "Field team",
    createdAt: daysAgo(1, 9),
    updatedAt: daysAgo(0, 12),
  },
  {
    id: 7,
    ticketNumber: "TKT-2026-0136",
    title: "Upgrade speed package",
    description: "Wants to move from 16 Mbps to 32 Mbps. Callback scheduled.",
    status: "open",
    priority: "medium",
    channel: "phone",
    subscriberName: "Rania Qasem",
    subscriberPhone: "0599666777",
    assignedTo: "Unassigned",
    createdAt: daysAgo(2, 16),
    updatedAt: daysAgo(2, 16),
  },
  {
    id: 8,
    ticketNumber: "TKT-2026-0135",
    title: "Intermittent disconnects",
    description: "Connection drops every 20 minutes. Logs requested from MikroTik.",
    status: "resolved",
    priority: "high",
    channel: "whatsapp",
    subscriberName: "Tariq Abu Ali",
    subscriberPhone: "0599777888",
    assignedTo: "Sara N.",
    createdAt: daysAgo(3, 10),
    updatedAt: daysAgo(1, 17),
    resolvedAt: daysAgo(1, 17),
  },
  {
    id: 9,
    ticketNumber: "TKT-2026-0134",
    title: "New installation delay",
    description: "Installation scheduled a week ago — subscriber calling for update.",
    status: "in_progress",
    priority: "high",
    channel: "phone",
    subscriberName: "Hiba Nasser",
    subscriberPhone: "0599888999",
    assignedTo: "Mohammad R.",
    createdAt: daysAgo(4, 13),
    updatedAt: daysAgo(0, 9),
  },
  {
    id: 10,
    ticketNumber: "TKT-2026-0133",
    title: "Wrong username on invoice",
    description: "Username on receipt does not match PPPoE login. Corrected in system.",
    status: "resolved",
    priority: "low",
    channel: "visit",
    subscriberName: "Khaled Omari",
    subscriberPhone: "0599999000",
    assignedTo: "Sara N.",
    createdAt: daysAgo(5, 12),
    updatedAt: daysAgo(4, 11),
    resolvedAt: daysAgo(4, 11),
  },
  {
    id: 11,
    ticketNumber: "TKT-2026-0132",
    title: "WiFi range issue — second floor",
    description: "Signal weak upstairs. Recommended mesh extender; follow-up in 2 days.",
    status: "waiting_customer",
    priority: "low",
    channel: "phone",
    subscriberName: "Dina Farouk",
    subscriberPhone: "0599000111",
    assignedTo: "Mohammad R.",
    createdAt: daysAgo(6, 15),
    updatedAt: daysAgo(2, 10),
  },
  {
    id: 12,
    ticketNumber: "TKT-2026-0131",
    title: "Account suspended by mistake",
    description: "Paid yesterday but still blocked. Payment verified and restored.",
    status: "resolved",
    priority: "urgent",
    channel: "phone",
    subscriberName: "Fadi Issa",
    subscriberPhone: "0599011222",
    assignedTo: "Sara N.",
    createdAt: daysAgo(6, 8),
    updatedAt: daysAgo(5, 16),
    resolvedAt: daysAgo(5, 16),
  },
];

export interface SupportStats {
  openCount: number;
  inProgressCount: number;
  waitingCount: number;
  resolvedTodayCount: number;
  resolvedWeekCount: number;
  createdTodayCount: number;
  avgResolutionHours: number;
}

export function computeSupportStats(tickets: SupportTicket[]): SupportStats {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 6 });

  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter((t) => t.status === "in_progress").length;
  const waitingCount = tickets.filter((t) => t.status === "waiting_customer").length;

  const resolvedTodayCount = tickets.filter(
    (t) => t.resolvedAt && isSameDay(new Date(t.resolvedAt), now),
  ).length;

  const resolvedWeekCount = tickets.filter(
    (t) =>
      t.resolvedAt &&
      isWithinInterval(new Date(t.resolvedAt), { start: weekStart, end: endOfDay(now) }),
  ).length;

  const createdTodayCount = tickets.filter((t) =>
    isSameDay(new Date(t.createdAt), now),
  ).length;

  const resolvedWithDuration = tickets.filter((t) => t.resolvedAt);
  const avgResolutionHours =
    resolvedWithDuration.length > 0
      ? Math.round(
          resolvedWithDuration.reduce((sum, ticket) => {
            const created = new Date(ticket.createdAt).getTime();
            const resolved = new Date(ticket.resolvedAt!).getTime();
            return sum + (resolved - created) / (1000 * 60 * 60);
          }, 0) / resolvedWithDuration.length,
        )
      : 0;

  return {
    openCount,
    inProgressCount,
    waitingCount,
    resolvedTodayCount,
    resolvedWeekCount,
    createdTodayCount,
    avgResolutionHours,
  };
}

export interface ChartCountItem {
  key: string;
  label: string;
  value: number;
}

export function getStatusChartData(tickets: SupportTicket[]): ChartCountItem[] {
  const counts: Record<TicketStatus, number> = {
    open: 0,
    in_progress: 0,
    waiting_customer: 0,
    resolved: 0,
  };

  for (const ticket of tickets) {
    counts[ticket.status] += 1;
  }

  return (Object.keys(counts) as TicketStatus[]).map((key) => ({
    key,
    label: key,
    value: counts[key],
  }));
}

export function getChannelChartData(tickets: SupportTicket[]): ChartCountItem[] {
  const counts: Record<TicketChannel, number> = {
    phone: 0,
    visit: 0,
    whatsapp: 0,
    other: 0,
  };

  for (const ticket of tickets) {
    counts[ticket.channel] += 1;
  }

  return (Object.keys(counts) as TicketChannel[]).map((key) => ({
    key,
    label: key,
    value: counts[key],
  }));
}

export interface DailyTrendPoint {
  date: string;
  label: string;
  created: number;
  resolved: number;
}

export function getDailyTrendData(tickets: SupportTicket[], days = 7): DailyTrendPoint[] {
  const points: DailyTrendPoint[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const day = subDays(today, i);
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);

    const created = tickets.filter((t) =>
      isWithinInterval(new Date(t.createdAt), { start: dayStart, end: dayEnd }),
    ).length;

    const resolved = tickets.filter(
      (t) =>
        t.resolvedAt &&
        isWithinInterval(new Date(t.resolvedAt), { start: dayStart, end: dayEnd }),
    ).length;

    points.push({
      date: format(day, "yyyy-MM-dd"),
      label: format(day, "EEE"),
      created,
      resolved,
    });
  }

  return points;
}

export function buildTicketNumber(id: number): string {
  const year = today.getFullYear();
  return `TKT-${year}-${String(id).padStart(4, "0")}`;
}
