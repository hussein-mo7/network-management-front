import { useTranslation } from "react-i18next";
import { SpeedTierPicker } from "@/components/pages/speeds";
import { Button } from "@/components/ui/buttons";
import { Text } from "@/components/ui/typography";
import type { SpeedTier } from "@/types/speeds";
import type { SpeedHistoryEntry, UsernameHistoryEntry } from "@/types/subscriber";
import { format, parseISO } from "date-fns";

interface SubscriberUsernameTabProps {
  usernameHistory: UsernameHistoryEntry[];
  speedHistory: SpeedHistoryEntry[];
  canManage?: boolean;
  isStopped?: boolean;
  currentUsername?: string | null;
  showAssign?: boolean;
  showChange?: boolean;
  speedTiers?: SpeedTier[];
  assignSpeedId?: number | null;
  onAssignSpeedChange?: (speedId: number) => void;
  onPickUsername?: () => void;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  try {
    return format(parseISO(value), "yyyy-MM-dd");
  } catch {
    return value;
  }
}

export function SubscriberUsernameTab({
  usernameHistory,
  speedHistory,
  canManage = false,
  isStopped = false,
  currentUsername = null,
  showAssign = false,
  showChange = false,
  speedTiers = [],
  assignSpeedId = null,
  onAssignSpeedChange,
  onPickUsername,
}: SubscriberUsernameTabProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {isStopped ? (
        <div className="rounded-xl border border-warning/30 bg-warning/5 px-4 py-4">
          <Text className="text-sm font-semibold">{t("subscribers.username.stoppedTitle")}</Text>
          <Text muted className="mt-1 text-sm">
            {currentUsername
              ? t("subscribers.username.stoppedWithStaleUsername")
              : t("subscribers.username.stoppedNoUsername")}
          </Text>
        </div>
      ) : null}

      {canManage && showAssign ? (
        <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
          <Text className="text-sm font-semibold">{t("subscribers.username.assignFromPool")}</Text>
          <Text muted className="text-sm">{t("subscribers.username.assignHint")}</Text>

          {speedTiers.length > 0 ? (
            <div className="space-y-2">
              <Text className="text-xs font-medium text-muted-foreground">
                {t("subscribers.username.pickSpeedForPool")}
              </Text>
              <SpeedTierPicker
                tiers={speedTiers}
                selectedId={assignSpeedId ?? speedTiers[0]?.id ?? 0}
                onSelect={(tier) => onAssignSpeedChange?.(tier.id)}
              />
            </div>
          ) : (
            <Text muted className="text-sm">{t("subscribers.username.noSpeedTiers")}</Text>
          )}

          <Button
            size="sm"
            onClick={onPickUsername}
            disabled={!assignSpeedId && speedTiers.length > 0}
          >
            {t("subscribers.username.assignFromPool")}
          </Button>
        </div>
      ) : null}

      {canManage && showChange ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3">
          <Text muted className="text-sm">{t("subscribers.username.changeHint")}</Text>
          <Button size="sm" onClick={onPickUsername}>
            {t("subscribers.username.changeUsername")}
          </Button>
        </div>
      ) : null}

      <section className="space-y-3">
        <Text className="font-semibold">{t("subscribers.username.historyTitle")}</Text>
        {usernameHistory.length === 0 ? (
          <Text muted className="text-sm">{t("subscribers.username.historyEmpty")}</Text>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.table.username")}</th>
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.usageStart")}</th>
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.usageEnd")}</th>
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.changedAt")}</th>
                </tr>
              </thead>
              <tbody>
                {usernameHistory.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">{row.oldUsername}</td>
                    <td className="px-3 py-2">{formatDate(row.usageStartDate)}</td>
                    <td className="px-3 py-2">{formatDate(row.usageEndDate)}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatDate(row.changedAt.slice(0, 10))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <Text className="font-semibold">{t("subscribers.username.speedHistoryTitle")}</Text>
        {speedHistory.length === 0 ? (
          <Text muted className="text-sm">{t("subscribers.username.speedHistoryEmpty")}</Text>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.fromSpeed")}</th>
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.toSpeed")}</th>
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.daysUsed")}</th>
                  <th className="px-3 py-2 text-start font-semibold">{t("subscribers.username.changedAt")}</th>
                </tr>
              </thead>
              <tbody>
                {speedHistory.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="px-3 py-2">{row.oldSpeedMbps}M</td>
                    <td className="px-3 py-2">{row.newSpeedMbps}M</td>
                    <td className="px-3 py-2">{row.daysUsed ?? "—"}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatDate(row.changedAt.slice(0, 10))}
                    </td>
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
