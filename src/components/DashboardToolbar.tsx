import { CalendarRange } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { usePet } from "../context/PetContext";

const PHASES = [
  { to: "/phase-1", label: "Phase 1" },
  { to: "/phase-2", label: "Phase 2" },
  { to: "/phase-3", label: "Phase 3" },
] as const;

export function DashboardToolbar() {
  const { pathname } = useLocation();
  const { state, setField } = usePet();
  const activeIndex = PHASES.findIndex((p) => p.to === pathname);
  const showSlider = activeIndex >= 0;

  return (
    <header className="sticky top-0 z-50 border-b border-lagoon-200/60 bg-white/75 shadow-sm backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <NavLink
            to="/"
            className="group flex shrink-0 items-center gap-2 rounded-xl py-0.5 outline-none ring-lagoon-400 focus-visible:ring-2"
          >
            <span className="font-display text-xl font-semibold tracking-tight text-lagoon-900 transition group-hover:text-palm-700 sm:text-2xl">
              HiDog
            </span>
            <span className="hidden rounded-full bg-palm-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-palm-800 sm:inline">
              DAR
            </span>
          </NavLink>

          <nav
            className="relative w-full max-w-md flex-1 sm:ml-auto sm:max-w-none sm:flex-initial"
            aria-label="Planner phases"
          >
            <div className="relative w-full rounded-full border border-lagoon-100 bg-gradient-to-r from-lagoon-50/90 via-white to-palm-50/80 p-1 shadow-inner sm:min-w-[20rem]">
              {showSlider && (
                <div
                  className="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-gradient-to-r from-lagoon-500 to-palm-500 shadow-md transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(calc(${activeIndex * 100}%))`,
                  }}
                  aria-hidden
                />
              )}
              <div className="relative z-10 grid w-full grid-cols-3">
                {PHASES.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      [
                        "rounded-full px-2 py-2 text-center text-xs font-semibold transition-colors sm:px-3 sm:text-sm",
                        isActive
                          ? "relative text-white"
                          : "bg-white/85 text-slatemuted-600 shadow-sm hover:bg-white hover:text-lagoon-800",
                      ].join(" ")
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-lagoon-100/70 pt-2.5 sm:gap-4">
          <label
            htmlFor="toolbar-estimated-departure"
            className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slatemuted-600 sm:text-xs sm:normal-case sm:tracking-normal"
          >
            <CalendarRange className="h-3.5 w-3.5 shrink-0 text-lagoon-600" aria-hidden />
            <span className="truncate sm:whitespace-normal">Estimated departure to Hawaii</span>
          </label>
          <input
            id="toolbar-estimated-departure"
            type="date"
            value={state.estimatedDepartureDate}
            onChange={(e) => setField("estimatedDepartureDate", e.target.value)}
            className="min-h-[2.25rem] rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 text-sm text-slatemuted-900 shadow-inner outline-none ring-palm-300/40 focus:border-lagoon-300 focus:ring-2 sm:min-w-[10.5rem]"
          />
          <span className="hidden text-[10px] text-slatemuted-400 sm:inline sm:max-w-[12rem] sm:leading-snug">
            Planning-only. Confirm with HDOA and your vet.
          </span>
        </div>
      </div>
    </header>
  );
}
