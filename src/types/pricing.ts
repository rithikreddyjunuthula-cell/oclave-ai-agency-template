export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  priceSuffix?: string;
  features: string[];
  cta: {
    label: string;
  };
  highlighted?: boolean;
  badge?: string;
}

export interface PricingToggleContent {
  monthlyLabel: string;
  annualLabel: string;
  annualBadge: string;
}

export interface PricingContent {
  headline: string;
  subheadline: string;
  toggle: PricingToggleContent;
  tiers: PricingTier[];
  footnote?: string;
}
