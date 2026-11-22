import journal from "../../../public/trading-journal.json";

export type Roadmap = typeof journal.roadmap;
export type Phase = Roadmap["phases"][number];

export type PlannedStep = {
  step: number;
  phase: Phase;
  lot: number;
  orders: number;
  profit: number;
  balanceBefore: number;
  balanceAfter: number;
};

// Phase is picked by equity, so a drawdown below a threshold steps back down.
// The last phase has no upper bound (until: null).
export function phaseFor(roadmap: Roadmap, equity: number): Phase {
  return (
    roadmap.phases.find((phase) => phase.until == null || equity < phase.until) ??
    roadmap.phases[roadmap.phases.length - 1]
  );
}

export function lotFor(phase: Phase, equity: number) {
  const { type, value } = phase.rule;
  let lot: number;
  if (type === "fixed") lot = value;
  // Ratio sizing rounds up (aggressive); margin-bound sizing rounds down
  else if (type === "factor") lot = Math.ceil(equity * value * 100) / 100;
  else lot = Math.floor((equity / value) * 100) / 100;
  return Math.min(lot, phase.maxLot);
}

export function ordersFor(phase: Phase, lot: number) {
  return Math.max(1, Math.ceil(lot / phase.maxLotPerOrder - 1e-9));
}

// Net profit of one winning trade at the target, after commission
export function winProfit(roadmap: Roadmap, phase: Phase, lot: number) {
  return lot * (roadmap.pipValuePerLot * roadmap.targetPips - phase.commissionPerLot);
}

export function lossAmount(roadmap: Roadmap, phase: Phase, lot: number) {
  return lot * (roadmap.pipValuePerLot * roadmap.slPips + phase.commissionPerLot);
}

export function finalGoal(roadmap: Roadmap) {
  return roadmap.goals[roadmap.goals.length - 1].profitPerTrade;
}

// Best-case path: every trade wins at the target pips. Ends with the first
// trade whose profit reaches the final per-trade goal.
export function plannedPath(
  roadmap: Roadmap,
  startBalance = roadmap.startBalance
): PlannedStep[] {
  const steps: PlannedStep[] = [];
  const target = finalGoal(roadmap);
  let balance = startBalance;
  while (steps.length < 200) {
    const phase = phaseFor(roadmap, balance);
    const lot = lotFor(phase, balance);
    const profit = winProfit(roadmap, phase, lot);
    steps.push({
      step: steps.length + 1,
      phase,
      lot,
      orders: ordersFor(phase, lot),
      profit,
      balanceBefore: balance,
      balanceAfter: balance + profit,
    });
    balance += profit;
    if (profit >= target) break;
  }
  return steps;
}

// First planned step whose win reaches each per-trade goal
export function goalSteps(roadmap: Roadmap, plan: PlannedStep[]) {
  return roadmap.goals.map((goal) => ({
    goal,
    step: plan.find((step) => step.profit >= goal.profitPerTrade),
  }));
}
