import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "@/components/ui/cards";
import { Heading, Text } from "@/components/ui/typography";

export function HomePage() {
  const { t } = useTranslation();

  const cards = [
    { titleKey: "home.cards.subscribers.title", descriptionKey: "home.cards.subscribers.description" },
    { titleKey: "home.cards.onlineUsers.title", descriptionKey: "home.cards.onlineUsers.description" },
    { titleKey: "home.cards.statistics.title", descriptionKey: "home.cards.statistics.description" },
    { titleKey: "home.cards.finance.title", descriptionKey: "home.cards.finance.description" },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <Heading as="h1">{t("home.title")}</Heading>
        <Text muted className="mt-2">
          {t("home.subtitle")}
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ titleKey, descriptionKey }) => (
          <Card key={titleKey}>
            <CardHeader title={t(titleKey)} description={t(descriptionKey)} />
          </Card>
        ))}
      </div>
    </div>
  );
}
