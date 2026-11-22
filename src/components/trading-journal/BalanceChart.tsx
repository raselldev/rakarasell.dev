import { cn } from "@/lib/utils";

type Point = {
  no: number;
  balance: number;
  pnl: number;
  pair?: string;
};

type BalanceChartProps = {
  startBalance: number;
  trades: {
    no: number;
    balanceAfter: number;
    pnl: number;
    pair: string;
  }[];
  currency: string;
};

// Plot area in viewBox units. The SVG stretches (preserveAspectRatio="none"),
// so labels and dots are HTML positioned by percentage to stay undistorted.
const W = 1000;
const H = 300;

function niceStep(range: number, ticks: number) {
  const raw = range / ticks;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * mag;
}

export default function BalanceChart({
  startBalance,
  trades,
  currency,
}: BalanceChartProps) {
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency });
  const axisMoney = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const points: Point[] = [
    { no: 0, balance: startBalance, pnl: 0 },
    ...[...trades]
      .sort((a, b) => a.no - b.no)
      .map((t) => ({
        no: t.no,
        balance: t.balanceAfter,
        pnl: t.pnl,
        pair: t.pair,
      })),
  ];

  const values = points.map((p) => p.balance);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const step = niceStep(Math.max(rawMax - rawMin, 1), 4);
  const yMin = Math.floor(rawMin / step) * step;
  const yMax = Math.ceil(rawMax / step) * step;
  const yTicks: number[] = [];
  for (let v = yMin; v <= yMax + step / 2; v += step) yTicks.push(v);

  const lastNo = points[points.length - 1].no || 1;
  const xPct = (no: number) => (no / lastNo) * 100;
  const yPct = (v: number) => ((yMax - v) / (yMax - yMin)) * 100;

  const line = points
    .map((p) => `${(xPct(p.no) / 100) * W},${(yPct(p.balance) / 100) * H}`)
    .join(" L ");
  const area = `M 0,${H} L ${line} L ${W},${H} Z`;
  const startY = yPct(startBalance);

  const last = points[points.length - 1];
  const up = last.balance >= startBalance;

  return (
    <div className="rounded-[2rem] border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Balance over trades
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="mr-1.5 inline-block w-4 border-t border-dashed border-muted-foreground align-middle" />
          Start {money.format(startBalance)}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        {/* Y axis labels */}
        <div className="relative h-56 w-12 shrink-0 md:h-72">
          {yTicks.map((v) => (
            <span
              key={v}
              className="absolute right-0 -translate-y-1/2 font-mono text-[10px] text-muted-foreground"
              style={{ top: `${yPct(v)}%` }}
            >
              {axisMoney.format(v)}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative h-56 md:h-72">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-label={`Account balance from ${money.format(
                startBalance
              )} to ${money.format(last.balance)} over ${trades.length} trades`}
            >
              <defs>
                <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>

              {yTicks.map((v) => (
                <line
                  key={v}
                  x1={0}
                  x2={W}
                  y1={(yPct(v) / 100) * H}
                  y2={(yPct(v) / 100) * H}
                  stroke="hsl(var(--border))"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              <line
                x1={0}
                x2={W}
                y1={(startY / 100) * H}
                y2={(startY / 100) * H}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />

              <path d={area} fill="url(#balance-fill)" />
              <path
                d={`M ${line}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {points.map((p, i) => {
              const isLast = i === points.length - 1;
              return (
                <div
                  key={p.no}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${xPct(p.no)}%`, top: `${yPct(p.balance)}%` }}
                >
                  <span
                    tabIndex={0}
                    className={cn(
                      "block size-2.5 rounded-full border-2 border-card outline-none ring-primary/40 transition-transform group-hover:scale-150 group-focus-within:scale-150",
                      p.no === 0
                        ? "bg-muted-foreground"
                        : p.pnl > 0
                          ? "bg-emerald-500"
                          : p.pnl < 0
                            ? "bg-red-500"
                            : "bg-muted-foreground",
                      isLast && "size-3.5 ring-4"
                    )}
                  />
                  <div
                    className={cn(
                      "pointer-events-none absolute bottom-full z-10 mb-2 hidden w-max rounded-xl border bg-popover px-3 py-2 font-mono text-[11px] text-popover-foreground shadow-md group-hover:block group-focus-within:block",
                      xPct(p.no) < 15
                        ? "left-0"
                        : xPct(p.no) > 85
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                    )}
                  >
                    <p className="text-muted-foreground">
                      {p.no === 0 ? "Start" : `#${p.no} · ${p.pair}`}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold">
                      {money.format(p.balance)}
                    </p>
                    {p.no !== 0 && (
                      <p
                        className={
                          p.pnl > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : p.pnl < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-muted-foreground"
                        }
                      >
                        {p.pnl > 0 ? "+" : ""}
                        {money.format(p.pnl)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* X axis labels */}
          <div className="relative mt-3 h-4">
            {points.map((p) => (
              <span
                key={p.no}
                className={cn(
                  "absolute -translate-x-1/2 font-mono text-[10px] text-muted-foreground",
                  p.no === 0 && "translate-x-0",
                  p.no === lastNo && "-translate-x-full"
                )}
                style={{ left: `${xPct(p.no)}%` }}
              >
                {p.no === 0 ? "Start" : `#${p.no}`}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        {up ? "Above" : "Below"} starting balance after the latest trade.
      </p>
    </div>
  );
}
