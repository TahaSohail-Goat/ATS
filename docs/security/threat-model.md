# Threat Model

| Threat                        | Current mitigation                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| Contact-form spam             | Hosted provider controls; endpoint stays optional until configured                   |
| Malicious form values         | Native browser constraints, provider validation, React does not render input as HTML |
| Secret leakage                | No private runtime secrets in the frontend; deployment configuration is external     |
| Supply-chain risk             | Minimal dependencies, lockfile, CI install/lint/typecheck/test/build                 |
| Client-side performance abuse | No global scroll listeners, per-card pointer handlers, or continuous grain repaints  |
| Broken accessibility          | Semantic labels, visible focus states, reduced-motion fallbacks, browser tests       |

Future API/database/authentication work requires a new threat-model review.
