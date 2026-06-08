import { apiClient, apiDelete, apiGet, apiPost, apiPut } from "@/lib/apiClient";
import {
  mapInvoiceRecord,
  mapPaymentMethodToApi,
  mapSpeedHistory,
  mapSubscriberProfileResponse,
  mapSubscriberRecord,
  mapUsernameHistory,
  type BackendInvoiceRow,
  type BackendSpeedHistoryRow,
  type BackendSubscriberRow,
  type BackendSubscriberProfileResponse,
  type BackendSubscribersListResponse,
  type BackendUsernameHistoryRow,
  type SubscriberProfileDto,
} from "@/lib/mapSubscribers";
import type { Subscriber, SubscriberInvoice, SpeedHistoryEntry, UsernameHistoryEntry } from "@/types/subscriber";

export interface SubscribersListParams {
  suspended?: boolean;
  expired?: boolean;
  search?: string;
  speed?: number;
  page?: number;
  limit?: number;
}

interface ApiListEnvelope<T> {
  status?: string;
  success?: boolean;
  data: T;
}

export const subscribersService = {
  async list(params: SubscribersListParams = {}): Promise<Subscriber[]> {
    const response = await apiClient.get<BackendSubscribersListResponse>("/subscribers", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 200,
        suspended: params.suspended ?? false,
        expired: params.expired ?? false,
        ...(params.search?.trim() ? { search: params.search.trim() } : {}),
        ...(typeof params.speed === "number" && Number.isFinite(params.speed)
          ? { speed: params.speed }
          : {}),
      },
    }).then((r) => r.data);

    const rows = response.data?.data ?? [];
    return rows.map(mapSubscriberRecord);
  },

  async getProfile(id: number): Promise<SubscriberProfileDto> {
    const response = await apiGet<BackendSubscriberProfileResponse>(`/subscribers/profile/${id}`);
    return mapSubscriberProfileResponse(response);
  },

  /** Resolve line ID via list search, then load profile (subscribers controller only). */
  async getByLineId(lineId: string): Promise<SubscriberProfileDto> {
    const trimmed = lineId.trim();
    const [activeRows, stoppedRows] = await Promise.all([
      this.list({ search: trimmed, limit: 200, suspended: false, expired: false }),
      this.list({ search: trimmed, limit: 200, suspended: true }),
    ]);
    const match = [...activeRows, ...stoppedRows].find((row) => row.lineId === trimmed);
    if (!match) throw new Error("Subscriber not found");
    return this.getProfile(match.id);
  },

  async update(
    id: number,
    body: {
      fullName?: string;
      facilityType?: string | null;
      phone?: string | null;
      password?: string | null;
      monthlyPrice?: number;
      isSuspended?: boolean;
      isPaused?: boolean;
      speedId?: number;
      notes?: string | null;
    },
  ): Promise<Subscriber> {
    const response = await apiPut<{ success: boolean; data: BackendSubscriberRow }>(`/subscribers/${id}`, {
      ...body,
      ...(body.monthlyPrice !== undefined ? { monthlyPrice: String(body.monthlyPrice) } : {}),
    });

    if (!response.data) {
      throw new Error("Invalid subscriber update response");
    }
    return mapSubscriberRecord(response.data);
  },

  async remove(id: number): Promise<void> {
    await apiDelete(`/subscribers/${id}`);
  },

  async removeAll(): Promise<void> {
    await apiDelete("/subscribers");
  },

  async assignUsername(subscriberId: number, availableUsernameId: number): Promise<Subscriber> {
    const response = await apiPost<ApiListEnvelope<Parameters<typeof mapSubscriberRecord>[0]>>(
      `/subscribers/${subscriberId}/assign-username/${availableUsernameId}`,
    );
    const row = response.data;
    if (!row) throw new Error("Invalid assign username response");
    return mapSubscriberRecord(row);
  },

  async getUsernameHistory(subscriberId: number, lineId: string): Promise<UsernameHistoryEntry[]> {
    const response = await apiGet<ApiListEnvelope<BackendUsernameHistoryRow[]>>(
      `/subscribers/${subscriberId}/username-history`,
    );
    return mapUsernameHistory(response.data ?? [], lineId);
  },

  async createUsernameHistoryEntry(
    subscriberId: number,
    lineId: string,
    body: {
      oldUsername: string;
      oldPassword?: string | null;
      usageStartDate?: string | null;
      usageEndDate?: string | null;
    },
  ): Promise<UsernameHistoryEntry> {
    const response = await apiPost<ApiListEnvelope<BackendUsernameHistoryRow>>(
      `/subscribers/${subscriberId}/username-history`,
      {
        oldUsername: body.oldUsername,
        oldPassword: body.oldPassword ?? null,
        usageStartDate: body.usageStartDate || null,
        usageEndDate: body.usageEndDate || null,
      },
    );
    const row = response.data;
    if (!row) throw new Error("Invalid username history response");
    return mapUsernameHistory([row], lineId)[0];
  },

  async updateUsernameHistoryEntry(
    subscriberId: number,
    lineId: string,
    historyId: number,
    body: {
      oldUsername: string;
      oldPassword?: string | null;
      usageStartDate?: string | null;
      usageEndDate?: string | null;
    },
  ): Promise<UsernameHistoryEntry> {
    const response = await apiPut<ApiListEnvelope<BackendUsernameHistoryRow>>(
      `/subscribers/${subscriberId}/username-history/${historyId}`,
      {
        oldUsername: body.oldUsername,
        oldPassword: body.oldPassword ?? null,
        usageStartDate: body.usageStartDate || null,
        usageEndDate: body.usageEndDate || null,
      },
    );
    const row = response.data;
    if (!row) throw new Error("Invalid username history response");
    return mapUsernameHistory([row], lineId)[0];
  },

  async deleteUsernameHistoryEntry(subscriberId: number, historyId: number): Promise<void> {
    await apiDelete(`/subscribers/${subscriberId}/username-history/${historyId}`);
  },

  async getSpeedHistory(subscriberId: number, lineId: string): Promise<SpeedHistoryEntry[]> {
    const response = await apiGet<ApiListEnvelope<BackendSpeedHistoryRow[]>>(
      `/subscribers/${subscriberId}/speed-history`,
    );
    return mapSpeedHistory(response.data ?? [], lineId);
  },

  async listInvoices(subscriberId: number, lineId: string): Promise<SubscriberInvoice[]> {
    const response = await apiGet<ApiListEnvelope<BackendInvoiceRow[]>>(
      `/subscribers/${subscriberId}/invoices`,
    );
    return (response.data ?? []).map((row) => mapInvoiceRecord(row, lineId));
  },

  async createInvoice(
    subscriberId: number,
    lineId: string,
    body: {
      amount: number;
      paidAmount: number;
      paymentMethod: import("@/types/subscriber").PaymentMethod;
      notes?: string;
    },
  ): Promise<SubscriberInvoice> {
    const response = await apiPost<ApiListEnvelope<BackendInvoiceRow>>(
      `/subscribers/${subscriberId}/invoices`,
      {
        amount: String(body.amount),
        paidAmount: String(body.paidAmount),
        paymentMethod: mapPaymentMethodToApi(body.paymentMethod),
        notes: body.notes?.trim() || undefined,
      },
    );
    const row = response.data;
    if (!row) throw new Error("Invalid invoice response");
    return mapInvoiceRecord(row, lineId);
  },

  async deleteInvoice(subscriberId: number, invoiceId: number): Promise<void> {
    await apiDelete(`/subscribers/${subscriberId}/invoices/${invoiceId}`);
  },
};
