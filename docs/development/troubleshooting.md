# Troubleshooting

| Symptom                       | Likely cause                                  | Fix                                                                                 |
| ----------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run dev` fails           | Dependencies are missing or stale             | Run `npm install`, then restart the dev server (`npm run dev`)                      |
| Port 3000 is in use           | Previous dev process is still running         | Run `taskkill /F /IM node.exe` (Windows) or let Vite choose port 3001               |
| Fonts flash or look synthetic | Font weight or family not declared            | Ensure weights are in `index.html` and Tailwind fonts are mapped to Inter/Mono      |
| Horizontal overflow           | A new fixed-width visual exceeds the viewport | Check at 375px and use grid/flex constraints rather than fixed content widths       |
| Animation feels slow          | A continuous filter/scroll effect was added   | Prefer the existing reveal primitives; keep effects transform/opacity-only          |
