import { Calendar, Hash, Sparkles } from "lucide-react";
import { usePet } from "../context/PetContext";

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slatemuted-700">
      {children}
    </label>
  );
}

export function Phase1Form() {
  const { state, setField, validation } = usePet();

  return (
    <section
      id="phase-1"
      className="scroll-mt-24 rounded-3xl border border-lagoon-100/80 bg-white/95 p-6 shadow-md shadow-lagoon-900/5 sm:p-8"
      aria-labelledby="phase-1-heading"
    >
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon-100 to-palm-100 text-palm-700">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 id="phase-1-heading" className="font-display text-xl font-semibold text-slatemuted-900">
            Phase 1 — The foundation
          </h2>
          <p className="text-sm text-slatemuted-500">Manual entry. We validate timing as you go.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-sand-100 bg-sand-50/50 p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slatemuted-500">
            <Hash className="h-4 w-4" aria-hidden />
            Identity
          </h3>
          <div className="space-y-4">
            <div>
              <FieldLabel htmlFor="petName">Pet name</FieldLabel>
              <input
                id="petName"
                type="text"
                autoComplete="off"
                value={state.petName}
                onChange={(e) => setField("petName", e.target.value)}
                placeholder="e.g. Kona"
                className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-slatemuted-800 shadow-inner outline-none ring-palm-300/50 transition placeholder:text-slatemuted-400 focus:border-lagoon-300 focus:ring-2 focus:ring-lagoon-200"
              />
            </div>
            <div>
              <FieldLabel htmlFor="microchip">Microchip number</FieldLabel>
              <input
                id="microchip"
                type="text"
                autoComplete="off"
                value={state.microchipNumber}
                onChange={(e) => setField("microchipNumber", e.target.value)}
                placeholder="15-digit ISO"
                className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-slatemuted-800 shadow-inner outline-none ring-palm-300/50 transition placeholder:text-slatemuted-400 focus:border-lagoon-300 focus:ring-2 focus:ring-lagoon-200"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-sand-100 bg-sand-50/50 p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slatemuted-500">
            <Calendar className="h-4 w-4" aria-hidden />
            Critical dates
          </h3>
          <div className="space-y-4">
            <div>
              <FieldLabel htmlFor="chipDate">Microchip implantation date</FieldLabel>
              <input
                id="chipDate"
                type="date"
                value={state.microchipImplantDate}
                onChange={(e) => setField("microchipImplantDate", e.target.value)}
                className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-slatemuted-800 shadow-inner outline-none ring-palm-300/50 transition focus:border-lagoon-300 focus:ring-2 focus:ring-lagoon-200"
              />
              <p className="mt-1.5 text-xs text-slatemuted-500">Must be on or before the first rabies shot.</p>
            </div>
            <div>
              <FieldLabel htmlFor="rabies1">Rabies vaccination #1</FieldLabel>
              <input
                id="rabies1"
                type="date"
                value={state.rabies1Date}
                onChange={(e) => setField("rabies1Date", e.target.value)}
                className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-slatemuted-800 shadow-inner outline-none ring-palm-300/50 transition focus:border-lagoon-300 focus:ring-2 focus:ring-lagoon-200"
              />
            </div>
            <div>
              <FieldLabel htmlFor="rabies2">Rabies vaccination #2</FieldLabel>
              <input
                id="rabies2"
                type="date"
                value={state.rabies2Date}
                onChange={(e) => setField("rabies2Date", e.target.value)}
                className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-slatemuted-800 shadow-inner outline-none ring-palm-300/50 transition focus:border-lagoon-300 focus:ring-2 focus:ring-lagoon-200"
              />
              <p className="mt-1.5 text-xs text-slatemuted-500">Must be at least 30 days after rabies #1.</p>
            </div>
            <div>
              <FieldLabel htmlFor="favn">FAVN (titer) blood draw date</FieldLabel>
              <input
                id="favn"
                type="date"
                value={state.favnDrawDate}
                onChange={(e) => setField("favnDrawDate", e.target.value)}
                className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-slatemuted-800 shadow-inner outline-none ring-palm-300/50 transition focus:border-lagoon-300 focus:ring-2 focus:ring-lagoon-200"
              />
            </div>
          </div>
        </div>
      </div>

      {validation.isIneligible && (
        <div
          className="mt-6 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm font-medium text-red-900"
          role="alert"
        >
          Ineligible: first rabies date is after your FAVN draw. Revise dates or speak with your accredited vet
          before relying on this timeline.
        </div>
      )}

      {validation.issues.filter((i) => i.id !== "rabies-after-favn").length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-red-800">
          {validation.issues
            .filter((i) => i.id !== "rabies-after-favn")
            .map((i) => (
              <li key={i.id} className="rounded-xl bg-red-50/80 px-3 py-2">
                {i.message}
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
