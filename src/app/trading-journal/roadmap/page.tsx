import type { Metadata } from "next";
import Link from "next/link";
import journal from "@/data/trading-journal.json";
import Contact from "@/components/home/Contact";
import PageHeader from "@/components/home/PageHeader";
import { Reveal } from "@/components/home/Section";
import { cn } from "@/lib/utils";
import { money, pnlColor, signedMoney } from "@/components/trading-journal/format";
import {
  finalGoal,
  goalSteps,
  lossAmount,
  lotFor,
  ordersFor,
  phaseFor,
  plannedPath,
  winProfit,
} from "@/components/trading-journal/roadmap";

const { roadmap, summary, trades } = journal;

// Whole-dollar amounts read cleaner in headings and labels
const usd = (value: number) => money.format(value).replace(/\.00$/, "");

export const metadata: Metadata = {
  title: "Trading Roadmap",
  description: `Raka Rasell's plan to grow a small forex account to ${usd(
    finalGoal(roadmap)
  )} profit per trade.`,
};

const plan = plannedPath(roadmap);
const goals = goalSteps(roadmap, plan);
const actual = trades
  .filter((trade) => trade.no > roadmap.startedAfterTrade)
  .sort((a, b) => a.no - b.no);

// Equity needed for the trade that hits the final goal
const finalStep = plan[plan.length - 1];
const goalEquity = finalStep.balanceBefore;

const equity = summary.balance;
const currentPhase = phaseFor(roadmap, equity);
const nextLot = lotFor(currentPhase, equity);
const nextOrders = ordersFor(currentPhase, nextLot);
const remaining = plannedPath(roadmap, equity);
const goalReached = equity >= goalEquity;

const monthsLabel = (count: number) => {
  const months = count / roadmap.maxTradesPerMonth;
  return months < 1 ? "< 1 month" : `~${months.toFixed(1)} months`;
};

const phaseBounds = roadmap.phases.map((phase, index) => ({
  phase,
  from: index === 0 ? roadmap.startBalance : roadmap.phases[index - 1].until ?? 0,
  to: phase.until ?? goalEquity,
}));

const lotText = (lot: number, orders = 1) =>
  `${lot.toFixed(2)}${orders > 1 ? ` (${orders} orders)` : ""}`;

