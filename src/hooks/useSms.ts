import { useMutation, useQuery } from "@tanstack/react-query";
import { smsService, type SendSmsPayload } from "@/services/sms.service";
import type { SmsAudienceFilter } from "@/types/sms";

export const smsRecipientsQueryKey = (audience: SmsAudienceFilter, search: string) =>
  ["sms", "recipients", audience, search] as const;

export function useSmsRecipientsQuery(
  audience: SmsAudienceFilter,
  search: string,
  enabled = true,
) {
  return useQuery({
    queryKey: smsRecipientsQueryKey(audience, search),
    queryFn: () => smsService.listRecipients(audience, search),
    enabled,
  });
}

export function useSendSmsMutation() {
  return useMutation({
    mutationFn: (payload: SendSmsPayload) => smsService.send(payload),
  });
}
