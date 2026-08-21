import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

const field = cn(
  'w-full rounded-xl border bg-ats-surface-raised/70 px-4 text-sm text-ats-ink',
  'placeholder:text-ats-ink-muted',
  'transition-[border-color,box-shadow,background-color] duration-200 ease-out',
  'focus:border-ats-brand/60 focus:bg-ats-surface focus:outline-none',
  'focus:shadow-[0_0_0_4px_rgb(var(--ats-brand)/0.14)]',
  'disabled:cursor-not-allowed disabled:opacity-60',
);

const invalidField = cn(
  'border-ats-error/60 focus:border-ats-error',
  'focus:shadow-[0_0_0_4px_rgb(var(--ats-error)/0.14)]',
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/** Text input primitive. Pair with a `<label>` at the call site. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid = false, className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(field, 'h-12', invalid ? invalidField : 'border-ats-line', className)}
      {...props}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line input primitive. Pair with a `<label>` at the call site. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, className = '', ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(field, 'py-3.5', invalid ? invalidField : 'border-ats-line', className)}
      {...props}
    />
  );
});
