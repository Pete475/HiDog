import { Outlet } from "react-router-dom";
import { DashboardToolbar } from "../components/DashboardToolbar";
import { TravelPlanningPanel } from "../components/TravelPlanningPanel";

export function PhaseLayout() {
  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(800px_420px_at_80%_-5%,rgb(14_165_233/0.12),transparent),radial-gradient(700px_380px_at_10%_30%,rgb(16_185_129/0.08),transparent)]"
        aria-hidden
      />
      <DashboardToolbar />
      <div className="relative mx-auto max-w-3xl space-y-6 px-4 pb-20 pt-6 sm:px-6 lg:max-w-5xl lg:px-8">
        <TravelPlanningPanel />
        <Outlet />
      </div>
      <footer className="relative border-t border-lagoon-100/80 bg-white/60 py-8 text-center text-xs text-slatemuted-500 backdrop-blur-sm">
        HiDog is a planning aid only. Always confirm requirements with{" "}
        <a
          className="font-medium text-lagoon-700 underline decoration-lagoon-300 underline-offset-2 hover:text-palm-700"
          href="https://hdoa.hawaii.gov/ai/aqs/aqs-info/"
          target="_blank"
          rel="noreferrer"
        >
          Hawaii HDOA
        </a>{" "}
        and your veterinarian.
      </footer>
    </div>
  );
}
