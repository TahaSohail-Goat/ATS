# Testing Strategy

## Unit tests

Vitest covers deterministic utilities and UI behaviour that benefits from a
DOM test. Keep tests next to the code they test.

## Browser tests

Playwright covers:

- all public routes and metadata endpoints;
- contact form visibility, labels, and keyboard usability;
- mobile navigation and theme persistence;
- no horizontal overflow at 375px, 768px, and 1440px;
- logo, favicon, Apple touch icon, and Open Graph asset delivery;
- absence of page errors and console errors during route traversal.

The contact form uses a hosted endpoint only in deployment; browser tests do
not submit real visitor data.

## Required checks

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```
