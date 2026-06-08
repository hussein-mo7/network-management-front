import { ImagePlus, Router } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/forms";
import { Heading, Text } from "@/components/ui/typography";

interface SubscriberRouterSectionProps {
  routerName: string;
  imagePreview: string | null;
  canManage?: boolean;
  onRouterNameChange: (value: string) => void;
  onImageFileSelect: (file: File) => void;
}

export function SubscriberRouterSection({
  routerName,
  imagePreview,
  canManage = false,
  onRouterNameChange,
  onImageFileSelect,
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
    <div className="space-y-4 rounded-lg border border-border/60 bg-muted/10 p-4 sm:p-5">
      <div>
        <Heading as="h3" className="text-sm font-semibold">
          {t("subscribers.profile.router.sectionTitle")}
        </Heading>
        <Text muted className="mt-1 text-xs">
          {t("subscribers.profile.router.sectionHint")}
        </Text>
      </div>

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

        <div className="min-w-0 flex-1">
          <Input
            label={t("subscribers.profile.router.nameLabel")}
            value={routerName}
            onChange={(event) => onRouterNameChange(event.target.value)}
            placeholder={t("subscribers.profile.router.namePlaceholder")}
            disabled={!canManage}
          />
        </div>
      </div>
    </div>
  );
}
