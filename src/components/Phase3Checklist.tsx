import { AlertTriangle, ClipboardCheck, Printer } from 'lucide-react';
import { usePet } from '../context/PetContext';
import { formatLong } from '../lib/dates';

type CheckItem = { id: string; title: string; detail: string };

function buildChecklist(neighborIsland: boolean): CheckItem[] {
  const common: CheckItem[] = [
    {
      id: 'vet-accredited',
      title: 'Accredited veterinarian',
      detail:
        'Work with a USDA-accredited vet familiar with Hawaii’s Dog and Cat Import Rules.',
    },
    {
      id: 'rabies-docs',
      title: 'Rabies documentation',
      detail:
        'Maintain records for two rabies vaccines given at least 30 days apart (when both dates apply).',
    },
    {
      id: 'microchip-iso',
      title: 'ISO microchip',
      detail:
        'Confirm microchip is implanted before or on first rabies vaccination date per your records.',
    },
    {
      id: 'favn-lab',
      title: 'FAVN test & lab routing',
      detail:
        'Blood draw sent to an HDOA-approved lab; track results and waiting periods.',
    },
  ];

  const hnl: CheckItem[] = [
    {
      id: 'aqs-279',
      title: 'AQS-279 — Dog & Cat Import Form',
      detail:
        'Submit to HDOA with fees; this is the core state intake form for Honolulu (AQS) processing.',
    },
    {
      id: 'state-payment',
      title: 'State payment & confirmations',
      detail:
        'Pay required fees and keep receipts and approval correspondence for travel day.',
    },
    {
      id: 'aqs-station',
      title: 'Airport Animal Quarantine Station (AQS)',
      detail:
        'Coordinate arrival inspection and direct release through HNL’s AQS pathway.',
    },
    {
      id: 'airline-cargo',
      title: 'Airline booking & crate',
      detail:
        'Confirm airline pet policy, routing, and crate labeling for Hawaii entry.',
    },
  ];

  const neighbor: CheckItem[] = [
    {
      id: 'notice-intent',
      title: 'Notice of Intent (NOI)',
      detail:
        'File neighbor-island intent paperwork on HDOA’s timeline—required in addition to core import docs.',
    },
    {
      id: 'inspector-contract',
      title: 'Contract a Neighbor Island inspector',
      detail:
        'Arrange a private vet contractor authorized for neighbor-island direct release inspections.',
    },
    {
      id: 'permit-direct',
      title: 'Permit for Direct Release',
      detail:
        'Secure neighbor-island permit requirements beyond HNL’s AQS-only flow.',
    },
    {
      id: 'airline-neighbor',
      title: 'Airline + island airport coordination',
      detail:
        'Confirm KOA, LIH, or OGG routing, inspection appointment, and cargo vs cabin rules.',
    },
  ];

  return [...common, ...(neighborIsland ? neighbor : hnl)];
}

export function printVetCheatSheet(): void {
  // Placeholder: future export/PDF with condensed dates for the vet.
  console.log(
    '[HiDog] printVetCheatSheet — placeholder for vet summary export.',
  );
  window.alert(
    'Vet cheat sheet export is coming soon. For now, use Print from your browser after filling your dates.',
  );
}

export function Phase3Checklist() {
  const { state, timeline, validation } = usePet();
  const items = buildChecklist(state.neighborIsland);

  return (
    <section
      id='phase-3'
      className='scroll-mt-24 rounded-3xl border border-lagoon-100/80 bg-white/95 p-6 shadow-md shadow-lagoon-900/5 sm:p-8'
      aria-labelledby='phase-3-heading'
    >
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon-100 to-palm-100 text-palm-700'>
            <ClipboardCheck className='h-5 w-5' aria-hidden />
          </span>
          <div>
            <h2
              id='phase-3-heading'
              className='font-display text-xl font-semibold text-slatemuted-900'
            >
              Phase 3 — The Checklist
            </h2>
            <p className='text-sm text-slatemuted-500'>
              {state.neighborIsland
                ? 'Neighbor Island Checklist.'
                : 'Honolulu (HNL) / Oahu Checklist.'}
            </p>
          </div>
        </div>
        <button
          type='button'
          onClick={printVetCheatSheet}
          className='inline-flex items-center justify-center gap-2 self-start rounded-xl border border-lagoon-200 bg-white px-4 py-2.5 text-sm font-medium text-slatemuted-800 shadow-sm transition hover:border-palm-300 hover:bg-lagoon-50/50'
        >
          <Printer className='h-4 w-4' aria-hidden />
          Print vet cheat sheet
        </button>
      </div>

      {state.neighborIsland && (
        <div
          className='mb-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950'
          role='status'
        >
          <AlertTriangle
            className='mt-0.5 h-5 w-5 shrink-0 text-amber-600'
            aria-hidden
          />
          <div>
            <p className='font-semibold'>Neighbor island reminder</p>
            <p className='mt-1 leading-relaxed text-amber-900/90'>
              Your airline must be notified of neighbor-island inspection
              requirements, and you should book a local accredited vet
              contractor{' '}
              <span className='font-semibold'>at least 30 days in advance</span>{' '}
              of when you need them in the workflow. Missing this window can
              delay direct release.
            </p>
          </div>
        </div>
      )}

      <ul className='space-y-3'>
        {items.map((item, index) => (
          <li
            key={item.id}
            className='flex gap-4 rounded-2xl border border-sand-100 bg-sand-50/30 px-4 py-4 transition hover:border-lagoon-100 hover:bg-white'
          >
            <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lagoon-50 to-palm-50 text-sm font-semibold text-palm-800 shadow-sm ring-1 ring-lagoon-100'>
              {index + 1}
            </span>
            <div className='min-w-0'>
              <p className='font-medium text-slatemuted-900'>{item.title}</p>
              <p className='mt-1 text-sm leading-relaxed text-slatemuted-600'>
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {(timeline.earliestAfter30Days || validation.isIneligible) && (
        <div className='mt-8 rounded-2xl border border-sand-200 bg-sand-50/50 p-4 text-xs leading-relaxed text-slatemuted-600'>
          <p className='font-medium text-slatemuted-800'>Quick recap</p>
          <ul className='mt-2 list-inside list-disc space-y-1'>
            {state.petName && <li>Pet: {state.petName}</li>}
            {timeline.earliestAfter30Days && (
              <li>
                30-day earliest arrival:{' '}
                {formatLong(timeline.earliestAfter30Days)}
              </li>
            )}
            {timeline.dateAfter120Days && (
              <li>
                120-day planning date (from FAVN):{' '}
                {formatLong(timeline.dateAfter120Days)}
              </li>
            )}
            {validation.isIneligible && (
              <li className='text-red-700'>
                Status: ineligible until dates are corrected.
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
