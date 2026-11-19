import { lazy, Suspense } from 'react';
import { BookingProvider } from './components/booking/BookingProvider';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import { Container } from './components/ui/Container';

const Capabilities = lazy(
  () => import('./components/sections/Capabilities'),
);
const CaseStudy = lazy(() => import('./components/sections/CaseStudy'));
const Pricing = lazy(() => import('./components/sections/Pricing'));
const FAQ = lazy(() => import('./components/sections/FAQ'));

const SKELETON_CARDS = [0, 1, 2];

function SectionSkeleton() {
  return (
    <div className="py-20 sm:py-24" aria-hidden="true">
      <Container>
        <div className="h-8 w-64 rounded-md bg-white/5" />
        <div className="mt-4 h-4 w-full max-w-xl rounded bg-white/5" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKELETON_CARDS.map((card) => (
            <div
              key={card}
              className="h-48 rounded-xl border border-white/10 bg-white/[0.02]"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-void">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <Suspense fallback={<SectionSkeleton />}>
            <Capabilities />
            <CaseStudy />
            <Pricing />
            <FAQ />
          </Suspense>
        </main>

        <Footer />
      </div>
    </BookingProvider>
  );
}
