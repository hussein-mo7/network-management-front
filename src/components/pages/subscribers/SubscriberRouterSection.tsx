import { ImagePlus, Router } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/forms";
import { ProfileSection } from "@/components/ui/profile";
import { Text } from "@/components/ui/typography";

interface SubscriberRouterSectionProps {
  routerName: string;
  imagePreview: string | null;
  canManage?: boolean;
  isSubmitting?: boolean;
  hasChanges?: boolean;
  onRouterNameChange: (value: string) => void;
  onImageFileSelect: (file: File) => void;
  onSave?: () => void;
}

export function SubscriberRouterSection({
  routerName,
  imagePreview,
  canManage = false,
  isSubmitting = false,
  hasChanges = false,
  onRouterNameChange,
  onImageFileSelect,
  onSave,
}: SubscriberRouterSectionProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onImageFileSelect(file);
    event.target.value = "";
  };

  return (
    <ProfileSection
      title={t("subscribers.profile.router.sectionTitle")}
      description={t("subscribers.profile.router.sectionHint")}
      action={
        canManage && onSave ? (
          <Button size="sm" onClick={onSave} isLoading={isSubmitting} disabled={!hasChanges}>
            {t("common.save")}
          </Button>
        ) : null
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/30">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={routerName || t("subscribers.profile.router.imageAlt")}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-3 text-center text-muted-foreground">
                <Router className="h-8 w-8 opacity-50" strokeWidth={1.5} />
                <Text muted className="text-xs">{t("subscribers.profile.router.noImage")}</Text>
              </div>
            )}
          </div>
          {canManage ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-4 w-4" />
                {t("subscribers.profile.router.uploadImage")}
              </Button>
            </>
          ) : null}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <Input
            label={t("subscribers.profile.router.nameLabel")}
            value={routerName}
            onChange={(event) => onRouterNameChange(event.target.value)}
            placeholder={t("subscribers.profile.router.namePlaceholder")}
            disabled={!canManage}
          />
        </div>
      </div>
    </ProfileSection>
  );
}
