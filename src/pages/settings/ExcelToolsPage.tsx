import { FileSpreadsheet, Upload, Download, Table2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export function ExcelToolsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/settings"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span>
          {t("settings.excel.backToSettings")}
        </Link>
        <Heading as="h1">{t("settings.excel.title")}</Heading>
        <Text muted className="mt-2 max-w-2xl">
          {t("settings.excel.subtitle")}
        </Text>
      </div>

      <div className="rounded-xl border border-dashed border-warning/40 bg-warning/5 px-4 py-3">
        <Text className="text-sm text-foreground">{t("settings.excel.uiOnlyHint")}</Text>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ExcelToolCard
          icon={Upload}
          title={t("settings.excel.importTitle")}
          description={t("settings.excel.importDescription")}
          actionLabel={t("settings.excel.chooseFile")}
          disabled
        />
        <ExcelToolCard
          icon={Download}
          title={t("settings.excel.exportTitle")}
          description={t("settings.excel.exportDescription")}
          actionLabel={t("settings.excel.downloadTemplate")}
          disabled
        />
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Table2 className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <Text className="font-semibold">{t("settings.excel.previewTitle")}</Text>
            <Text muted className="mt-1 text-sm">
              {t("settings.excel.previewDescription")}
            </Text>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-4 gap-px bg-border text-xs font-medium text-muted-foreground">
                {["A", "B", "C", "D"].map((col) => (
                  <div key={col} className="bg-muted/40 px-3 py-2">
                    {col}
                  </div>
                ))}
              </div>
              {Array.from({ length: 4 }).map((_, row) => (
                <div key={row} className="grid grid-cols-4 gap-px bg-border">
                  {Array.from({ length: 4 }).map((__, col) => (
                    <div
                      key={col}
                      className={cn(
                        "bg-background px-3 py-2.5 text-xs text-muted-foreground/60",
                        row === 0 && col === 0 && "text-foreground",
                      )}
                    >
                      {row === 0 && col === 0 ? t("settings.excel.sampleCell") : "—"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ExcelToolCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  disabled,
}: {
  icon: typeof Upload;
  title: string;
  description: string;
  actionLabel: string;
  disabled?: boolean;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <Text className="mt-4 font-semibold">{title}</Text>
      <Text muted className="mt-1 text-sm">
        {description}
      </Text>
      <Button className="mt-4" size="sm" variant="outline" disabled={disabled}>
        <FileSpreadsheet className="h-4 w-4" />
        {actionLabel}
      </Button>
    </Card>
  );
}
