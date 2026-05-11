import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { usePet } from "../context/PetContext";
import { calendarDaysBetween, formatLong, parseISODateLocal, startOfDay } from "../lib/dates";
import {
  computePlanningMilestones,
  getPlanningBarEnd,
  getPlanningBarStart,
  percentOnPlanningBar,
} from "../lib/planningMilestones";
import { AirportToggle } from "./AirportToggle";

function countdownLabel(from: Date, target: Date): { text: string; tone: "ok" | "soon" | "past" } {
  const n = calendarDaysBetween(startOfDay(from), startOfDay(target));
  if (n > 7) return { text: `in ${n} days`, tone: "ok" };
  if (n > 1) return { text: `in ${n} days`, tone: "soon" };
  if (n === 1) return { text: "in 1 day", tone: "soon" };
  if (n === 0) return { text: "today", tone: "soon" };
  if (n === -1) return { text: "1 day overdue", tone: "past" };
  return { text: `${Math.abs(n)} days overdue`, tone: "past" };
}

export function TravelPlanningPanel() {
  const { state } = usePet();
  const today = startOfDay(new Date());
  const travel = parseISODateLocal(state.estimatedDepartureDate);

  const milestones = useMemo(() => {
    if (!travel) return [];
    return computePlanningMilestones(travel, state.neighborIsland);
  }, [travel, state.neighborIsland]);

  const todayPct = travel ? percentOnPlanningBar(today, travel) : 0;
  const daysToTravel = travel ? calendarDaysBetween(today, travel) : null;

  return (
    <div className="rounded-2xl border border-lagoon-100/90 bg-white/92 p-3 shadow-sm backdrop-blur-sm sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-wide text-slatemuted-400">Arrival airport</span>
        <AirportToggle />
      </div>

      <details className="timeline-disclosure mt-3 overflow-hidden rounded-xl border border-lagoon-100 bg-lagoon-50/20 open:bg-white/80 open:shadow-inner">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium text-slatemuted-800 transition hover:bg-lagoon-50/60 [&::-webkit-details-marker]:hidden">
          <span>Show timeline of due dates</span>
          <ChevronDown
            className="timeline-chevron h-4 w-4 shrink-0 text-lagoon-600 transition-transform duration-200"
            aria-hidden
          />
        </summary>

        <div className="border-t border-lagoon-100/60 px-3 py-3 sm:px-4 sm:py-4">
          {!travel && (
            <p className="text-center text-xs leading-relaxed text-slatemuted-600">
              Choose your <span className="font-medium text-slatemuted-800">estimated departure to Hawaii</span> in
              the toolbar above. We&apos;ll suggest target dates for rabies, FAVN, HDOA paperwork, and your final health
              certificate.
            </p>
          )}

          {travel && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-sand-100 pb-3">
                <p className="text-sm text-slatemuted-600">Countdown to travel</p>
                <p className="font-display text-lg font-semibold tabular-nums text-lagoon-900">
                  {daysToTravel !== null && daysToTravel > 0 && `${daysToTravel} days`}
                  {daysToTravel === 0 && "Today"}
                  {daysToTravel !== null && daysToTravel < 0 && `${Math.abs(daysToTravel)} days ago`}
                </p>
              </div>

              <div className="relative">
                <p className="sr-only">
                  Estimated planning timeline from roughly three months before travel through your departure date.
                </p>
                <div
                  className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-sand-100 via-lagoon-50 to-palm-50 ring-1 ring-lagoon-100/60"
                  aria-hidden
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lagoon-400/90 to-palm-500/90 transition-[width] duration-500"
                    style={{ width: `${Math.min(100, todayPct)}%` }}
                  />
                  {milestones.map((m) => {
                    const pct = percentOnPlanningBar(m.targetDate, travel);
                    return (
                      <span
                        key={m.id}
                        className="absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-lagoon-600 shadow ring-1 ring-lagoon-300/80"
                        style={{ left: `${pct}%` }}
                        title={m.title}
                      />
                    );
                  })}
                  <span
                    className="absolute right-0.5 top-1/2 z-20 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-palm-600 bg-white shadow-md ring-2 ring-palm-400/60"
                    title="Planned travel"
                  />
                </div>
                <div className="mt-1 flex justify-between text-[10px] font-medium uppercase tracking-wide text-slatemuted-400">
                  <span>{formatLong(getPlanningBarStart(travel))}</span>
                  <span className="text-palm-700">{formatLong(getPlanningBarEnd(travel))}</span>
                </div>
              </div>

              <ol className="space-y-2.5">
                {milestones.map((m, i) => {
                  const { text, tone } = countdownLabel(today, m.targetDate);
                  return (
                    <li
                      key={m.id}
                      className="flex gap-3 rounded-xl border border-sand-100 bg-sand-50/40 px-3 py-2.5 sm:items-center"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-lagoon-700 ring-1 ring-lagoon-100">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                          <p className="text-sm font-medium text-slatemuted-900">{m.title}</p>
                          <span
                            className={`text-xs font-semibold tabular-nums ${
                              tone === "past"
                                ? "text-red-600"
                                : tone === "soon"
                                  ? "text-amber-700"
                                  : "text-palm-700"
                            }`}
                          >
                            {text}
                          </span>
                        </div>
                        <p className="text-xs text-slatemuted-500">Target: {formatLong(m.targetDate)}</p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slatemuted-500">{m.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <p className="text-[10px] leading-relaxed text-slatemuted-400">
                Milestone dates are rough estimates only—always verify against current HDOA rules and your accredited
                veterinarian.
              </p>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
