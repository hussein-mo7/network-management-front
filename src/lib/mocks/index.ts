export {
  countAvailableBySpeedId,
  countUsernamesBySpeedId,
  getUsernamesBySpeedId,
  mockAvailableUsernames,
  mockSpeedTiers,
  type SpeedTier,
} from "./availableUsernames.mock";

export { getSpeedTierById } from "./speeds.mock";

export {
  buildTicketNumber,
  computeSupportStats,
  getChannelChartData,
  getDailyTrendData,
  getStatusChartData,
  mockSupportTickets,
  type ChartCountItem,
  type DailyTrendPoint,
  type SupportStats,
  type SupportTicket,
  type TicketChannel,
  type TicketPriority,
  type TicketStatus,
} from "./supportTickets.mock";
