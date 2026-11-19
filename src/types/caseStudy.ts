export interface CaseStudyMetric {
  label: string;
  before: number;
  after: number;
  unit: string;
  format?: 'number' | 'currency' | 'percent';
}

export interface RoiDefaults {
  hoursPerWeek: number;
  hourlyRate: number;
  coverage: number;
}

export interface RoiCalculatorContent {
  title: string;
  description: string;
  setupCost: number;
  setupCostLabel: string;
  defaults: RoiDefaults;
  labels: {
    hoursPerWeek: string;
    hourlyRate: string;
    coverage: string;
  };
  results: {
    monthlySavings: string;
    annualSavings: string;
    payback: string;
    roi: string;
  };
}

export interface CaseStudyContent {
  headline: string;
  summary: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  metrics: CaseStudyMetric[];
  calculator: RoiCalculatorContent;
}
