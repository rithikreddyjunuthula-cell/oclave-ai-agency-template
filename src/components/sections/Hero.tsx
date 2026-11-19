import siteData from '../../data/siteData';
import { formatNumber } from '../../lib/format';
import { BookingButton } from '../booking/BookingButton';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import MetricPreview from './MetricPreview';

export default function Hero() {
  const { hero } = siteData;

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-[32rem] w-[32rem] rounded-full bg-signal/[0.06] blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="animate-hero-in lg:col-span-6">
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {hero.ctas.map((cta) =>
                cta.action === 'booking' ? (
                  <BookingButton
                    key={cta.label}
                    variant={cta.variant}
                    size="lg"
                  >
                    {cta.label}
                  </BookingButton>
                ) : (
                  <Button
                    key={cta.label}
                    href={cta.href}
                    variant={cta.variant}
                    size="lg"
                  >
                    {cta.label}
                  </Button>
                ),
              )}
            </div>

            <p className="mt-6 text-sm text-ash">{hero.proof}</p>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {hero.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-xs leading-snug text-ash">
                    {metric.label}
                  </dt>
                  <dd className="order-1 font-display text-2xl font-bold tracking-tight tabular-nums text-bone sm:text-3xl">
                    {metric.prefix}
                    {formatNumber(metric.value)}
                    {metric.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-hero-in [animation-delay:120ms] lg:col-span-6 lg:col-start-7">
            <MetricPreview preview={hero.preview} />
          </div>
        </div>
      </Container>
    </section>
  );
}
