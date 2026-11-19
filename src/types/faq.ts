export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  headline: string;
  description: string;
  items: FaqItem[];
}
