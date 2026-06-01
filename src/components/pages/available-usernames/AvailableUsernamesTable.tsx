import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { MaskedPasswordCell } from "@/components/ui/data";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import type { AvailableUsername } from "@/lib/mocks";
import { cn } from "@/lib/cn";

interface AvailableUsernamesTableProps {
  rows: AvailableUsername[];
  className?: string;
  onEdit?: (row: AvailableUsername) => void;
  onDelete?: (row: AvailableUsername) => void;
}

export function AvailableUsernamesTable({
  rows,
  className,
  onEdit,
  onDelete,
}: AvailableUsernamesTableProps) {
  const { t } = useTranslation();
  const { canManage } = useRoleAccess();

  const columns = canManage
    ? { username: "w-[28%]", password: "w-[26%]", status: "w-[18%]", date: "w-[16%]", actions: "w-[12%]" }
    : { username: "w-[32%]", password: "w-[28%]", status: "w-[22%]", date: "w-[18%]", actions: "" };

  return (
    <div className={className}>
      <AvailableUsernamesMobileList
        rows={rows}
        canManage={canManage}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <div className="hidden overflow-x-auto rounded-xl border border-border lg:block">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className={cn(columns.username, "px-4 py-3 text-start align-middle font-semibold text-foreground")}>
                {t("availableUsernames.table.username")}
              </th>
              <th className={cn(columns.password, "px-4 py-3 text-start align-middle font-semibold text-foreground")}>
                {t("availableUsernames.table.password")}
              </th>
              <th className={cn(columns.status, "px-4 py-3 text-start align-middle font-semibold text-foreground")}>
                {t("availableUsernames.table.status")}
              </th>
              <th className={cn(columns.date, "px-4 py-3 text-start align-middle font-semibold text-foreground")}>
                {t("availableUsernames.table.createdAt")}
              </th>
              {canManage ? (
                <th className={cn(columns.actions, "px-4 py-3 text-end align-middle font-semibold text-foreground")}>
                  {t("availableUsernames.table.actions")}
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 align-middle font-medium">
                  <span className="block truncate">{row.username}</span>
                </td>
                <td className="px-4 py-3 align-middle">
                  <MaskedPasswordCell value={row.password} />
                </td>
                <td className="px-4 py-3 align-middle">
                  <RowStatus row={row} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-middle text-muted-foreground">
                  {row.createdAt}
                </td>
                {canManage ? (
                  <td className="px-4 py-3 align-middle text-end">
                    <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AvailableUsernamesMobileList({
  rows,
  canManage,
  onEdit,
  onDelete,
}: {
  rows: AvailableUsername[];
  canManage: boolean;
  onEdit?: (row: AvailableUsername) => void;
  onDelete?: (row: AvailableUsername) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 lg:hidden">
      {rows.map((row) => (
        <article
          key={row.id}
          className="rounded-xl border border-border bg-background p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold text-foreground">{row.username}</p>
            <RowStatus row={row} />
          </div>

          <dl className="mt-4 space-y-3">
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
                {t("availableUsernames.table.createdAt")}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{row.createdAt}</dd>
            </div>
          </dl>

          {canManage ? (
            <div className="mt-4 flex justify-end border-t border-border pt-3">
              <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function RowStatus({ row }: { row: AvailableUsername }) {
  const { t } = useTranslation();

  return (
    <div className="inline-flex flex-wrap items-center gap-1.5">
      <StatusBadge
        label={
          row.isUsed
            ? t("availableUsernames.status.used")
            : t("availableUsernames.status.available")
        }
        variant={row.isUsed ? "muted" : "success"}
      />
      {row.isOwnerUsername ? (
        <span className="text-xs font-medium text-primary">
          {t("availableUsernames.status.owner")}
        </span>
      ) : null}
    </div>
  );
}

function RowActions({
  row,
  onEdit,
  onDelete,
}: {
  row: AvailableUsername;
  onEdit?: (row: AvailableUsername) => void;
  onDelete?: (row: AvailableUsername) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="inline-flex justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("common.edit")}
        onClick={() => onEdit?.(row)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("common.delete")}
        onClick={() => onDelete?.(row)}
      >
        <Trash2 className="h-4 w-4 text-danger" />
      </Button>
    </div>
  );
}

function StatusBadge({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "success" && "bg-success/10 text-success",
        variant === "muted" && "bg-muted text-muted-foreground",
      )}
    >
      {label}
    </span>
  );
}
