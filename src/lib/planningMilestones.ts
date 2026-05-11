import { addDays, calendarDaysBetween, startOfDay } from "./dates";

/** How far before travel the planning bar begins (visual + first milestone room). */
export const PLANNING_BAR_LEAD_DAYS = 95;

export type PlanningMilestoneId = "rabies" | "favn" | "hdoa" | "healthCert";

export type PlanningMilestone = {
  id: PlanningMilestoneId;
  title: string;
  detail: string;
  /** Calendar date: target to complete this step by. */
  targetDate: Date;
};

/**
 * Rough backwards planning from an intended Hawaii travel date.
 * Not a substitute for HDOA rules—confirm every date with your vet.
 */
export function computePlanningMilestones(
  travelDate: Date,
  neighborIsland: boolean,
): PlanningMilestone[] {
  const t = startOfDay(travelDate);
  const hdoaDaysBefore = neighborIsland ? 48 : 38;

  return [
    {
      id: "rabies",
      title: "Rabies shots up to date",
      detail: "Second rabies (≥30 days after the first) should be done well before the FAVN draw.",
      targetDate: addDays(t, -85),
    },
    {
      id: "favn",
      title: "FAVN (rabies titer) blood draw",
      detail: "Schedule so results and the 30-day post-draw wait fit your travel date.",
      targetDate: addDays(t, -50),
    },
    {
      id: "hdoa",
      title: "Submit HDOA / AQS paperwork",
      detail: neighborIsland
        ? "Neighbor-island moves often need more lead time (NOI, permits)—send materials earlier."
        : "Typical window to submit AQS-279 and fees before travel; verify current HDOA deadlines.",
      targetDate: addDays(t, -hdoaDaysBefore),
    },
    {
      id: "healthCert",
      title: "Final vet exam & health certificate",
      detail: "Most airlines and Hawaii expect a recent health cert—often within 10–14 days of travel.",
      targetDate: addDays(t, -10),
    },
  ];
}

export function getPlanningBarStart(travelDate: Date): Date {
  return addDays(startOfDay(travelDate), -PLANNING_BAR_LEAD_DAYS);
}

export function getPlanningBarEnd(travelDate: Date): Date {
  return startOfDay(travelDate);
}

/** Position 0–100 along the bar from plan start → travel. */
export function percentOnPlanningBar(date: Date, travelDate: Date): number {
  const start = getPlanningBarStart(travelDate);
  const end = getPlanningBarEnd(travelDate);
  const total = calendarDaysBetween(start, end);
  if (total <= 0) return 0;
  const pos = calendarDaysBetween(start, startOfDay(date));
  return Math.min(100, Math.max(0, (pos / total) * 100));
}
