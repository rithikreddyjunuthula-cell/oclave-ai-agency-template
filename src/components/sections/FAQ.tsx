import siteData from '../../data/siteData';
import { useAccordion } from '../../hooks/useAccordion';
import { AccordionItem } from '../ui/Accordion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export default function FAQ() {
  const { faq } = siteData;
  const { openIndex, toggle } = useAccordion(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-white/10 py-20 sm:py-24 lg:py-32"
    >
      <Container className="max-w-3xl">
        <SectionHeading title={faq.headline} description={faq.description} />

        <div className="mt-10 border-t border-white/10">
          {faq.items.map((item, index) => (
            <AccordionItem
              key={item.question}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
