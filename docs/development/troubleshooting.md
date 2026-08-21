# Troubleshooting

| Symptom                                | Likely cause                                  | Fix                                                                                                    |
| -------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `pnpm dev` fails                       | Dependencies are missing or stale             | Run `pnpm install`, then restart the dev server                                                        |
| Fonts flash or look synthetic          | A new font weight is not declared             | Add the weight to `next/font` in `apps/web/src/app/layout.tsx`; do not use browser-synthesized weights |
| Contact form says it is not configured | Hosted endpoint is empty                      | Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in `apps/web/.env.local` or the hosting provider               |
| Horizontal overflow                    | A new fixed-width visual exceeds the viewport | Check at 375px and use grid/flex constraints rather than fixed content widths                          |
| Animation feels slow                   | A continuous filter/scroll effect was added   | Prefer the existing reveal primitives; keep effects transform/opacity-only                             |
| Lint/format conflicts                  | Editor is not using workspace config          | Run `pnpm lint` and `pnpm format` from the repository root                                             |
