import { useCallback, useState } from 'react';

export interface AccordionState {
  openIndex: number | null;
  toggle: (index: number) => void;
}

export function useAccordion(defaultIndex: number | null = 0): AccordionState {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultIndex);

  const toggle = useCallback((index: number) => {
    setOpenIndex((previous) => (previous === index ? null : index));
  }, []);

  return { openIndex, toggle };
}
