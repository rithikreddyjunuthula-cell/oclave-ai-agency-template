import type { ReactNode } from 'react';
import type { ButtonSize, ButtonVariant } from '../ui/Button';
import { buttonClassName } from '../ui/Button';
import { useBooking } from './BookingProvider';

export interface BookingButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onOpen?: () => void;
}

export function BookingButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onOpen,
}: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        openBooking();
      }}
      className={buttonClassName({ variant, size, className })}
    >
      {children}
    </button>
  );
}
