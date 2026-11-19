import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  title: string;
  description?: string;
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <h2
        id={id}
        className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ash sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
