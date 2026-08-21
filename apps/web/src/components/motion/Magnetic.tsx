'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { springSoft } from '../../lib/motion';

interface MagneticProps {
  children: ReactNode;
  /** Maximum pull in pixels. Keep small — this should feel like weight. */
  strength?: number;
  className?: string;
}

/**
 * Gives a control a slight magnetic pull toward the cursor. Transform-only,
 * spring-damped, and disabled entirely under prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 10, className }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springSoft);
  const y = useSpring(rawY, springSoft);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rawX.set(Math.max(-1, Math.min(1, offsetX)) * strength);
    rawY.set(Math.max(-1, Math.min(1, offsetY)) * strength);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  );
}
