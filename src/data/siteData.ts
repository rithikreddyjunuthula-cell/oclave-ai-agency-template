import {
  AtSign,
  Bot,
  Briefcase,
  Code2,
  Database,
  Inbox,
  LayoutDashboard,
  Mail,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { SiteConfig } from '../types/site';

export const siteData: SiteConfig = {
  name: 'Oclave',
  description:
    'Oclave designs and ships AI automation for ops-heavy teams — measured in hours returned, not features shipped.',
  url: 'https://oclave.example',
  nav: [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Case study', href: '#case-study' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  primaryCta: {
    label: 'Book an automation audit',
  },
  booking: {
    title: 'Request an automation audit',
    description:
      'Tell us where the week goes. We will reply with a short plan, a rough ROI, and a time to walk through it.',
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name',
      },
      email: {
        label: 'Work email',
        placeholder: 'you@company.com',
      },
      bottleneck: {
        label: 'Biggest bottleneck',
        placeholder: 'Which manual loop costs your team the most time?',
      },
    },
    submitLabel: 'Request my audit',
    privacyNote: 'We only use this to reply. No newsletter, no sequence.',
    success: {
      title: 'Request received.',
      description:
        'Thanks, {name}. We will reply to {email} within one business day.',
      closeLabel: 'Close',
    },
    fallback: {
      prompt: 'Prefer email?',
      email: 'hello@oclave.studio',
      copyLabel: 'Copy email',
      copiedLabel: 'Copied',
      copyErrorLabel: 'Copy failed',
    },
    closeLabel: 'Close dialog',
  },
  hero: {
    headline: 'The work that eats your week should not need a person.',
    subheadline:
      'Oclave designs and ships AI workflows for ops-heavy teams. We clear the intake, routing, reconciliation, and reporting work, then prove the hours returned in a dashboard your CFO can read.',
    proof: '6-week average build. Fixed scope. You own everything.',
    ctas: [
      {
        label: 'Book an automation audit',
        action: 'booking',
        variant: 'primary',
      },
      {
        label: 'Run the ROI math',
        action: 'link',
        href: '#case-study',
        variant: 'secondary',
      },
    ],
    metrics: [
      { label: 'Hours returned / week', value: 42, suffix: 'h', trend: 'up' },
      { label: 'Fewer manual touchpoints', value: 68, suffix: '%', trend: 'down' },
      { label: 'Average payback', value: 6, suffix: ' weeks', trend: 'up' },
    ],
    preview: {
      title: 'Ops snapshot',
      note: 'Illustrative before and after for a 14-person operations team.',
      scenarios: [
        {
          id: 'before',
          label: 'Before',
          metrics: [
            { label: 'Manual intake', value: 312, suffix: ' /wk' },
            { label: 'First response', value: 9.4, suffix: 'h' },
            { label: 'Weekly hours', value: 76, suffix: 'h' },
          ],
        },
        {
          id: 'after',
          label: 'After',
          metrics: [
            { label: 'Manual intake', value: 38, suffix: ' /wk', trend: 'down' },
            { label: 'First response', value: 0.6, suffix: 'h', trend: 'down' },
            { label: 'Weekly hours', value: 21, suffix: 'h', trend: 'down' },
          ],
        },
      ],
    },
  },
  capabilities: [
    {
      id: 'intake',
      title: 'AI intake and routing',
      description:
        'Email, forms, portals, and chat read, classified, and sent to the right owner in seconds. Exceptions are surfaced, not buried.',
      icon: Inbox,
      span: 'lg',
      flow: ['Capture', 'Classify', 'Route', 'Log'],
    },
    {
      id: 'orchestration',
      title: 'Workflow orchestration',
      description:
        'The tools you already pay for, connected into one reliable flow. Retries, approvals, and audit trails included.',
      icon: Workflow,
      span: 'wide',
    },
    {
      id: 'agents',
      title: 'Custom AI agents',
      description:
        'Agents that draft, reconcile, and answer using your documents, tickets, and house rules.',
      icon: Bot,
      span: 'wide',
    },
    {
      id: 'interfaces',
      title: 'Decision interfaces',
      description:
        'Dashboards and internal tools that make the automated work legible to the people accountable for it.',
      icon: LayoutDashboard,
      span: 'md',
    },
    {
      id: 'retrieval',
      title: 'Retrieval and knowledge',
      description:
        'Your policies, contracts, and past tickets turned into a source of truth the whole team can query.',
      icon: Database,
      span: 'md',
    },
    {
      id: 'guardrails',
      title: 'Guardrails and evals',
      description:
        'Permissions, test sets, and human checkpoints before anything touches a customer.',
      icon: ShieldCheck,
      span: 'md',
    },
  ],
  caseStudy: {
    headline: 'How Northwind Logistics got 55 hours back every week.',
    summary:
      'A six-week build that replaced three spreadsheets, two inboxes, and a Monday status meeting with one AI intake agent and a shared source of truth.',
    client: 'Northwind Logistics',
    industry: 'Freight forwarding, 14-person ops team',
    challenge:
      'Shipment requests arrived by email, portal, and WhatsApp. Three coordinators retyped the same details into four systems, and nobody trusted the status board.',
    solution:
      'We shipped an intake agent that normalizes every request, routes exceptions to one queue, and writes to a single record. A live dashboard replaced the Monday meeting.',
    metrics: [
      { label: 'Weekly manual hours', before: 76, after: 21, unit: 'h' },
      { label: 'First response time', before: 9.4, after: 0.6, unit: 'h' },
      { label: 'Intake errors / week', before: 31, after: 2, unit: '' },
      { label: 'Cost per request', before: 14, after: 4, unit: '$', format: 'currency' },
    ],
    calculator: {
      title: 'What are those hours worth to you?',
      description:
        'Move the three levers that matter. The math updates as you go.',
      setupCost: 12000,
      setupCostLabel: 'Typical pilot build',
      defaults: {
        hoursPerWeek: 40,
        hourlyRate: 65,
        coverage: 70,
      },
      labels: {
        hoursPerWeek: 'Manual hours per week',
        hourlyRate: 'Fully loaded hourly cost',
        coverage: 'Share of work automatable',
      },
      results: {
        monthlySavings: 'Monthly savings',
        annualSavings: 'Annual savings',
        payback: 'Payback',
        roi: '12-month ROI',
      },
    },
  },
  pricing: {
    headline: 'Start with the loop that costs you most.',
    subheadline:
      'Fixed-scope engagements. No seat fees, no platform lock-in, and a working handover at the end.',
    toggle: {
      monthlyLabel: 'Monthly',
      annualLabel: 'Annual',
      annualBadge: '2 months free',
    },
    tiers: [
      {
        id: 'automate',
        name: 'Automate',
        description: 'One high-cost workflow, live in three weeks.',
        monthlyPrice: 4500,
        annualPrice: 3750,
        priceSuffix: '/mo',
        features: [
          'Workflow audit and ROI model',
          'One production workflow',
          'Up to three integrations',
          'Live dashboard for the workflow',
          '30 days of post-launch support',
        ],
        cta: {
          label: 'Scope my first workflow',
        },
      },
      {
        id: 'embed',
        name: 'Embed',
        description: 'A dedicated automation and design pod inside your team.',
        monthlyPrice: 8500,
        annualPrice: 7080,
        priceSuffix: '/mo',
        highlighted: true,
        badge: 'Most chosen',
        features: [
          'Everything in Automate',
          'Up to four live workflows',
          'Unlimited integrations',
          'Custom internal interface',
          'Biweekly evals and tuning',
          'Shared Slack channel',
        ],
        cta: {
          label: 'Book an embed call',
        },
      },
      {
        id: 'partner',
        name: 'Partner',
        description: 'Ongoing automation across the org, with a named lead.',
        monthlyPrice: 15000,
        annualPrice: 12500,
        priceSuffix: '/mo',
        features: [
          'Everything in Embed',
          'Named automation lead',
          'Design system and component library',
          'Quarterly roadmap',
          'Priority support and SLA',
        ],
        cta: {
          label: 'Talk about a partnership',
        },
      },
    ],
    footnote:
      'All plans include a working handover: repositories, prompts, runbooks, and a recorded walkthrough.',
  },
  faq: {
    headline: 'Questions, answered.',
    description:
      'The things buyers usually ask before the first call. If yours is not here, send it over.',
    items: [
      {
        question: 'What does the first engagement look like?',
        answer:
          'We start with a two-week audit of one high-cost loop. You get a costed map of the current process, a target design, and a fixed-scope build proposal. If the math does not work, we say so and you keep the audit.',
      },
      {
        question: 'Do we need clean data before we start?',
        answer:
          'No. Messy intake is usually the reason to start. We design around the data you have, add validation at the point of capture, and flag what is missing instead of silently guessing.',
      },
      {
        question: 'Which tools do you build in?',
        answer:
          'We work with your stack first: Google Workspace, Slack, Notion, Airtable, HubSpot, Linear, and most modern APIs. When a dedicated orchestration layer helps, we deploy one you can self-host and keep.',
      },
      {
        question: 'Who owns the automations when you leave?',
        answer:
          'You do. Every engagement ends with the repositories, prompts, credentials, runbooks, and a recorded walkthrough in your accounts. There is no proprietary runtime to rent back from us.',
      },
      {
        question: 'How do you measure success?',
        answer:
          'Before the build we agree on three numbers: hours returned, cycle time, and error rate. We instrument them in the workflow and report against the baseline, so the result is visible after handover.',
      },
      {
        question: 'What happens after the build?',
        answer:
          'Most teams move into a lighter monthly cadence for tuning, evals, and the next workflow. Others take the handover and run it themselves. Both are valid; the build is designed to survive either.',
      },
      {
        question: 'Can you work inside our existing design system?',
        answer:
          'Yes. For internal tools we extend your components, tokens, and type scale rather than dropping in a separate admin theme. If you do not have a system yet, we leave you with one.',
      },
      {
        question: 'How fast can we start?',
        answer:
          'We take two new builds per month. Discovery usually starts within two weeks of a signed scope, and the first workflow is live in three to six weeks depending on integrations.',
      },
    ],
  },
  footer: {
    brand: 'Oclave',
    tagline:
      'AI automation and design for teams that would rather ship than coordinate.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'AI intake and routing', href: '#capabilities' },
          { label: 'Workflow orchestration', href: '#capabilities' },
          { label: 'Custom AI agents', href: '#capabilities' },
          { label: 'Decision interfaces', href: '#capabilities' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Case study', href: '#case-study' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Contact', href: '#contact' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'hello@oclave.studio', href: 'mailto:hello@oclave.studio' },
          { label: 'Book a call', booking: true },
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com',
            external: true,
          },
          { label: 'GitHub', href: 'https://github.com', external: true },
        ],
      },
    ],
    socials: [
      {
        platform: 'LinkedIn',
        href: 'https://www.linkedin.com',
        icon: Briefcase,
      },
      {
        platform: 'GitHub',
        href: 'https://github.com',
        icon: Code2,
      },
      {
        platform: 'X',
        href: 'https://x.com',
        icon: AtSign,
      },
      {
        platform: 'Email',
        href: 'mailto:hello@oclave.studio',
        icon: Mail,
      },
    ],
    copyright: '© 2026 Oclave. All rights reserved.',
  },
};

export default siteData;
