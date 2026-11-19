import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const triggerId = `faq-trigger-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 rounded-md py-5 text-left transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
            {question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-5 w-5 shrink-0 text-ash transition-transform duration-200 group-hover:text-bone',
              isOpen && 'rotate-180 text-signal',
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-ash">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
