import { apiClient } from "@/lib/apiClient";
import { STATISTICS_RECENT_PAGE_SIZE } from "@/lib/statisticsRecent";
import type {
  RecentSubscriberRow,
  StatisticsData,
  StatisticsDayListResult,
  UsernameChangeRow,
} from "@/types/statistics";

interface StatisticsResponse {
  status: string;
  data: StatisticsData;
}

interface PaginatedResponse<T> {
  status: string;
  data: StatisticsDayListResult<T>;
}

export const statisticsService = {
  async getDashboard(year: number): Promise<StatisticsData> {
    const { data: response } = await apiClient.get<StatisticsResponse>("/statistics", {
      params: { year },
    });
    return response.data;
  },

  async getUsernameChangesByDate(
    date: string,
    page = 1,
    limit = STATISTICS_RECENT_PAGE_SIZE,
  ): Promise<StatisticsDayListResult<UsernameChangeRow>> {
    const { data: response } = await apiClient.get<PaginatedResponse<UsernameChangeRow>>(
      "/statistics/username-changes",
      { params: { date, page, limit } },
    );
    return (
      response.data ?? {
        items: [],
        total: 0,
        page,
        limit,
      }
    );
  },

  async getNewSubscribersByDate(
    date: string,
    page = 1,
    limit = STATISTICS_RECENT_PAGE_SIZE,
  ): Promise<StatisticsDayListResult<RecentSubscriberRow>> {
    const { data: response } = await apiClient.get<PaginatedResponse<RecentSubscriberRow>>(
      "/statistics/new-subscribers",
      { params: { date, page, limit } },
    );
    return (
      response.data ?? {
        items: [],
        total: 0,
        page,
        limit,
      }
    );
  },
};
