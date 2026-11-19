import type { LucideIcon } from 'lucide-react';

export type BentoSpan = 'sm' | 'md' | 'lg' | 'wide';

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  span: BentoSpan;
  flow?: string[];
}
