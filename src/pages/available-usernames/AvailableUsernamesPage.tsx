import { Download, Plus, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SpeedTierPicker } from "@/components/pages/speeds";
import {
  AvailableUsernameFormModal,
  AvailableUsernamesTable,
  ImportUsernamesModal,
  type AvailableUsernameFormValues,
} from "@/components/pages/available-usernames";
import { ConfirmDialog } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { Heading, Text } from "@/components/ui/typography";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {
  mockAvailableUsernames,
  mockSpeedTiers,
  type AvailableUsername,
  type SpeedTier,
} from "@/lib/mocks";

type UsernameDialog =
  | { type: "add" }
  | { type: "edit"; row: AvailableUsername }
  | { type: "delete"; row: AvailableUsername }
  | { type: "import" };

export function AvailableUsernamesPage() {
  const { t } = useTranslation();
  const { canManage } = useRoleAccess();
  const [speedTiers] = useState<SpeedTier[]>(() => [...mockSpeedTiers]);
  const [rows, setRows] = useState<AvailableUsername[]>(() => [...mockAvailableUsernames]);
  const [selectedSpeedId, setSelectedSpeedId] = useState(speedTiers[0]?.id ?? 1);
  const [dialog, setDialog] = useState<UsernameDialog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTier =
    speedTiers.find((tier) => tier.id === selectedSpeedId) ?? speedTiers[0];
  const filteredRows = useMemo(
    () => rows.filter((row) => row.speedId === selectedSpeedId),
    [rows, selectedSpeedId],
  );

  const getSpeedCounts = (speedId: number) => {
    const list = rows.filter((row) => row.speedId === speedId);
    return {
      total: list.length,
      available: list.filter((row) => !row.isUsed).length,
    };
  };

  const nextId = useMemo(
    () => (rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1),
    [rows],
  );

  if (!selectedTier) return null;

  const handleCreate = async (values: AvailableUsernameFormValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    if (rows.some((row) => row.username.toLowerCase() === values.username.trim().toLowerCase())) {
      toast.error(t("availableUsernames.form.duplicateUsername"));
      setIsSubmitting(false);
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setRows((prev) => [
      ...prev,
      {
        id: nextId,
        username: values.username.trim(),
        password: values.password,
        speedId: selectedSpeedId,
        isUsed: false,
        isOwnerUsername: values.isOwnerUsername,
        createdAt: today,
      },
    ]);

    toast.success(t("availableUsernames.form.createSuccess"));
    setDialog(null);
    setIsSubmitting(false);
  };

  const handleUpdate = async (values: AvailableUsernameFormValues) => {
    if (dialog?.type !== "edit") return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    setRows((prev) =>
      prev.map((row) =>
        row.id === dialog.row.id
          ? {
              ...row,
              password: values.password.trim() || row.password,
            }
          : row,
      ),
    );

    toast.success(t("availableUsernames.form.updateSuccess"));
    setDialog(null);
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (dialog?.type !== "delete") return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    setRows((prev) => prev.filter((row) => row.id !== dialog.row.id));
    toast.success(t("availableUsernames.form.deleteSuccess"));
    setDialog(null);
    setIsSubmitting(false);
  };

  const handleImport = async (file: File) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success(t("availableUsernames.form.importSuccess", { file: file.name }));
    setDialog(null);
    setIsSubmitting(false);
  };

  const handleExport = () => {
    toast.success(t("availableUsernames.form.exportSuccess", { speed: selectedTier.label }));
  };

  const deleteRow = dialog?.type === "delete" ? dialog.row : null;

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="min-w-0">
        <Heading as="h1">{t("availableUsernames.title")}</Heading>
        <Text muted className="mt-2">
          {t("availableUsernames.subtitle")}
        </Text>
      </div>

      <div className="space-y-3">
        <Text className="text-sm font-medium text-foreground">
          {t("availableUsernames.pickSpeed")}
        </Text>
        <SpeedTierPicker
          tiers={speedTiers}
          selectedId={selectedSpeedId}
          onSelect={(tier) => setSelectedSpeedId(tier.id)}
          getCounts={getSpeedCounts}
        />
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Heading as="h2" className="text-lg sm:text-xl">
              {t("availableUsernames.sectionTitle", { speed: selectedTier.label })}
            </Heading>
            <Text muted className="mt-1.5 text-sm">
              {t("availableUsernames.sectionSubtitle", {
                speed: selectedTier.label,
                count: filteredRows.length,
              })}
            </Text>
          </div>

          {canManage ? (
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setDialog({ type: "import" })}
              >
                <Upload className="h-4 w-4" />
                <span className="truncate">
                  {t("availableUsernames.actions.importForSpeed", { speed: selectedTier.label })}
                </span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                {t("availableUsernames.actions.export")}
              </Button>
              <Button
                size="sm"
                className="col-span-2 w-full sm:col-span-1 sm:w-auto"
                onClick={() => setDialog({ type: "add" })}
              >
                <Plus className="h-4 w-4" />
                {t("availableUsernames.actions.addForSpeed", { speed: selectedTier.label })}
              </Button>
            </div>
          ) : null}
        </div>

        {filteredRows.length > 0 ? (
          <AvailableUsernamesTable
            rows={filteredRows}
            onEdit={canManage ? (row) => setDialog({ type: "edit", row }) : undefined}
            onDelete={canManage ? (row) => setDialog({ type: "delete", row }) : undefined}
          />
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-10 text-center">
            <Text muted>{t("availableUsernames.emptyForSpeed", { speed: selectedTier.label })}</Text>
            {canManage ? (
              <Button
                size="sm"
                className="mt-4"
                onClick={() => setDialog({ type: "add" })}
              >
                <Plus className="h-4 w-4" />
                {t("availableUsernames.actions.addForSpeed", { speed: selectedTier.label })}
              </Button>
            ) : null}
          </div>
        )}
      </section>

      <AvailableUsernameFormModal
        open={dialog?.type === "add"}
        mode="add"
        speedTier={selectedTier}
        onClose={() => setDialog(null)}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
      />

      <AvailableUsernameFormModal
        open={dialog?.type === "edit"}
        mode="edit"
        speedTier={selectedTier}
        initialRow={dialog?.type === "edit" ? dialog.row : undefined}
        onClose={() => setDialog(null)}
        onSubmit={handleUpdate}
        isSubmitting={isSubmitting}
      />

      <ImportUsernamesModal
        open={dialog?.type === "import"}
        speedTier={selectedTier}
        onClose={() => setDialog(null)}
        onImport={handleImport}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        open={dialog?.type === "delete"}
        onClose={() => setDialog(null)}
        onConfirm={handleDelete}
        title={t("availableUsernames.form.deleteTitle")}
        message={t("availableUsernames.form.deleteMessage", {
          username: deleteRow?.username ?? "",
        })}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        isLoading={isSubmitting}
      />
    </div>
  );
}
