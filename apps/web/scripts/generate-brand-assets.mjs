/**
 * Generates the derived brand assets from the single source logo.
 *
 *   source: public/brand/ats-logo.jpeg   (1254x1254, dark background)
 *   output: src/app/icon.png             (128x128 favicon)
 *           src/app/apple-icon.png       (180x180 Apple touch icon)
 *           src/app/opengraph-image.png  (1200x630 social card)
 *
 * The outputs are committed, so this only needs re-running when the source
 * logo changes:  node scripts/generate-brand-assets.mjs
 *
 * Rendering goes through Playwright's Chromium (already a dev dependency for
 * E2E) rather than adding an image-processing dependency for a build-time,
 * run-once task.
 */
import { chromium } from '@playwright/test';
import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

/** Progress output — `process.stdout` rather than `console` per the repo lint rules. */
const log = (message) => process.stdout.write(`${message}\n`);

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, '..');
const repoRoot = resolve(webRoot, '../..');

const SOURCE = resolve(webRoot, 'public/brand/ats-logo.jpeg');
const APP_DIR = resolve(webRoot, 'src/app');

// Brand tokens, duplicated here rather than imported: this script runs outside
// the TypeScript build. Keep in sync with packages/ui/src/tokens/colors.ts.
const CANVAS = '#020617';
const INK = '#E6EDF8';
const INK_MUTED = '#93A3BC';
const BRAND = '#3B82F6';
const ACCENT = '#22D3EE';
const VIOLET = '#7C3AED';

const logoDataUrl = `data:image/jpeg;base64,${readFileSync(SOURCE).toString('base64')}`;

/** Best-effort: embed Inter so the social card matches the site's typeface. */
function interFaces() {
  const patterns = [
    'node_modules/.pnpm/**/inter-latin-400-normal*.woff2',
    'node_modules/.pnpm/**/inter-latin-600-normal*.woff2',
  ];
  const faces = [];
  for (const [index, pattern] of patterns.entries()) {
    let match;
    try {
      [match] = globSync(pattern, { cwd: repoRoot });
    } catch {
      match = undefined;
    }
    if (!match) continue;
    const bytes = readFileSync(resolve(repoRoot, match)).toString('base64');
    faces.push(
      `@font-face{font-family:'InterEmbedded';font-style:normal;font-weight:${
        index === 0 ? 400 : 600
      };src:url(data:font/woff2;base64,${bytes}) format('woff2');}`,
    );
  }
  return faces.join('\n');
}

const fontFaces = interFaces();
const fontStack = `${fontFaces ? "'InterEmbedded'," : ''}'Segoe UI',system-ui,-apple-system,sans-serif`;

if (!fontFaces) {
  log('! Inter not found locally — social card will use the system sans stack.');
}

const browser = await chromium.launch();

/** Square icon: the source already carries ~12% padding, so use it full-bleed. */
async function renderIcon(size, outputName) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<html><body style="margin:0;background:${CANVAS}">
       <img src="${logoDataUrl}" width="${size}" height="${size}"
            style="display:block;object-fit:cover" />
     </body></html>`,
  );
  await page.locator('img').waitFor();
  const buffer = await page.screenshot({ omitBackground: false });
  writeFileSync(resolve(APP_DIR, outputName), buffer);
  await page.close();
  log(`OK ${outputName} (${size}x${size}, ${(buffer.length / 1024).toFixed(1)} KB)`);
}

/** 1200x630 social card: mark, wordmark, and the brand gradient rule. */
async function renderSocialCard() {
  const width = 1200;
  const height = 630;
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });

  await page.setContent(`<html><head><style>
    ${fontFaces}
    *{margin:0;padding:0;box-sizing:border-box}
    body{
      width:${width}px;height:${height}px;background:${CANVAS};
      font-family:${fontStack};color:${INK};overflow:hidden;position:relative;
      display:flex;align-items:center;gap:72px;padding:0 88px;
    }
    .mesh{position:absolute;inset:0;pointer-events:none}
    .mesh i{position:absolute;display:block;border-radius:9999px;filter:blur(120px)}
    .b1{width:620px;height:620px;left:-120px;top:-260px;background:${BRAND};opacity:.34}
    .b2{width:520px;height:520px;right:-140px;bottom:-240px;background:${ACCENT};opacity:.22}
    .b3{width:460px;height:460px;right:180px;top:-220px;background:${VIOLET};opacity:.22}
    .grid{
      position:absolute;inset:0;
      background-image:
        linear-gradient(to right,rgba(230,237,248,.05) 1px,transparent 1px),
        linear-gradient(to bottom,rgba(230,237,248,.05) 1px,transparent 1px);
      background-size:64px 64px;
      mask-image:radial-gradient(ellipse 80% 70% at 40% 40%,#000 10%,transparent 95%);
    }
    .rule{position:absolute;left:0;right:0;top:0;height:4px;
      background:linear-gradient(90deg,${BRAND},${ACCENT} 55%,${VIOLET})}
    .mark{position:relative;width:300px;height:300px;flex:none;border-radius:48px;
      overflow:hidden;border:1px solid rgba(230,237,248,.1)}
    .mark img{display:block;width:100%;height:100%;object-fit:cover}
    .copy{position:relative;display:flex;flex-direction:column}
    .word{font-size:132px;font-weight:600;letter-spacing:-.05em;line-height:.9}
    .name{margin-top:22px;font-size:34px;font-weight:600;letter-spacing:-.02em;line-height:1.2}
    .tag{margin-top:18px;font-size:26px;font-weight:400;color:${INK_MUTED};line-height:1.45;max-width:560px}
    .eyebrow{display:flex;align-items:center;gap:12px;margin-top:34px;
      font-size:17px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${ACCENT}}
    .dot{width:8px;height:8px;border-radius:9999px;background:${ACCENT};display:block}
  </style></head><body>
    <div class="mesh"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>
    <div class="grid"></div>
    <div class="rule"></div>
    <div class="mark"><img src="${logoDataUrl}" /></div>
    <div class="copy">
      <div class="word">ATS</div>
      <div class="name">AI Software &amp; Technology Solutions</div>
      <div class="tag">We build software that moves businesses forward.</div>
      <div class="eyebrow"><span class="dot"></span>Custom software · AI · Cloud</div>
    </div>
  </body></html>`);

  await page.locator('.mark img').waitFor();
  await page.evaluate(() => document.fonts.ready);
  const buffer = await page.screenshot();
  writeFileSync(resolve(APP_DIR, 'opengraph-image.png'), buffer);
  await page.close();
  log(`OK opengraph-image.png (${width}x${height}, ${(buffer.length / 1024).toFixed(1)} KB)`);
}

mkdirSync(APP_DIR, { recursive: true });
// 128px covers 16/32/48 tab icons plus retina and bookmark tiles. Larger PNGs
// of this gradient-heavy mark get expensive fast for an asset fetched on every
// first visit.
await renderIcon(128, 'icon.png');
await renderIcon(180, 'apple-icon.png');
await renderSocialCard();
await browser.close();
