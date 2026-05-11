import { Anchor, CalendarClock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePet } from '../context/PetContext';
import { formatLong } from '../lib/dates';

export function Phase2Timeline() {
  const { state, timeline, validation } = usePet();
  const hasFavn = Boolean(timeline.favn);

  return (
    <section
      id='phase-2'
      className='scroll-mt-24 rounded-3xl border border-lagoon-100/80 bg-white/95 p-6 shadow-md shadow-lagoon-900/5 sm:p-8'
      aria-labelledby='phase-2-heading'
    >
      <div className='mb-8 flex flex-wrap items-center gap-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon-100 to-palm-100 text-palm-700'>
          <CalendarClock className='h-5 w-5' aria-hidden />
        </span>
        <div>
          <h2
            id='phase-2-heading'
            className='font-display text-xl font-semibold text-slatemuted-900'
          >
            Phase 2 — The FAVN
          </h2>
          <p className='text-sm text-slatemuted-500'>
            Dates from your FAVN draw drive Hawaii entry timing.
          </p>
        </div>
      </div>

      {!hasFavn && (
        <p className='rounded-2xl border border-dashed border-lagoon-200 bg-lagoon-50/50 px-4 py-6 text-center text-sm text-slatemuted-600'>
          Add a FAVN blood draw date in{' '}
          <Link
            to='/phase-1'
            className='font-medium text-lagoon-700 underline decoration-lagoon-300 underline-offset-2 hover:text-palm-700'
          >
            Phase 1
          </Link>{' '}
          to unlock the 30-day and 120-day calculations.
        </p>
      )}

      {hasFavn && (
        <div className='grid gap-4 lg:grid-cols-3'>
          <article className='flex flex-col rounded-2xl border border-lagoon-100 bg-gradient-to-b from-lagoon-50/90 via-white to-palm-50/40 p-5'>
            <div className='mb-3 flex items-center gap-2 text-lagoon-800'>
              <Anchor className='h-5 w-5 shrink-0' aria-hidden />
              <h3 className='font-display text-sm font-semibold'>
                30-day rule
              </h3>
            </div>
            <p className='text-sm leading-relaxed text-slatemuted-600'>
              Your dog should not enter Hawaii until at least{' '}
              <span className='font-medium text-slatemuted-800'>30 days</span>{' '}
              after the FAVN blood draw.
            </p>
            <p className='mt-4 font-display text-lg font-semibold text-slatemuted-900'>
              {timeline.earliestAfter30Days
                ? formatLong(timeline.earliestAfter30Days)
                : '—'}
            </p>
            <p className='mt-1 text-xs text-slatemuted-500'>
              First calendar day that satisfies the 30-day wait.
            </p>
          </article>

          <article className='flex flex-col rounded-2xl border border-sand-200 bg-sand-50/40 p-5'>
            <div className='mb-3 flex items-center gap-2 text-slatemuted-800'>
              <ShieldCheck className='h-5 w-5 shrink-0' aria-hidden />
              <h3 className='font-display text-sm font-semibold'>
                120-day rule
              </h3>
            </div>
            <p className='text-sm leading-relaxed text-slatemuted-600'>
              For quarantine avoidance planning tied to your FAVN timeline, HDOA
              materials often reference a{' '}
              <span className='font-medium text-slatemuted-800'>120-day</span>{' '}
              milestone from the draw—confirm how this applies to your exact
              program with HDOA and your vet.
            </p>
            <p className='mt-4 font-display text-lg font-semibold text-slatemuted-900'>
              {timeline.dateAfter120Days
                ? formatLong(timeline.dateAfter120Days)
                : '—'}
            </p>
            <p className='mt-1 text-xs text-slatemuted-500'>
              120 days after FAVN draw (planning anchor).
            </p>
          </article>

          <article
            className={`flex flex-col rounded-2xl border p-5 ${
              validation.isIneligible
                ? 'border-red-200 bg-red-50/50'
                : 'border-lagoon-100 bg-white shadow-sm'
            }`}
          >
            <h3 className='font-display text-sm font-semibold text-slatemuted-900'>
              Safe arrival window
            </h3>
            {validation.isIneligible ? (
              <p className='mt-3 text-sm font-medium text-red-900'>
                Blocked while marked ineligible (rabies #1 after FAVN). Fix
                Phase 1 dates to see a reliable window.
              </p>
            ) : (
              <>
                <p className='mt-3 text-sm leading-relaxed text-slatemuted-600'>
                  Treat{' '}
                  <span className='font-semibold text-slatemuted-900'>
                    on or after
                  </span>{' '}
                  the 30-day rule date as your earliest planned arrival for
                  FAVN-based timing, then align the 120-day milestone and forms
                  with HDOA.
                </p>
                <p className='mt-4 rounded-xl bg-gradient-to-r from-lagoon-50 to-palm-50 px-3 py-2 font-display text-base font-semibold text-palm-900'>
                  {timeline.earliestAfter30Days
                    ? `Earliest planned arrival: ${formatLong(timeline.earliestAfter30Days)}`
                    : '—'}
                </p>
                {timeline.safeWindowSummary && (
                  <p className='mt-3 text-xs leading-relaxed text-slatemuted-500'>
                    {timeline.safeWindowSummary}
                  </p>
                )}
              </>
            )}
          </article>
        </div>
      )}

      {state.petName && hasFavn && (
        <p className='mt-6 text-center text-xs text-slatemuted-400'>
          Timeline for{' '}
          <span className='font-medium text-slatemuted-600'>
            {state.petName}
          </span>{' '}
          — informational only; always verify against current HDOA rules.
        </p>
      )}
    </section>
  );
}
