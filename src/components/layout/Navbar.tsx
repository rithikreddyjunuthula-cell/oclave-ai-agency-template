import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import siteData from '../../data/siteData';
import { BookingButton } from '../booking/BookingButton';
import { Container } from '../ui/Container';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { nav, primaryCta } = siteData;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/75 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          onClick={() => setIsOpen(false)}
        >
          oclave<span className="text-signal">.</span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {nav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-ash transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <BookingButton size="sm">{primaryCta.label}</BookingButton>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((previous) => !previous)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-ash transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void md:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      {isOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-void/95 backdrop-blur-md md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-ash transition-colors hover:bg-white/5 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
              >
                {link.label}
              </a>
            ))}
            <BookingButton
              className="mt-2 w-full"
              onOpen={() => setIsOpen(false)}
            >
              {primaryCta.label}
            </BookingButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
