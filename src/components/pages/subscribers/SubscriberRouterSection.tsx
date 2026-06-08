import { ImagePlus, Router } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/forms";
import { ProfileSection } from "@/components/ui/profile";
import { Text } from "@/components/ui/typography";
import type { Subscriber } from "@/types/subscriber";

interface SubscriberRouterSectionProps {
  subscriber: Subscriber;
  canManage?: boolean;
}

/** UI-only — router name & image until the API is connected. */
export function SubscriberRouterSection({
  subscriber,
  canManage = false,
}: SubscriberRouterSectionProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [routerName, setRouterName] = useState(subscriber.routerName ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(subscriber.routerImageUrl ?? null);

  useEffect(() => {
    setRouterName(subscriber.routerName ?? "");
    setImagePreview(subscriber.routerImageUrl ?? null);
  }, [subscriber.id, subscriber.routerName, subscriber.routerImageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <ProfileSection
      title={t("subscribers.profile.router.sectionTitle")}
      description={t("subscribers.profile.router.sectionHint")}
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
            onChange={(event) => setRouterName(event.target.value)}
            placeholder={t("subscribers.profile.router.namePlaceholder")}
            disabled={!canManage}
          />
          <Text muted className="text-xs">{t("subscribers.profile.router.uiOnlyHint")}</Text>
        </div>
      </div>
    </ProfileSection>
  );
}
