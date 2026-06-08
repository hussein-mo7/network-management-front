import { useState } from "react";
import { Info, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AvailableUsernameDetailsModal } from "@/components/pages/available-usernames/AvailableUsernameDetailsModal";
import {
  AvailableUsernameStatusBadge,
  AvailableUsernameStatusBadgeCompact,
} from "@/components/pages/available-usernames/AvailableUsernameStatusBadge";
import { Button } from "@/components/ui/buttons";
import { LtrText, MaskedPasswordCell } from "@/components/ui/data";
import {
  formatCreatedDate,
  getDaysUntilExpiry,
  getUsernameLifecycleStatus,
  type AvailableUsername,
} from "@/types/availableUsername";
import { cn } from "@/lib/cn";

interface AvailableUsernamesTableProps {
  rows: AvailableUsername[];
  speedLabel?: string;
  className?: string;
  onEdit?: (row: AvailableUsername) => void;
  onDelete?: (row: AvailableUsername) => void;
}

export function AvailableUsernamesTable({
  rows,
  speedLabel,
  className,
  onEdit,
  onDelete,
}: AvailableUsernamesTableProps) {
  const { t, i18n } = useTranslation();
  const [detailsRow, setDetailsRow] = useState<AvailableUsername | null>(null);
  const showActions = Boolean(onEdit || onDelete);

  const columns = showActions
    ? {
        username: "w-[20%]",
        password: "w-[18%]",
        status: "w-[14%]",
        expires: "w-[14%]",
        date: "w-[12%]",
        actions: "w-[14%]",
      }
    : {
        username: "w-[22%]",
        password: "w-[20%]",
        status: "w-[16%]",
        expires: "w-[16%]",
        date: "w-[14%]",
        actions: "w-[12%]",
      };

  return (
    <div className={className}>
      <AvailableUsernamesMobileList
        rows={rows}
        onDetails={setDetailsRow}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <div className="hidden w-full overflow-hidden rounded-xl border border-border lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className={cn(columns.username, "px-4 py-3 text-start font-semibold")}>
                {t("availableUsernames.table.username")}
              </th>
              <th className={cn(columns.password, "px-4 py-3 text-start font-semibold")}>
                {t("availableUsernames.table.password")}
              </th>
              <th className={cn(columns.status, "px-4 py-3 text-start font-semibold")}>
                {t("availableUsernames.table.status")}
              </th>
              <th className={cn(columns.expires, "px-4 py-3 text-start font-semibold")}>
                {t("availableUsernames.table.expires")}
              </th>
              <th className={cn(columns.date, "px-4 py-3 text-start font-semibold")}>
                {t("availableUsernames.table.createdAt")}
              </th>
              <th
                className={cn(
                  columns.actions,
                  "px-4 py-3 text-center align-middle font-semibold",
                )}
              >
                {t("availableUsernames.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3 align-middle font-medium">
                  <LtrText>{row.username}</LtrText>
                </td>
                <td className="pe-4 px-4 py-3 align-middle">
                  <MaskedPasswordCell value={row.password} />
                </td>
                <td className="ps-2 px-4 py-3 align-middle">
                  <AvailableUsernameStatusBadge row={row} />
                </td>
                <td className="px-4 py-3 align-middle">
                  <ExpiresCell row={row} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle text-muted-foreground">
                  {formatCreatedDate(row.createdAt, i18n.language)}
                </td>
                <td className="px-4 py-3 align-middle">
                  <RowActions
                    row={row}
                    onDetails={() => setDetailsRow(row)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AvailableUsernameDetailsModal
        open={detailsRow !== null}
        row={detailsRow}
        speedLabel={speedLabel}
        onClose={() => setDetailsRow(null)}
      />
    </div>
  );
}

function ExpiresCell({ row }: { row: AvailableUsername }) {
  const { t } = useTranslation();
  const lifecycle = getUsernameLifecycleStatus(row);

  if (lifecycle === "owner") {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  if (lifecycle === "new") {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  if (row.expiryDate) {
    const days = getDaysUntilExpiry(row.expiryDate);
    return (
      <span className="text-sm font-medium text-foreground">
        {t("availableUsernames.status.expiresIn", { count: days })}
      </span>
    );
  }

  return <span className="text-xs text-muted-foreground">—</span>;
}

function AvailableUsernamesMobileList({
  rows,
  onDetails,
  onEdit,
  onDelete,
}: {
  rows: AvailableUsername[];
  onDetails: (row: AvailableUsername) => void;
  onEdit?: (row: AvailableUsername) => void;
  onDelete?: (row: AvailableUsername) => void;
}) {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-3 lg:hidden">
      {rows.map((row) => (
        <article
          key={row.id}
          className="rounded-xl border border-border bg-background p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold text-foreground">{row.username}</p>
            <AvailableUsernameStatusBadgeCompact row={row} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">
                {t("availableUsernames.table.password")}
              </dt>
              <dd className="mt-1">
                <MaskedPasswordCell value={row.password} />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">
                {t("availableUsernames.table.expires")}
              </dt>
              <dd className="mt-1">
                <ExpiresCell row={row} />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">
                {t("availableUsernames.table.createdAt")}
              </dt>
              <dd className="mt-1 text-muted-foreground">
                {formatCreatedDate(row.createdAt, i18n.language)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex justify-end border-t border-border pt-3">
            <RowActions
              row={row}
              onDetails={() => onDetails(row)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function RowActions({
  row,
  onDetails,
  onEdit,
  onDelete,
}: {
  row: AvailableUsername;
  onDetails: () => void;
  onEdit?: (row: AvailableUsername) => void;
  onDelete?: (row: AvailableUsername) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("availableUsernames.details.view")}
        onClick={onDetails}
      >
        <Info className="h-4 w-4 text-muted-foreground" />
      </Button>
      {onEdit ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("common.edit")}
          onClick={() => onEdit(row)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      ) : null}
      {onDelete ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("common.delete")}
          onClick={() => onDelete(row)}
        >
          <Trash2 className="h-4 w-4 text-danger" />
        </Button>
      ) : null}
    </div>
  );
}
