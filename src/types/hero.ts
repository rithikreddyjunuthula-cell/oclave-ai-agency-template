export interface HeroMetric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface HeroCtaBase {
  label: string;
  variant: 'primary' | 'secondary';
}

export type HeroCta =
  | (HeroCtaBase & { action: 'booking' })
  | (HeroCtaBase & { action: 'link'; href: string });

export interface HeroScenario {
  id: string;
  label: string;
  metrics: HeroMetric[];
}

export interface HeroPreview {
  title: string;
  note: string;
  scenarios: HeroScenario[];
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  proof: string;
  ctas: HeroCta[];
  metrics: HeroMetric[];
  preview: HeroPreview;
}
