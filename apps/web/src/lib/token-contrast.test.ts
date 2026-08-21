import { describe, expect, it } from 'vitest';
import { theme, type ColorScheme } from '@ats/ui';

/**
 * Guards the accessibility bar in docs/frontend/accessibility.md at the token
 * level: if someone retunes a semantic role, the pairing that role is used in
 * must still clear WCAG AA. Cheaper and more deterministic than asserting
 * rendered contrast, because every component derives from these roles.
 */

function channelLuminance(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const value = hex.replace('#', '');
  const r = channelLuminance(parseInt(value.slice(0, 2), 16));
  const g = channelLuminance(parseInt(value.slice(2, 4), 16));
  const b = channelLuminance(parseInt(value.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG AA: 4.5:1 for body text, 3:1 for large text and UI components. */
const BODY_TEXT = 4.5;
const LARGE_TEXT = 3;

const SCHEMES: ColorScheme[] = ['dark', 'light'];

describe.each(SCHEMES)('%s scheme token contrast', (scheme) => {
  const t = theme[scheme];

  const bodyPairs: [string, string, string][] = [
    ['ink on canvas', t.ink, t.canvas],
    ['ink on surface', t.ink, t.surface],
    ['ink on raised surface', t.ink, t.surfaceRaised],
    ['muted ink on canvas', t.inkMuted, t.canvas],
    ['muted ink on surface', t.inkMuted, t.surface],
    ['muted ink on raised surface', t.inkMuted, t.surfaceRaised],
    // Eyebrows, inline links, and small accent labels are body-sized.
    ['accent on canvas', t.accent, t.canvas],
    ['accent on surface', t.accent, t.surface],
    ['brand on canvas', t.brand, t.canvas],
    ['brand on surface', t.brand, t.surface],
  ];

  it.each(bodyPairs)('%s meets AA for body text', (_label, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(BODY_TEXT);
  });

  const largePairs: [string, string, string][] = [
    ['strong brand on canvas', t.brandStrong, t.canvas],
    ['strong brand on surface', t.brandStrong, t.surface],
  ];

  it.each(largePairs)('%s meets AA for large text and UI', (_label, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(LARGE_TEXT);
  });

  it('keeps primary text well clear of the minimum', () => {
    expect(contrastRatio(t.ink, t.canvas)).toBeGreaterThan(7);
  });
});
