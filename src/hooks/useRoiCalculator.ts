import { useCallback, useMemo, useState } from 'react';
import type { RoiDefaults } from '../types/caseStudy';

const WEEKS_PER_MONTH = 4.33;

export type RoiInputs = RoiDefaults;

export interface RoiResults {
  automatedHoursPerWeek: number;
  hoursSavedPerMonth: number;
  monthlySavings: number;
  annualSavings: number;
  paybackMonths: number;
  roiPercent: number;
}

export interface RoiCalculatorState {
  inputs: RoiInputs;
  updateInput: <K extends keyof RoiInputs>(key: K, value: number) => void;
  results: RoiResults;
}

export function useRoiCalculator(
  defaults: RoiDefaults,
  setupCost: number,
): RoiCalculatorState {
  const [inputs, setInputs] = useState<RoiInputs>(defaults);

  const updateInput = useCallback(
    <K extends keyof RoiInputs>(key: K, value: number) => {
      setInputs((previous) => ({ ...previous, [key]: value }));
    },
    [],
  );

  const results = useMemo<RoiResults>(() => {
    const automatedHoursPerWeek =
      inputs.hoursPerWeek * (inputs.coverage / 100);
    const hoursSavedPerMonth = automatedHoursPerWeek * WEEKS_PER_MONTH;
    const monthlySavings = hoursSavedPerMonth * inputs.hourlyRate;
    const annualSavings = monthlySavings * 12;
    const paybackMonths =
      monthlySavings > 0 ? setupCost / monthlySavings : Number.POSITIVE_INFINITY;
    const roiPercent =
      setupCost > 0 ? ((annualSavings - setupCost) / setupCost) * 100 : 0;

    return {
      automatedHoursPerWeek,
      hoursSavedPerMonth,
      monthlySavings,
      annualSavings,
      paybackMonths,
      roiPercent,
    };
  }, [inputs, setupCost]);

  return { inputs, updateInput, results };
}
