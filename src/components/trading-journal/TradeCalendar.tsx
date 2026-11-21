"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/home/Section";
import { cn } from "@/lib/utils";
import TradeCard from "./TradeCard";
import { pnlColor, signedMoney, type Trade } from "./format";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Timestamps are stored in WIB (+07:00), so the date prefix is already the local day
const dayKey = (trade: Trade) => trade.opened.slice(0, 10); // "2026-11-20"
const monthKey = (trade: Trade) => trade.opened.slice(0, 7); // "2026-11"

function parseMonth(key: string) {
  const [year, month] = key.split("-").map(Number);
  return { year, month };
}

function monthLabel(key: string, style: "long" | "short" = "long") {
  const { year, month } = parseMonth(key);
  return new Intl.DateTimeFormat("en-US", {
    month: style,
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

function dayLabel(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function sumPnl(trades: Trade[]) {
  return Math.round(trades.reduce((total, t) => total + t.pnl, 0) * 100) / 100;
}

// Compact P&L for small calendar cells: "+16.9", "-5.1"
function compactPnl(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(Math.abs(value) >= 100 ? 0 : 1)}`;
}

export default function TradeCalendar({ trades }: { trades: Trade[] }) {
  const byDay = useMemo(() => {
    const map = new Map<string, Trade[]>();
    for (const trade of trades) {
      const key = dayKey(trade);
      map.set(key, [...(map.get(key) ?? []), trade]);
    }
    return map;
  }, [trades]);

  const months = useMemo(
    () => Array.from(new Set(trades.map(monthKey))).sort(),
    [trades]
  );

  const [month, setMonth] = useState(months[months.length - 1]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  if (!month) return null;

  const monthIndex = months.indexOf(month);
  const monthTrades = trades.filter((t) => monthKey(t) === month);
  const visibleTrades = (
    selectedDay ? byDay.get(selectedDay) ?? [] : monthTrades
  ).slice().sort((a, b) => b.no - a.no);

  const { year, month: monthNum } = parseMonth(month);
  const firstWeekday = (new Date(Date.UTC(year, monthNum - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, monthNum, 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`
    ),
  ];

  const goToMonth = (index: number) => {
    setMonth(months[index]);
    setSelectedDay(null);
  };

  const monthPnl = sumPnl(monthTrades);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12">
      <Reveal>
        <div className="rounded-[2rem] border bg-card p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToMonth(monthIndex - 1)}
                disabled={monthIndex <= 0}
                aria-label="Previous month with trades"
                className="rounded-full border p-1.5 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="min-w-[9.5rem] text-center text-lg font-semibold tracking-tight">
                {monthLabel(month)}
              </p>
              <button
                type="button"
                onClick={() => goToMonth(monthIndex + 1)}
                disabled={monthIndex >= months.length - 1}
                aria-label="Next month with trades"
                className="rounded-full border p-1.5 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              <span className={pnlColor(monthPnl)}>{signedMoney(monthPnl)}</span>{" "}
              · {monthTrades.length} {monthTrades.length === 1 ? "trade" : "trades"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1 sm:gap-2">
            {WEEKDAYS.map((weekday) => (
              <p
                key={weekday}
                className="pb-1 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                <span className="sm:hidden">{weekday[0]}</span>
                <span className="hidden sm:inline">{weekday}</span>
              </p>
            ))}

            {cells.map((key, index) => {
              if (!key) return <div key={`blank-${index}`} />;

              const dayTrades = byDay.get(key);
              const day = Number(key.slice(8));

              if (!dayTrades) {
                return (
                  <div
                    key={key}
                    className="flex min-h-12 flex-col rounded-lg p-1.5 font-mono text-xs text-muted-foreground/60 sm:min-h-20 sm:p-2"
                  >
                    {day}
                  </div>
                );
              }

              const pnl = sumPnl(dayTrades);
              const isSelected = key === selectedDay;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDay(isSelected ? null : key)}
                  aria-pressed={isSelected}
                  aria-label={`${dayLabel(key)}: ${dayTrades.length} trades, ${signedMoney(pnl)}`}
                  className={cn(
                    "flex min-h-12 flex-col items-start rounded-lg border p-1.5 text-left transition-colors sm:min-h-20 sm:p-2",
                    pnl > 0 &&
                      "border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20",
                    pnl < 0 && "border-red-600/30 bg-red-500/10 hover:bg-red-500/20",
                    pnl === 0 && "bg-muted hover:bg-muted/70",
                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  )}
                >
                  <span className="font-mono text-xs">{day}</span>
                  <span
                    className={cn(
                      "mt-auto font-mono text-[10px] font-semibold sm:text-sm",
                      pnlColor(pnl)
                    )}
                  >
                    <span className="sm:hidden">{compactPnl(pnl)}</span>
                    <span className="hidden sm:inline">{signedMoney(pnl)}</span>
                  </span>
                  <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">
                    {dayTrades.length} {dayTrades.length === 1 ? "trade" : "trades"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Trades · {selectedDay ? dayLabel(selectedDay) : monthLabel(month, "short")} (
          {visibleTrades.length})
        </p>
        {selectedDay && (
          <button
            type="button"
            onClick={() => setSelectedDay(null)}
            className="rounded-full border px-3 py-1 font-mono text-xs transition-colors hover:bg-muted"
          >
            Show whole month
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {visibleTrades.map((trade) => (
          <Reveal key={trade.no}>
            <TradeCard trade={trade} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
