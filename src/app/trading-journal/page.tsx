import type { Metadata } from "next";
import Link from "next/link";
import journal from "@/data/trading-journal.json";
import Contact from "@/components/home/Contact";
import PageHeader from "@/components/home/PageHeader";
import { Reveal } from "@/components/home/Section";
import { cn } from "@/lib/utils";
import BalanceChart from "@/components/trading-journal/BalanceChart";
import TradeCalendar from "@/components/trading-journal/TradeCalendar";
import {
  money,
  pnlColor,
  signedMoney,
} from "@/components/trading-journal/format";

export const metadata: Metadata = {
  title: "Trading Journal",
  description:
    "Raka Rasell's public forex trading journal — every trade, its setup, and the result.",
};

const { account, summary, trades, nonTriggered } = journal;

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

export default function TradingJournalPage() {
  const sortedNonTriggered = [...nonTriggered].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

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
        )}. Every trade is logged here — wins, losses, and the setup behind each one.`}
      >
        <Link
          href="/trading-journal/roadmap"
          className="mt-8 inline-flex rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          See the roadmap →
        </Link>
      </PageHeader>

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
          <BalanceChart
            startBalance={account.startBalance}
            trades={trades}
            currency={account.currency}
          />
        </Reveal>
      </section>

      <TradeCalendar trades={trades} />

      {sortedNonTriggered.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Setups that didn&apos;t trigger
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Planned entries where price never reached the zone. No money at
              risk — logged to check whether the read was right.
            </p>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4">
            {sortedNonTriggered.map((setup) => (
              <Reveal key={setup.id}>
                <article className="relative overflow-hidden rounded-2xl border border-dashed bg-card p-5 md:p-6">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-4 select-none font-serif text-4xl italic leading-none text-muted md:right-6"
                  >
                    {setup.id}
                  </span>

                  <div className="relative flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {setup.pair}
                    </h2>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase",
                        setup.direction === "buy"
                          ? "border-emerald-600/40 text-emerald-600 dark:text-emerald-400"
                          : "border-red-600/40 text-red-600 dark:text-red-400"
                      )}
                    >
                      {setup.direction}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] uppercase text-muted-foreground">
                      Not triggered
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase",
                        setup.directionCorrect
                          ? "border-emerald-600/40 text-emerald-600 dark:text-emerald-400"
                          : "border-red-600/40 text-red-600 dark:text-red-400"
                      )}
                    >
                      {setup.directionCorrect
                        ? "Direction correct"
                        : "Direction wrong"}
                    </span>
                  </div>

                  <dl className="relative mt-5 grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-2">
                    {[
                      ["Zone", setup.zone],
                      ["Date", setup.date],
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
                      ["Why it didn't trigger", setup.reasonNotTriggered],
                      ["Afterwards", setup.afterwards],
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
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Contact />
    </main>
  );
}
