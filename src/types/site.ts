import type { BookingContent } from './booking';
import type { Capability } from './capability';
import type { CaseStudyContent } from './caseStudy';
import type { FaqContent } from './faq';
import type { FooterContent } from './footer';
import type { HeroContent } from './hero';
import type { NavLink } from './navigation';
import type { PricingContent } from './pricing';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  nav: NavLink[];
  primaryCta: {
    label: string;
  };
  booking: BookingContent;
  hero: HeroContent;
  capabilities: Capability[];
  caseStudy: CaseStudyContent;
  pricing: PricingContent;
  faq: FaqContent;
  footer: FooterContent;
}
