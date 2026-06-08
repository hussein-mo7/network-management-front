import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalFooterButton } from "@/components/ui/modals";
import { Text } from "@/components/ui/typography";
import { useAvailableUsernamesQuery } from "@/hooks/useAvailableUsernames";
import { getAvailablePoolForSubscriber } from "@/lib/availableUsernamePool";
import { isInAvailablePool } from "@/types/availableUsername";
import { cn } from "@/lib/cn";

export interface PickedUsername {
  id: number;
  username: string;
  password: string;
}

interface PickAvailableUsernameModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  hint: string;
  speedMbps: number;
  packageLine: number;
  /** When set, loads pool from API (`/speeds/:id/usernames`) instead of mocks. */
  speedId?: number | null;
  excludeUsername?: string | null;
  onConfirm: (picked: PickedUsername) => void;
  isSubmitting?: boolean;
}

export function PickAvailableUsernameModal({
  open,
  onClose,
  title,
  hint,
  speedMbps,
  packageLine,
  speedId,
  excludeUsername,
  onConfirm,
  isSubmitting = false,
}: PickAvailableUsernameModalProps) {
  const { t } = useTranslation();

  const useApi = speedId != null && speedId > 0;
  const { data: apiRows = [], isLoading: poolLoading } = useAvailableUsernamesQuery(
    speedId ?? 0,
    open && useApi,
  );

  const pool = useMemo(() => {
    const list = useApi
      ? apiRows.filter((u) => isInAvailablePool(u))
      : getAvailablePoolForSubscriber(speedMbps, packageLine, { excludeUsername });

    if (!excludeUsername) return list;
    return list.filter((u) => u.username !== excludeUsername);
  }, [useApi, apiRows, speedMbps, packageLine, excludeUsername, open]);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (open) setSelectedId(pool[0]?.id ?? null);
  }, [open, pool]);

  const selected = pool.find((u) => u.id === selectedId);

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <Text muted className="mb-4 text-sm">
        {hint}
      </Text>

      <div className="max-h-52 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
        {poolLoading ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">{t("common.loading")}</p>
        ) : pool.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            {t("subscribers.username.poolEmpty")}
          </p>
        ) : (
          pool.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setSelectedId(u.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-start text-sm transition-colors",
                selectedId === u.id ? "bg-muted font-medium" : "hover:bg-muted/50",
              )}
            >
              <span className="font-mono" dir="ltr">
                {u.username}
              </span>
              <span className="text-xs text-muted-foreground">{speedMbps}M</span>
            </button>
          ))
        )}
      </div>

      <Text muted className="mt-3 text-xs">
        {t("subscribers.username.poolOnlyHint")}
      </Text>

      <div className="mt-6 flex justify-end gap-2">
        <ModalFooterButton variant="outline" onClick={onClose}>
          {t("common.cancel")}
        </ModalFooterButton>
        <ModalFooterButton
          disabled={!selected || isSubmitting}
          isLoading={isSubmitting}
          onClick={() =>
            selected && onConfirm({ id: selected.id, username: selected.username, password: selected.password })
          }
        >
          {t("subscribers.username.confirmPick")}
        </ModalFooterButton>
      </div>
    </Modal>
  );
}
