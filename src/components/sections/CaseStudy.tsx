import { ArrowRight } from 'lucide-react';
import siteData from '../../data/siteData';
import { useRoiCalculator } from '../../hooks/useRoiCalculator';
import {
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
  formatPercent,
} from '../../lib/format';
import type { CaseStudyMetric } from '../../types/caseStudy';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { NumberInput } from '../ui/NumberInput';
import { SectionHeading } from '../ui/SectionHeading';

function formatMetricValue(metric: CaseStudyMetric, value: number): string {
  if (metric.format === 'currency') {
    return formatCurrency(value);
  }

  if (metric.format === 'percent') {
    return formatPercent(value);
  }

  return `${formatNumber(value)}${metric.unit}`;
}

export default function CaseStudy() {
  const { caseStudy } = siteData;
  const { calculator } = caseStudy;
  const { inputs, updateInput, results } = useRoiCalculator(
    calculator.defaults,
    calculator.setupCost,
  );

  const payback = Number.isFinite(results.paybackMonths)
    ? `${formatNumber(results.paybackMonths)} mo`
    : '—';

  return (
    <section
      id="case-study"
      className="scroll-mt-24 border-t border-white/10 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          title={caseStudy.headline}
          description={caseStudy.summary}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <GlassCard className="flex flex-col p-6 lg:col-span-5 lg:p-8">
            <p className="text-xs font-medium text-signal">
              {caseStudy.industry}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
              {caseStudy.client}
            </h3>

            <div className="mt-6 space-y-5">
              <div className="border-t border-white/10 pt-5">
                <h4 className="text-sm font-medium text-bone">The problem</h4>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {caseStudy.challenge}
                </p>
              </div>
              <div className="border-t border-white/10 pt-5">
                <h4 className="text-sm font-medium text-bone">The build</h4>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {caseStudy.metrics.map((metric) => {
              const reduction =
                metric.before > 0
                  ? ((metric.before - metric.after) / metric.before) * 100
                  : 0;

              return (
                <GlassCard key={metric.label} className="p-5">
                  <p className="text-xs text-ash">{metric.label}</p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="text-sm text-ash line-through decoration-white/20">
                      {formatMetricValue(metric, metric.before)}
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-white/30"
                      aria-hidden="true"
                    />
                    <span className="font-display text-2xl font-bold tracking-tight text-bone">
                      {formatMetricValue(metric, metric.after)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-signal">
                    {formatPercent(reduction)} lower
                  </p>
                </GlassCard>
              );
            })}
          </div>

          <GlassCard className="overflow-hidden lg:col-span-12">
            <div className="grid gap-8 p-6 lg:grid-cols-2 lg:gap-12 lg:p-8">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {calculator.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {calculator.description}
                </p>

                <div className="mt-6 space-y-5">
                  <NumberInput
                    id="roi-hours"
                    label={calculator.labels.hoursPerWeek}
                    value={inputs.hoursPerWeek}
                    min={5}
                    max={80}
                    step={1}
                    suffix="h"
                    onChange={(value) => updateInput('hoursPerWeek', value)}
                  />
                  <NumberInput
                    id="roi-rate"
                    label={calculator.labels.hourlyRate}
                    value={inputs.hourlyRate}
                    min={25}
                    max={200}
                    step={5}
                    prefix="$"
                    onChange={(value) => updateInput('hourlyRate', value)}
                  />
                  <NumberInput
                    id="roi-coverage"
                    label={calculator.labels.coverage}
                    value={inputs.coverage}
                    min={10}
                    max={90}
                    step={5}
                    suffix="%"
                    onChange={(value) => updateInput('coverage', value)}
                  />
                </div>

                <p className="mt-5 text-xs text-ash">
                  Measured against a {formatCurrency(calculator.setupCost)}{' '}
                  {calculator.setupCostLabel.toLowerCase()}.
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-lg border border-signal/20 bg-signal/[0.04] p-5 sm:p-6">
                <p className="text-xs text-ash">
                  {calculator.results.monthlySavings}
                </p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tight text-signal sm:text-5xl">
                  {formatCurrency(results.monthlySavings)}
                  <span className="ml-1 text-base font-medium text-ash">
                    /mo
                  </span>
                </p>
                <p className="mt-2 text-xs text-ash">
                  {formatNumber(results.hoursSavedPerMonth)} hours returned per
                  month
                </p>

                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <dt className="text-xs text-ash">
                      {calculator.results.annualSavings}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold tracking-tight">
                      {formatCompactCurrency(results.annualSavings)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ash">
                      {calculator.results.payback}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold tracking-tight">
                      {payback}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ash">
                      {calculator.results.roi}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold tracking-tight">
                      {formatPercent(results.roiPercent)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
