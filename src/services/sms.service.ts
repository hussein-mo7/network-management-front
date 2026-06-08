import { apiClient, apiDelete, apiPost, apiPut } from "@/lib/apiClient";
import type { SmsAudienceFilter, SmsLog, SmsRecipient, SmsTemplate } from "@/types/sms";

interface SmsRecipientsResponse {
  success: boolean;
  data: {
    items: SmsRecipient[];
    total: number;
  };
}

export interface SendSmsPayload {
  recipientType: "subscribers" | "custom";
  message: string;
  subscriberIds?: number[];
  phone?: string;
  phones?: string[];
  templateId?: number;
}

export interface SendSmsResult {
  totalRequested: number;
  sentCount: number;
  failedCount: number;
  sent: Array<{ phone: string; providerResponse?: unknown }>;
  failed: Array<{ phone: string; error: string }>;
}

interface SendSmsResponse {
  success: boolean;
  message?: string;
  data: SendSmsResult;
}

interface SmsLogsResponse {
  success: boolean;
  data: {
    items: SmsLog[];
    total: number;
    page: number;
    limit: number;
  };
}

interface SmsTemplatesResponse {
  success: boolean;
  data: {
    items: SmsTemplate[];
  };
}

export const smsService = {
  async listRecipients(audience: SmsAudienceFilter, search?: string): Promise<SmsRecipient[]> {
    const { data: response } = await apiClient.get<SmsRecipientsResponse>("/sms/recipients", {
      params: {
        audience,
        ...(search?.trim() ? { search: search.trim() } : {}),
      },
    });
    return response.data?.items ?? [];
  },

  async listLogs(page = 1, limit = 50): Promise<SmsLogsResponse["data"]> {
    const { data: response } = await apiClient.get<SmsLogsResponse>("/sms/logs", {
      params: { page, limit },
    });
    if (!response.data) throw new Error("Invalid SMS logs response");
    return response.data;
  },

  async listTemplates(): Promise<SmsTemplate[]> {
    const { data: response } = await apiClient.get<SmsTemplatesResponse>("/sms/templates");
    return response.data?.items ?? [];
  },

  async createTemplate(payload: { name: string; body: string }): Promise<SmsTemplate> {
    const response = await apiPost<{ success: boolean; data: SmsTemplate }>("/sms/templates", payload);
    if (!response.data) throw new Error("Invalid template response");
    return response.data;
  },

  async updateTemplate(id: number, payload: { name?: string; body?: string }): Promise<SmsTemplate> {
    const response = await apiPut<{ success: boolean; data: SmsTemplate }>(`/sms/templates/${id}`, payload);
    if (!response.data) throw new Error("Invalid template response");
    return response.data;
  },

  async deleteTemplate(id: number): Promise<void> {
    await apiDelete(`/sms/templates/${id}`);
  },

  async send(payload: SendSmsPayload): Promise<SendSmsResult> {
    const response = await apiPost<SendSmsResponse>("/sms", payload);
    if (!response.data) throw new Error("Invalid SMS send response");
    return response.data;
  },
};
