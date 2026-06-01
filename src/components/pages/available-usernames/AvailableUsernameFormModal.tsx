import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, ModalFooterButton } from "@/components/ui/modals";
import { Input, PasswordInput } from "@/components/ui/forms";
import type { AvailableUsername, SpeedTier } from "@/lib/mocks";
import { cn } from "@/lib/cn";

export interface AvailableUsernameFormValues {
  username: string;
  password: string;
  isOwnerUsername: boolean;
}

interface AvailableUsernameFormModalProps {
  open: boolean;
  mode: "add" | "edit";
  speedTier: SpeedTier;
  initialRow?: AvailableUsername;
  onClose: () => void;
  onSubmit: (values: AvailableUsernameFormValues) => void;
  isSubmitting?: boolean;
}

export function AvailableUsernameFormModal({
  open,
  mode,
  speedTier,
  initialRow,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AvailableUsernameFormModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvailableUsernameFormValues>({
    defaultValues: {
      username: initialRow?.username ?? "",
      password: initialRow?.password ?? "",
      isOwnerUsername: initialRow?.isOwnerUsername ?? false,
    },
  });

  const title =
    mode === "add"
      ? t("availableUsernames.form.addTitle", { speed: speedTier.label })
      : t("availableUsernames.form.editTitle", { username: initialRow?.username ?? "" });

  useEffect(() => {
    if (open) {
      reset({
        username: initialRow?.username ?? "",
        password: "",
        isOwnerUsername: initialRow?.isOwnerUsername ?? false,
      });
    }
  }, [open, initialRow, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      closeLabel={t("common.cancel")}
      footer={
        <>
          <ModalFooterButton variant="outline" onClick={handleClose} disabled={isSubmitting}>
            {t("common.cancel")}
          </ModalFooterButton>
          <ModalFooterButton type="submit" form="available-username-form" isLoading={isSubmitting}>
            {mode === "add" ? t("availableUsernames.form.create") : t("common.save")}
          </ModalFooterButton>
        </>
      }
    >
      <form id="available-username-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={t("availableUsernames.form.speed")}
          value={speedTier.label}
          readOnly
          disabled
          className="bg-muted/50"
        />

        <Input
          label={t("availableUsernames.table.username")}
          placeholder={t("availableUsernames.form.usernamePlaceholder")}
          autoComplete="off"
          readOnly={mode === "edit"}
          disabled={mode === "edit"}
          className={mode === "edit" ? "bg-muted/50" : undefined}
          error={errors.username?.message}
          {...register("username", {
            required: mode === "add" ? t("availableUsernames.form.usernameRequired") : false,
          })}
        />

        {mode === "edit" ? (
          <p className="text-xs text-muted-foreground">
            {t("availableUsernames.form.usernameEditHint")}
          </p>
        ) : null}

        <PasswordInput
          label={t("availableUsernames.table.password")}
          placeholder={t("availableUsernames.form.passwordPlaceholder")}
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password", {
            required: mode === "add" ? t("availableUsernames.form.passwordRequired") : false,
            minLength: mode === "add"
              ? { value: 4, message: t("availableUsernames.form.passwordMin") }
              : undefined,
          })}
        />

        {mode === "edit" ? (
          <p className="text-xs text-muted-foreground">{t("availableUsernames.form.passwordEditHint")}</p>
        ) : null}

        {mode === "add" ? (
          <>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/20 px-3 py-3">
              <input
                type="checkbox"
                className={cn(
                  "h-4 w-4 rounded border-border text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                )}
                {...register("isOwnerUsername")}
              />
              <span className="text-sm text-foreground">{t("availableUsernames.form.ownerUsername")}</span>
            </label>
            <p className="text-xs text-muted-foreground">{t("availableUsernames.form.ownerHint")}</p>
          </>
        ) : initialRow?.isOwnerUsername ? (
          <div className="rounded-lg border border-border bg-muted/20 px-3 py-3">
            <span className="text-sm font-medium text-primary">
              {t("availableUsernames.status.owner")}
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("availableUsernames.form.ownerEditHint")}
            </p>
          </div>
        ) : null}
      </form>
    </Modal>
  );
}
