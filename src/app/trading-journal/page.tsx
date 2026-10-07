import type { Metadata } from "next";
import journal from "../../../public/trading-journal.json";
import Contact from "@/components/home/Contact";
import PageHeader from "@/components/home/PageHeader";
import { Reveal } from "@/components/home/Section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trading Journal",
  description:
    "Raka Rasell's public forex trading journal — every trade, the reason behind it, and the lesson learned.",
};

const { account, framework, summary, trades } = journal;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: account.currency,
  signDisplay: "auto",
});

function signedMoney(value: number) {
  return `${value > 0 ? "+" : ""}${money.format(value)}`;
}

function pnlColor(value: number) {
  if (value > 0) return "text-emerald-600 dark:text-emerald-400";
  if (value < 0) return "text-red-600 dark:text-red-400";
  return "text-muted-foreground";
}

// JPY pairs quote to 3 decimals, others to 5
function formatPrice(pair: string, value: number) {
  return value.toFixed(pair.endsWith("JPY") ? 3 : 5);
}

function formatTime(value: string) {
  return value.replace("T", " ").replace(/\+07:00$/, " WIB");
}

const stats = [
  {
    label: "Balance",
    value: money.format(summary.balance),
    note: `Start ${money.format(account.startBalance)}`,
  },
  {
    label: "Total P&L",
    value: signedMoney(summary.totalPnl),
    className: pnlColor(summary.totalPnl),
  },
  { label: "Trades", value: String(summary.trades) },
  {
    label: "Win rate",
    value: `${summary.winRatePct}%`,
    note: `${summary.wins}W · ${summary.losses}L`,
  },
  { label: "Max drawdown", value: `${summary.maxDrawdownPct}%` },
];

const definitionLabels: Record<string, string> = {
  momentumKuat: "Strong momentum",
  konfirmasi: "Confirmation",
};

const versionStats = summary.byVersion as Record<
  string,
  (typeof summary.byVersion)[keyof typeof summary.byVersion]
>;

export default function TradingJournalPage() {
  const sortedTrades = [...trades].sort((a, b) => b.no - a.no);

  return (
    <main className="flex min-h-screen w-full flex-col">
      <PageHeader
        eyebrow={`Trading Journal · updated ${summary.updated}`}
        title={
          <>
            Trading in{" "}
            <span className="font-serif font-normal italic text-primary">
              public.
            </span>
          </>
        }
        description={`A live forex account that started at ${money.format(
          account.startBalance
        )}. Every trade is logged here — wins, losses, the reason I entered, and what I learned.`}
      />

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.05}
              className={cn(index === 0 && "col-span-2 md:col-span-1")}
            >
              <div className="flex h-full flex-col rounded-[2rem] border bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
                <p
                  className={cn(
                    "mt-4 text-3xl font-semibold tracking-tight",
                    stat.className
                  )}
                >
                  {stat.value}
                </p>
                {stat.note && (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {stat.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Reveal>
          <div className="rounded-[2rem] border bg-card p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Framework
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {Object.entries(framework.versions).map(([version, description]) => {
                const stat = versionStats[version];
                const isCurrent = version === framework.current;
                return (
                  <div
                    key={version}
                    className={cn(
                      "rounded-2xl border p-5",
                      isCurrent && "border-primary/50"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p
                        className={cn(
                          "font-mono text-sm uppercase",
                          isCurrent && "text-primary"
                        )}
                      >
                        {version}
                        {isCurrent && " · current"}
                      </p>
                      {stat && (
                        <p className="font-mono text-xs text-muted-foreground">
                          {stat.trades} trades · {stat.wins}W · {stat.losses}L ·{" "}
                          <span className={pnlColor(stat.totalPnl)}>
                            {signedMoney(stat.totalPnl)}
                          </span>
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{description}</p>
                  </div>
                );
              })}
            </div>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              {Object.entries(framework.definitions).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {definitionLabels[key] ?? key}
                  </dt>
                  <dd className="mt-1 leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="flex flex-col gap-4">
          {sortedTrades.map((trade) => (
            <Reveal key={trade.no}>
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
                    {trade.frameworkVersion}
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

                <dl className="relative mt-5 grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4 lg:grid-cols-8">
                  {[
                    ["Lot", String(trade.lot)],
                    ["Entry", formatPrice(trade.pair, trade.entry)],
                    ["Stop loss", formatPrice(trade.pair, trade.sl)],
                    ["Take profit", formatPrice(trade.pair, trade.tp)],
                    ["Risk", `${trade.riskPct}%`],
                    ["R:R", `1:${trade.rr}`],
                    ["Opened", formatTime(trade.opened)],
                    ["Closed", formatTime(trade.closed)],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>

                <dl className="relative mt-5 grid gap-x-6 gap-y-3 border-t pt-5 text-sm md:grid-cols-2">
                  {[
                    ["H4 direction", trade.h4Direction],
                    ["H4 structure", trade.h4Structure],
                    ["H1 zone", trade.h1Zone],
                    ["H1 momentum", trade.h1Momentum],
                    ["Confirmation", trade.confirmation],
                    ["News context", trade.newsContext],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-0.5 leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="relative mt-5 grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Reason
                    </p>
                    <p className="mt-1 leading-relaxed">{trade.reason}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-primary">
                      Lesson
                    </p>
                    <p className="mt-1 leading-relaxed">{trade.lesson}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
