import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { easeOut, duration } from '../../lib/motion';

interface CyclingWordProps {
  words: string[];
  className?: string;
  /** Milliseconds each word holds before the next fades in. */
  interval?: number;
}

const variants = {
  hidden: { opacity: 0, y: '0.35em' },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easeOut } },
  exit: { opacity: 0, y: '-0.35em', transition: { duration: duration.base, ease: easeOut } },
};

/**
 * Single word that fades out and is replaced by the next on a timer, like an
 * auto-animate transition between Figma prototype frames.
 */
export function CyclingWord({ words, className = '', interval = 2400 }: CyclingWordProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`inline-block ${className}`}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
