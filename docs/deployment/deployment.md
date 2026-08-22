# Deployment

1. A pull request must pass typecheck and build.
2. Merge to `main` triggers GitHub Actions CI.
3. Build command: `npm run build` (outputs static files to `dist/`).
4. Can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

There are no database migrations, API deployment steps, Docker services, or backend runtime secrets.
