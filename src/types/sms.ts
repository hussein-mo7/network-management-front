export type SmsAudienceFilter =
  | "all"
  | "customers"
  | "expires1Day"
  | "expires2Days"
  | "expiresSoon"
  | "expired"
  | "stopped"
  | "withDebt";

export type SmsRecipientMode = "subscribers" | "customers" | "custom";

export type SmsTemplateId = "renewal" | "expired" | "support" | "blank";

export interface SmsRecipient {
  id: number;
  lineId: string;
  fullName: string;
  phone: string | null;
  username: string | null;
  balance: number;
  daysLeft: number | null;
  isSuspended: boolean;
}

export interface SmsTemplate {
  id: SmsTemplateId;
  body: string;
}
