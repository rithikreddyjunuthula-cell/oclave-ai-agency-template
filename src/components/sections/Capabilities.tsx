import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import siteData from '../../data/siteData';
import { cn } from '../../lib/utils';
import type { BentoSpan } from '../../types/capability';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

const spanClasses: Record<BentoSpan, string> = {
  sm: 'sm:col-span-1 lg:col-span-2',
  md: 'sm:col-span-1 lg:col-span-2',
  wide: 'sm:col-span-2 lg:col-span-3',
  lg: 'sm:col-span-2 lg:col-span-3 lg:row-span-2',
};

export default function Capabilities() {
  const { capabilities } = siteData;

  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-t border-white/10 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          title="Six ways we remove the busywork."
          description="Each engagement starts with the highest-cost manual loop and ends with a measured handoff. These are the patterns we reach for first."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <GlassCard
                key={capability.id}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05] lg:p-7',
                  spanClasses[capability.span],
                  capability.span === 'lg' && 'bg-white/[0.05]',
                )}
              >
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-void/50 text-signal',
                    capability.span === 'lg' && 'h-12 w-12',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      capability.span === 'lg' && 'h-6 w-6',
                    )}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>

                <h3
                  className={cn(
                    'mt-5 font-display text-lg font-semibold tracking-tight',
                    capability.span === 'lg' && 'text-2xl',
                  )}
                >
                  {capability.title}
                </h3>
                <p
                  className={cn(
                    'mt-2 text-sm leading-relaxed text-ash',
                    capability.span === 'lg' && 'max-w-md text-base',
                  )}
                >
                  {capability.description}
                </p>

                {capability.flow ? (
                  <div className="mt-auto pt-8">
                    <div className="flex flex-wrap items-center gap-2">
                      {capability.flow.map((step, index) => (
                        <Fragment key={step}>
                          {index > 0 ? (
                            <ArrowRight
                              className="h-3.5 w-3.5 text-white/25"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span className="rounded-md border border-white/10 bg-void/40 px-2.5 py-1 text-xs text-ash">
                            {step}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                ) : null}
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
