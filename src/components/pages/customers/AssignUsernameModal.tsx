import { useTranslation } from "react-i18next";
import {
  PickAvailableUsernameModal,
  type PickedUsername,
} from "@/components/pages/subscribers/PickAvailableUsernameModal";
import type { Customer } from "@/types/customer";

interface AssignUsernameModalProps {
  open: boolean;
  customer: Customer;
  speedId?: number | null;
  /** Selected speed tier Mbps — required when customer has no subscription yet */
  speedMbps?: number;
  onClose: () => void;
  onAssign: (picked: PickedUsername) => void;
  isSubmitting?: boolean;
}

export function AssignUsernameModal({
  open,
  customer,
  speedId,
  speedMbps = 0,
  onClose,
  onAssign,
  isSubmitting = false,
}: AssignUsernameModalProps) {
  const { t } = useTranslation();
  const resolvedSpeedMbps = speedMbps || customer.speedMbps || 4;

  return (
    <PickAvailableUsernameModal
      open={open}
      onClose={onClose}
      title={t("customers.assign.title")}
      hint={t("customers.assign.hint")}
      speedMbps={resolvedSpeedMbps}
      packageLine={resolvedSpeedMbps}
      speedId={speedId}
      onConfirm={onAssign}
      isSubmitting={isSubmitting}
    />
  );
}
