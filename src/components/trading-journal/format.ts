import journal from "@/data/trading-journal.json";

export type Trade = (typeof journal.trades)[number];

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: journal.account.currency,
  signDisplay: "auto",
});

export function signedMoney(value: number) {
  return `${value > 0 ? "+" : ""}${money.format(value)}`;
}

export function pnlColor(value: number) {
  if (value > 0) return "text-emerald-600 dark:text-emerald-400";
  if (value < 0) return "text-red-600 dark:text-red-400";
  return "text-muted-foreground";
}

// JPY pairs quote to 3 decimals, others to 5
// "none" = strategy deliberately trades without this level (e.g. no SL/TP)
export function formatPrice(pair: string, value: number | string | null) {
  if (value == null) return "—";
  if (typeof value === "string") return value === "none" ? "None" : value;
  return value.toFixed(pair.endsWith("JPY") ? 3 : 5);
}
