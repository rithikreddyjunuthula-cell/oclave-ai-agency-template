import { useEffect, useRef, useState } from 'react';
import type {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, X } from 'lucide-react';
import siteData from '../../data/siteData';
import { cn } from '../../lib/utils';
import { buttonClassName } from '../ui/Button';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const inputClasses =
  'mt-2 w-full rounded-lg border border-white/10 bg-void/60 px-3.5 py-2.5 text-sm text-bone outline-none transition-colors placeholder:text-ash/50 focus:border-signal/40 focus-visible:ring-2 focus-visible:ring-signal/40';

type CopyState = 'idle' | 'copied' | 'error';

interface CopyEmailRowProps {
  email: string;
  prompt: string;
  copyLabel: string;
  copiedLabel: string;
  errorLabel: string;
  state: CopyState;
  onCopy: () => void;
}

function CopyEmailRow({
  email,
  prompt,
  copyLabel,
  copiedLabel,
  errorLabel,
  state,
  onCopy,
}: CopyEmailRowProps) {
  const label =
    state === 'copied' ? copiedLabel : state === 'error' ? errorLabel : copyLabel;
  const Icon = state === 'copied' ? Check : Copy;

  return (
    <div className="mt-5 flex flex-col gap-3 rounded-lg border border-white/10 bg-void/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs text-ash">{prompt}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-bone">
          {email}
        </p>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-bone transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
      >
        <Icon className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
        <span aria-live="polite">{label}</span>
      </button>
    </div>
  );
}

function buildSuccessMessage(
  template: string,
  name: string,
  email: string,
): string {
  return template
    .replaceAll('{name}', name.trim() || 'there')
    .replaceAll('{email}', email.trim());
}

export interface BookingModalProps {
  onClose: () => void;
}

export function BookingModal({ onClose }: BookingModalProps) {
  const { booking } = siteData;
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    bottleneck: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    nameRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isSubmitted) {
      successRef.current?.focus();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (copyState === 'idle') {
      return;
    }

    const timeout = window.setTimeout(() => setCopyState('idle'), 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copyState]);

  const handleDialogKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );

    if (!focusable || focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Connect this handler to your form endpoint, CRM, or serverless function.
    setIsSubmitted(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(booking.fallback.email);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  const copyRow = (
    <CopyEmailRow
      email={booking.fallback.email}
      prompt={booking.fallback.prompt}
      copyLabel={booking.fallback.copyLabel}
      copiedLabel={booking.fallback.copiedLabel}
      errorLabel={booking.fallback.copyErrorLabel}
      state={copyState}
      onCopy={handleCopyEmail}
    />
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-void/80 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        aria-describedby="booking-description"
        onKeyDown={handleDialogKeyDown}
        className="animate-modal-in relative max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-graphite p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={booking.closeLabel}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-md text-ash transition-colors hover:bg-white/5 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="pt-2" aria-live="polite">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-signal/30 bg-signal/10 text-signal">
              <Check className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <h2
              ref={successRef}
              id="booking-title"
              tabIndex={-1}
              className="mt-5 pr-10 font-display text-2xl font-bold tracking-tight focus:outline-none"
            >
              {booking.success.title}
            </h2>
            <p
              id="booking-description"
              className="mt-2 text-sm leading-relaxed text-ash"
            >
              {buildSuccessMessage(
                booking.success.description,
                form.name,
                form.email,
              )}
            </p>

            {copyRow}

            <button
              type="button"
              onClick={onClose}
              className={buttonClassName({
                variant: 'secondary',
                className: 'mt-5 w-full',
              })}
            >
              {booking.success.closeLabel}
            </button>
          </div>
        ) : (
          <>
            <div className="pr-10">
              <h2
                id="booking-title"
                className="font-display text-2xl font-bold tracking-tight"
              >
                {booking.title}
              </h2>
              <p
                id="booking-description"
                className="mt-2 text-sm leading-relaxed text-ash"
              >
                {booking.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="booking-name"
                  className="text-sm font-medium text-bone"
                >
                  {booking.fields.name.label}
                </label>
                <input
                  ref={nameRef}
                  id="booking-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={booking.fields.name.placeholder}
                  value={form.name}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="booking-email"
                  className="text-sm font-medium text-bone"
                >
                  {booking.fields.email.label}
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  placeholder={booking.fields.email.placeholder}
                  value={form.email}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="booking-bottleneck"
                  className="text-sm font-medium text-bone"
                >
                  {booking.fields.bottleneck.label}
                </label>
                <textarea
                  id="booking-bottleneck"
                  name="bottleneck"
                  rows={4}
                  required
                  placeholder={booking.fields.bottleneck.placeholder}
                  value={form.bottleneck}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      bottleneck: event.target.value,
                    }))
                  }
                  className={cn(inputClasses, 'resize-none')}
                />
              </div>

              <button
                type="submit"
                className={buttonClassName({ className: 'w-full' })}
              >
                {booking.submitLabel}
              </button>
            </form>

            {copyRow}

            <p className="mt-4 text-xs leading-relaxed text-ash">
              {booking.privacyNote}
            </p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
