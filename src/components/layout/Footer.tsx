import siteData from '../../data/siteData';
import { BookingButton } from '../booking/BookingButton';
import { useBooking } from '../booking/BookingProvider';
import { Container } from '../ui/Container';

export function Footer() {
  const { footer, primaryCta, booking } = siteData;
  const { openBooking } = useBooking();

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/10 bg-graphite/40"
    >
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="font-display text-lg font-bold tracking-tight text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              oclave<span className="text-signal">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
              {footer.tagline}
            </p>
            <div className="mt-8">
              <BookingButton size="lg">{primaryCta.label}</BookingButton>
            </div>
            <p className="mt-3 text-xs text-ash">
              {booking.fallback.prompt} {booking.fallback.email}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-display text-sm font-semibold tracking-tight text-bone">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.booking ? (
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={openBooking}
                          className="text-sm text-ash transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href ?? '#'}
                          {...(link.external
                            ? { target: '_blank', rel: 'noreferrer' }
                            : {})}
                          className="text-sm text-ash transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ash">{footer.copyright}</p>
          <div className="flex items-center gap-2">
            {footer.socials.map((social) => {
              const Icon = social.icon;
              const isExternal = social.href.startsWith('http');

              return (
                <a
                  key={social.platform}
                  href={social.href}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                  aria-label={social.platform}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-ash transition-colors hover:border-white/20 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
