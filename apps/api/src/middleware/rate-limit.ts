import rateLimit from 'express-rate-limit';

/**
 * Standard rate limiter for public write endpoints (e.g. contact form).
 * Tune windowMs/max per-endpoint if a specific route needs different
 * limits — do not disable rate limiting to "make something work".
 */
export const standardRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later.' },
  },
});
