export function formatMoney(amount: number, locale?: string): string {
  const value = Number(amount) || 0;
  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ₪`;
}
