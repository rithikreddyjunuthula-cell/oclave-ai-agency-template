import { useCallback, useState } from 'react';

export type BillingPeriod = 'monthly' | 'annual';

export interface PricingToggleState {
  billing: BillingPeriod;
  setBilling: (billing: BillingPeriod) => void;
  toggleBilling: () => void;
}

export function usePricingToggle(
  initial: BillingPeriod = 'monthly',
): PricingToggleState {
  const [billing, setBilling] = useState<BillingPeriod>(initial);

  const toggleBilling = useCallback(() => {
    setBilling((previous) => (previous === 'monthly' ? 'annual' : 'monthly'));
  }, []);

  return { billing, setBilling, toggleBilling };
}
