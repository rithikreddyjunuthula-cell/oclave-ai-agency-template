import { Check } from 'lucide-react';
import siteData from '../../data/siteData';
import { usePricingToggle } from '../../hooks/usePricingToggle';
import type { BillingPeriod } from '../../hooks/usePricingToggle';
import { formatCurrency } from '../../lib/format';
import { cn } from '../../lib/utils';
import { BookingButton } from '../booking/BookingButton';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Toggle } from '../ui/Toggle';
import type { ToggleOption } from '../ui/Toggle';

export default function Pricing() {
  const { pricing } = siteData;
  const { billing, setBilling } = usePricingToggle('annual');
  const isAnnual = billing === 'annual';

  const toggleOptions: ToggleOption<BillingPeriod>[] = [
    { value: 'monthly', label: pricing.toggle.monthlyLabel },
    {
      value: 'annual',
      label: pricing.toggle.annualLabel,
      badge: pricing.toggle.annualBadge,
    },
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-t border-white/10 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title={pricing.headline}
            description={pricing.subheadline}
          />
          <div className="shrink-0">
            <Toggle
              options={toggleOptions}
              value={billing}
              onChange={setBilling}
              label="Billing period"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pricing.tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <GlassCard
                key={tier.id}
                className={cn(
                  'relative flex h-full flex-col p-6 lg:p-7',
                  tier.highlighted &&
                    'border-signal/40 bg-white/[0.05]',
                )}
              >
                {tier.badge ? (
                  <span className="absolute -top-3 left-6 rounded-full border border-signal/30 bg-void px-3 py-1 text-xs font-medium text-signal">
                    {tier.badge}
                  </span>
                ) : null}

                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold tracking-tight tabular-nums">
                    {formatCurrency(price)}
                  </span>
                  <span className="text-sm text-ash">
                    {tier.priceSuffix ?? '/mo'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ash">
                  {isAnnual ? 'Billed annually' : 'Billed monthly'}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-ash"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <BookingButton
                    variant={tier.highlighted ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    {tier.cta.label}
                  </BookingButton>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {pricing.footnote ? (
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ash">
            {pricing.footnote}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
