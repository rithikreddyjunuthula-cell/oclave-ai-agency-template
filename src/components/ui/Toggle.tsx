import { cn } from '../../lib/utils';

export interface ToggleOption<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

export interface ToggleProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function Toggle<T extends string>({
  options,
  value,
  onChange,
  label,
}: ToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-void',
              isActive
                ? 'bg-bone text-void'
                : 'text-ash hover:text-bone',
            )}
          >
            {option.label}
            {option.badge ? (
              <span
                className={cn(
                  'text-[11px] font-semibold',
                  isActive ? 'text-void/60' : 'text-signal',
                )}
              >
                {option.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
