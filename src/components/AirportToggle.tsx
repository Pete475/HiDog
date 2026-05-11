import { Palmtree, Plane } from "lucide-react";
import { usePet } from "../context/PetContext";

export function AirportToggle() {
  const { state, setField } = usePet();

  return (
    <div
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-lagoon-50/90 p-0.5 ring-1 ring-lagoon-100/80"
      role="group"
      aria-label="Arrival airport"
    >
      <button
        type="button"
        onClick={() => setField("neighborIsland", false)}
        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition sm:px-2.5 sm:py-1.5 ${
          !state.neighborIsland
            ? "bg-gradient-to-r from-lagoon-500 to-palm-500 text-white shadow-sm"
            : "text-slatemuted-600 hover:bg-white/90"
        }`}
      >
        <Plane className="h-3.5 w-3.5 shrink-0" aria-hidden />
        HNL
      </button>
      <button
        type="button"
        onClick={() => setField("neighborIsland", true)}
        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition sm:px-2.5 sm:py-1.5 ${
          state.neighborIsland
            ? "bg-gradient-to-r from-lagoon-500 to-palm-500 text-white shadow-sm"
            : "text-slatemuted-600 hover:bg-white/90"
        }`}
      >
        <Palmtree className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="max-w-[4.5rem] truncate sm:max-w-none">Neighbor</span>
      </button>
    </div>
  );
}
