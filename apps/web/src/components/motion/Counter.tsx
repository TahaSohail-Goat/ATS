interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function format(value: number, decimals: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Static data counter. Figures are content-derived, so rendering the final
 * value immediately is clearer and cheaper than a client-side count-up loop.
 */
export function Counter({ value, decimals = 0, prefix, suffix, className }: CounterProps) {
  return (
    <span className={className}>
      {prefix}
      <span className="tabular-nums">{format(value, decimals)}</span>
      {suffix}
    </span>
  );
}
