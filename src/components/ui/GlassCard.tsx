import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function GlassCard({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-white/[0.035] backdrop-blur-sm',
        className,
      )}
      {...rest}
    />
  );
}
