import type { LucideIcon } from 'lucide-react';

export interface FooterLink {
  label: string;
  href?: string;
  external?: boolean;
  booking?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: LucideIcon;
}

export interface FooterContent {
  brand: string;
  tagline: string;
  columns: FooterColumn[];
  socials: SocialLink[];
  copyright: string;
}
