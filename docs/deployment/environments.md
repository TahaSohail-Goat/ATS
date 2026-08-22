# Environments

| Environment | Purpose                                             | Deploy trigger                |
| ----------- | --------------------------------------------------- | ----------------------------- |
| Development | Local machine                                       | N/A (`npm run dev`)           |
| Production  | Live traffic                                        | Automatic on merge to `main`  |

Build artifact is static HTML/JS/CSS generated in `dist/` via `npm run build`.
