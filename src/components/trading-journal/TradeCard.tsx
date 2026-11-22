import { cn } from "@/lib/utils";
import {
  formatPrice,
  money,
  pnlColor,
  signedMoney,
  type Trade,
} from "./format";

export default function TradeCard({ trade }: { trade: Trade }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border bg-card p-5 md:p-6">
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-4 select-none font-serif text-5xl italic leading-none text-muted md:right-6"
      >
        {String(trade.no).padStart(2, "0")}
      </span>

      <div className="relative flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          {trade.pair}
        </h2>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase",
            trade.direction === "buy"
              ? "border-emerald-600/40 text-emerald-600 dark:text-emerald-400"
              : "border-red-600/40 text-red-600 dark:text-red-400"
          )}
        >
          {trade.direction}
        </span>
        <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] uppercase text-muted-foreground">
          {trade.result}
        </span>
      </div>

      <div className="relative mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <p className={cn("text-lg font-semibold", pnlColor(trade.pnl))}>
          {signedMoney(trade.pnl)}
        </p>
        <p className={cn("font-mono text-sm", pnlColor(trade.pips))}>
          {trade.pips > 0 ? "+" : ""}
          {trade.pips} pips
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          Balance {money.format(trade.balanceAfter)}
        </p>
      </div>

      <dl className="relative mt-5 grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4 lg:grid-cols-7">
        {[
          ["Lot", String(trade.lot)],
          ["Entry", formatPrice(trade.pair, trade.entry)],
          ["Stop loss", formatPrice(trade.pair, trade.sl)],
          ["Take profit", formatPrice(trade.pair, trade.tp)],
          ["Risk", trade.riskPct == null ? "—" : `${trade.riskPct}%`],
          ["R:R", trade.rr == null ? "—" : `1:${trade.rr}`],
          ["Date", trade.date],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>

      <dl className="relative mt-5 grid gap-x-6 gap-y-3 border-t pt-5 text-sm">
        {[
          ["News context", trade.newsContext],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-0.5 leading-relaxed">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>

    </article>
  );
}
