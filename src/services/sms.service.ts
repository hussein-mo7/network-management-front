import { apiClient, apiPost } from "@/lib/apiClient";
import type { SmsAudienceFilter, SmsRecipient } from "@/types/sms";

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

  async send(payload: SendSmsPayload): Promise<SendSmsResult> {
    const response = await apiPost<SendSmsResponse>("/sms", payload);
    if (!response.data) throw new Error("Invalid SMS send response");
    return response.data;
  },
};
