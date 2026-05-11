import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_-10%,rgb(14_165_233/0.18),transparent),radial-gradient(700px_400px_at_100%_20%,rgb(16_185_129/0.12),transparent),radial-gradient(600px_400px_at_0%_80%,rgb(14_165_233/0.1),transparent)]'
        aria-hidden
      />

      <header className='relative z-10 border-b border-white/40 bg-white/40 px-4 py-4 backdrop-blur-md sm:px-6'>
        <div className='mx-auto flex max-w-5xl items-center justify-between'>
          <Link
            to='/'
            className='font-display text-xl font-semibold text-lagoon-900 sm:text-2xl'
          >
            HiDog
          </Link>
          <span className='rounded-full bg-palm-100 px-3 py-1 text-xs font-medium text-palm-800 ring-1 ring-palm-200/60'>
            <Link
              to='/phase-1'
              className='font-medium text-lagoon-700 underline decoration-lagoon-300 underline-offset-2 hover:text-palm-700'
            >
              Ready to bring your pup to paradise?
            </Link>
          </span>
        </div>
      </header>

      <main className='relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-12 text-center sm:px-6 sm:pb-32 sm:pt-16'>
        <p className='font-display text-lg font-medium tracking-wide text-lagoon-800 sm:text-xl'>
          Hawaii&apos;s pet relocation guide.
        </p>

        <h1 className='mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-lagoon-950 sm:text-5xl md:text-6xl'>
          Move your dog to the islands.
        </h1>

        <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slatemuted-600 sm:text-xl'>
          It takes 4-6 months to qualify for Direct Airport Release. Use our
          step-by-step guide to navigate Hawaii&apos;s strict quarantine rules
          with confidence.
        </p>

        <Link
          to='/phase-1'
          className='mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lagoon-500 via-lagoon-500 to-palm-500 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-lagoon-500/25 transition hover:brightness-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palm-500'
        >
          Start with Phase 1
        </Link>
      </main>

      <footer className='relative z-10 border-t border-lagoon-100/80 bg-white/50 px-4 py-6 text-center text-xs text-slatemuted-500 backdrop-blur-sm'>
        HiDog is a planning aid only. Confirm every requirement with{' '}
        <a
          className='font-medium text-lagoon-700 underline decoration-lagoon-300 underline-offset-2 hover:text-palm-700'
          href='https://hdoa.hawaii.gov/ai/aqs/aqs-info/'
          target='_blank'
          rel='noreferrer'
        >
          Hawaii HDOA
        </a>{' '}
        and your veterinarian.
      </footer>
    </div>
  );
}