export default function TradingRoadmapPage() {
  const nextWin = winProfit(roadmap, currentPhase, nextLot);
  const nextLoss = lossAmount(roadmap, currentPhase, nextLot);

  return (
    <main className="flex min-h-screen w-full flex-col">
      <PageHeader
        eyebrow={`Trading Journal · Roadmap · updated ${summary.updated}`}
        title={
          <>
            Road to{" "}
            <span className="font-serif font-normal italic text-primary">
              {usd(finalGoal(roadmap))} a trade.
            </span>
          </>
        }
        description={`The plan for growing this account from ${usd(
          roadmap.startBalance
        )}, phase by phase, and how the real trades compare to it.`}
      >
        <Link
          href="/trading-journal"
          className="mt-8 inline-flex rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          ← Back to journal
        </Link>
      </PageHeader>

      {/* Progress + next trade */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="flex h-full flex-col rounded-[2rem] border bg-card p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Progress
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-4xl font-semibold tracking-tight">
                  {money.format(equity)}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  of ~{usd(Math.round(goalEquity / 100) * 100)} ·{" "}
                  {actual.length} roadmap trade{actual.length === 1 ? "" : "s"} done
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2">
                {phaseBounds.map(({ phase, from, to }, index) => {
                  const fill = Math.min(1, Math.max(0, (equity - from) / (to - from)));
                  const isCurrent = phase.key === currentPhase.key && !goalReached;
                  return (
                    <div key={phase.key}>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${fill * 100}%` }}
                        />
                      </div>
                      <p
                        className={cn(
                          "mt-2 font-mono text-[10px] uppercase tracking-widest",
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {index + 1}. {phase.name}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        to {phase.until == null ? "~" : ""}
                        {usd(phase.until ?? Math.round(to / 100) * 100)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-auto pt-8 text-sm leading-relaxed text-muted-foreground">
                {goalReached
                  ? "Final goal reached."
                  : `Best case from here: ${remaining.length} more winning trades, ${monthsLabel(
                      remaining.length
                    )} at up to ${roadmap.maxTradesPerMonth} trades a month.`}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-2">
            <div className="flex h-full flex-col rounded-[2rem] border border-primary/50 bg-card p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Next trade
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight">
                {nextLot.toFixed(2)} lot
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {currentPhase.name} · {currentPhase.account}
                {nextOrders > 1 && ` · ${nextOrders} orders`}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Win · {roadmap.targetPips} pips
                  </dt>
                  <dd className={cn("mt-1 text-base", pnlColor(nextWin))}>
                    {signedMoney(nextWin)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    SL · {roadmap.slPips} pips
                  </dt>
                  <dd className={cn("mt-1 text-base", pnlColor(-nextLoss))}>
                    {signedMoney(-nextLoss)}
                  </dd>
                </div>
              </dl>
              <p className="mt-auto pt-6 text-sm leading-relaxed text-muted-foreground">
                A loss at the stop costs {((nextLoss / equity) * 100).toFixed(0)}% of
                equity.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Phases */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Phases
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {phaseBounds.map(({ phase, from }, index) => {
            const steps = plan.filter((step) => step.phase.key === phase.key);
            const first = steps[0];
            const last = steps[steps.length - 1];
            const isCurrent = phase.key === currentPhase.key && !goalReached;
            return (
              <Reveal key={phase.key} delay={index * 0.05}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border bg-card p-5",
                    isCurrent && "border-primary/50"
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-xs uppercase",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Phase {index + 1}
                    {isCurrent && " · current"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    {phase.name}
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    {usd(from)} → {phase.until == null ? "onward" : usd(phase.until)} ·{" "}
                    {phase.account}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed">{phase.note}</p>
                  {first && last && (
                    <p className="mt-auto pt-4 font-mono text-xs text-muted-foreground">
                      Steps {first.step}–{last.step} · {steps.length} trades ·{" "}
                      {first.lot.toFixed(2)}
                      {first.lot !== last.lot && ` → ${last.lot.toFixed(2)}`} lot
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {goals.map(({ goal, step }, index) => {
            const reached =
              step != null && equity >= step.balanceBefore;
            return (
              <Reveal key={goal.profitPerTrade} delay={index * 0.05}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-dashed bg-card p-5",
                    reached && "border-solid border-primary/50"
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-xs uppercase",
                      reached ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Goal {index + 1}
                    {reached && " · reached"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    {usd(goal.profitPerTrade)} per trade
                  </h2>
                  {step && (
                    <>
                      <p className="mt-3 text-sm leading-relaxed">
                        Needs about {usd(Math.round(step.balanceBefore / 100) * 100)} in
                        equity, trading {lotText(step.lot, step.orders)} lot at{" "}
                        {roadmap.targetPips} pips.
                      </p>
                      <p className="mt-auto pt-4 font-mono text-xs text-muted-foreground">
                        Step {step.step} · {monthsLabel(step.step)} from the start, best
                        case
                      </p>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Plan vs actual */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Reveal>
          <div className="rounded-[2rem] border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Plan vs actual
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {plan.length} steps · {monthsLabel(plan.length)} best case
              </p>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[680px] font-mono text-xs">
                <thead>
                  <tr className="border-b text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="py-2 pr-4 font-normal">Step</th>
                    <th className="py-2 pr-4 font-normal">Phase</th>
                    <th className="py-2 pr-4 text-right font-normal">Lot</th>
                    <th className="py-2 pr-4 text-right font-normal">Plan P&amp;L</th>
                    <th className="py-2 pr-4 text-right font-normal">Plan balance</th>
                    <th className="py-2 pr-4 text-right font-normal">Actual</th>
                    <th className="py-2 text-right font-normal">Actual balance</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.map((step, index) => {
                    const trade = actual[index];
                    const isNext = index === actual.length;
                    const isUpgrade =
                      index > 0 && plan[index - 1].phase.account !== step.phase.account;
                    const goalIndex = goals.findIndex((g) => g.step === step);
                    return (
                      <tr
                        key={step.step}
                        className={cn(
                          "border-b last:border-0",
                          isNext && "bg-primary/5",
                          isUpgrade && "border-t-2 border-t-primary/40"
                        )}
                      >
                        <td className="py-2 pr-4">
                          {step.step}
                          {trade && (
                            <span className="text-muted-foreground"> · #{trade.no}</span>
                          )}
                          {isNext && <span className="text-primary"> · next</span>}
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground">
                          {step.phase.name}
                          {isUpgrade && <span className="text-primary"> · upgrade</span>}
                          {goalIndex >= 0 && (
                            <span className="text-primary"> · goal {goalIndex + 1}</span>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-right">
                          {lotText(step.lot, step.orders)}
                        </td>
                        <td className="py-2 pr-4 text-right text-emerald-600 dark:text-emerald-400">
                          {signedMoney(step.profit)}
                        </td>
                        <td className="py-2 pr-4 text-right">
                          {money.format(step.balanceAfter)}
                        </td>
                        <td
                          className={cn("py-2 pr-4 text-right", trade && pnlColor(trade.pnl))}
                        >
                          {trade ? signedMoney(trade.pnl) : "—"}
                        </td>
                        <td className="py-2 text-right">
                          {trade ? money.format(trade.balanceAfter) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Assumptions */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="rounded-2xl border border-dashed p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Assumptions
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed md:grid-cols-2">
              <li>
                Best case: every trade wins at {roadmap.targetPips} pips. Real trades
                will lose sometimes, and each loss pushes the plan back about two
                trades.
              </li>
              <li>
                1 pip ≈ {money.format(roadmap.pipValuePerLot)} per lot on USDJPY (near
                159). It shifts slightly as the price moves.
              </li>
              <li>
                Premium commission is $10 per lot, taken as round-turn. If it&apos;s
                charged per side, the plan needs a few more trades.
              </li>
              <li>
                At most {roadmap.maxTradesPerMonth} trades a month.
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
