import type { ElementType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, viewportOnce, easeOut, duration } from '../../lib/motion';

export interface TextPart {
  text: string;
  /** Render this run with the brand gradient. */
  gradient?: boolean;
}

interface RevealTextProps {
  parts: TextPart[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (hero headings). */
  immediate?: boolean;
}

const phraseVariants = {
  hidden: { opacity: 0, y: '0.35em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easeOut,
    },
  },
};

/**
 * Clean, synchronous heading reveal without laggy per-word delays.
 * Gradient accents render smoothly in sync with the primary text.
 */
export function RevealText({
  parts,
  as = 'h2',
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const Component = as as ElementType;

  if (reduceMotion) {
    return (
      <Component className={className}>
        {parts.map((part, index) => (
          <span key={index} className={part.gradient ? 'ast-text-gradient' : undefined}>
            {part.text}
            {index < parts.length - 1 ? ' ' : null}
          </span>
        ))}
      </Component>
    );
  }

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.h2;
  const trigger = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: viewportOnce };

  return (
    <MotionComponent
      className={className}
      variants={staggerContainer(0.08, delay)}
      initial="hidden"
      {...trigger}
    >
      {parts.map((part, index) => (
        <span key={index}>
          <span className="inline-block overflow-hidden pb-[0.14em]">
            <motion.span
              variants={phraseVariants}
              className={`inline-block ${part.gradient ? 'ast-text-gradient' : ''}`}
            >
              {part.text}
            </motion.span>
          </span>
          {index < parts.length - 1 ? ' ' : null}
        </span>
      ))}
    </MotionComponent>
  );
}
