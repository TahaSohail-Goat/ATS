'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { easeOut } from '../../lib/motion';

interface CounterProps {
  value: number;
  /** Decimal places to render. */
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
 * Counts up to `value` when scrolled into view.
 *
 * The final value is rendered on the server, so the number is correct without
 * JavaScript, for screen readers, and under prefers-reduced-motion. The
 * animation writes to `textContent` directly rather than through state, so a
 * ~1.4s count-up costs zero React re-renders.
 */
export function Counter({ value, decimals = 0, prefix, suffix, className }: CounterProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion || !inView) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: easeOut,
      onUpdate: (latest) => {
        node.textContent = format(latest, decimals);
      },
    });

    return () => controls.stop();
  }, [inView, value, decimals, reduceMotion]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} className="tabular-nums">
        {format(value, decimals)}
      </span>
      {suffix}
    </span>
  );
}
