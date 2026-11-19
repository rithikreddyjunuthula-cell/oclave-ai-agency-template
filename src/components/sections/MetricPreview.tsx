import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { formatNumber } from '../../lib/format';
import { cn } from '../../lib/utils';
import type { HeroMetric, HeroPreview } from '../../types/hero';
import { GlassCard } from '../ui/GlassCard';

export interface MetricPreviewProps {
  preview: HeroPreview;
}

function TrendIndicator({ trend }: { trend: HeroMetric['trend'] }) {
  if (!trend || trend === 'flat') {
    return trend === 'flat' ? (
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-ash">
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        Flat
      </span>
    ) : null;
  }

  const Icon = trend === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <span className="mt-3 inline-flex items-center gap-1 text-xs text-ash">
      <Icon className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
      {trend === 'down' ? 'Lower' : 'Higher'}
    </span>
  );
}

export default function MetricPreview({ preview }: MetricPreviewProps) {
  const [activeId, setActiveId] = useState(
    preview.scenarios[0]?.id ?? '',
  );
  const activeScenario =
    preview.scenarios.find((scenario) => scenario.id === activeId) ??
    preview.scenarios[0];

  if (!activeScenario) {
    return null;
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();
    const currentIndex = preview.scenarios.findIndex(
      (scenario) => scenario.id === activeScenario.id,
    );
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex =
      (currentIndex + offset + preview.scenarios.length) %
      preview.scenarios.length;
    const nextScenario = preview.scenarios[nextIndex];

    if (!nextScenario) {
      return;
    }

    setActiveId(nextScenario.id);
    document.getElementById(`preview-tab-${nextScenario.id}`)?.focus();
  };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-signal/[0.04] blur-2xl"
      />
      <GlassCard className="relative overflow-hidden rounded-2xl bg-graphite/80 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <span className="font-display text-sm font-semibold tracking-tight">
              {preview.title}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Preview scenario"
            onKeyDown={handleTabKeyDown}
            className="flex rounded-full border border-white/10 bg-white/5 p-0.5"
          >
            {preview.scenarios.map((scenario) => {
              const isActive = scenario.id === activeScenario.id;

              return (
                <button
                  key={scenario.id}
                  id={`preview-tab-${scenario.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="preview-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(scenario.id)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-graphite',
                    isActive
                      ? 'bg-bone text-void'
                      : 'text-ash hover:text-bone',
                  )}
                >
                  {scenario.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={activeScenario.id}
          id="preview-panel"
          role="tabpanel"
          aria-labelledby={`preview-tab-${activeScenario.id}`}
          className="animate-metric-in grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3"
        >
          {activeScenario.metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-graphite px-5 py-6 sm:px-6"
            >
              <p className="text-xs text-ash">{metric.label}</p>
              <p className="mt-3 font-display text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
                {metric.prefix}
                {formatNumber(metric.value)}
                {metric.suffix}
              </p>
              <TrendIndicator trend={metric.trend} />
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-5 py-3 sm:px-6">
          <p className="text-xs leading-relaxed text-ash">{preview.note}</p>
        </div>
      </GlassCard>
    </div>
  );
}
