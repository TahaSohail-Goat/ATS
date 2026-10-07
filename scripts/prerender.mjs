import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Writable } from 'node:stream';
import { createElement } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createServer } from 'vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  ssr: { resolve: { externalConditions: ['node', 'module-sync', 'import'] } },
  server: { middlewareMode: true },
});

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function setMeta(html, attribute, key, value) {
  const tag = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`);
  return html.replace(tag, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
}

function withMetadata(template, metadata) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`,
  );
  html = setMeta(html, 'name', 'description', metadata.description);
  html = setMeta(html, 'name', 'robots', metadata.noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  html = setMeta(html, 'property', 'og:site_name', 'AST Solutions');
  html = setMeta(html, 'property', 'og:title', metadata.title);
  html = setMeta(html, 'property', 'og:description', metadata.description);
  html = setMeta(html, 'property', 'og:url', metadata.canonical);
  html = setMeta(html, 'property', 'og:image', metadata.image);
  html = setMeta(html, 'name', 'twitter:title', metadata.title);
  html = setMeta(html, 'name', 'twitter:description', metadata.description);
  html = setMeta(html, 'name', 'twitter:image', metadata.image);
  return html;
}

function renderMarkup(element) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const destination = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
    });
    destination.on('error', reject);
    destination.on('finish', () => resolve(Buffer.concat(chunks).toString('utf8')));

    let renderError;
    let stream;
    stream = renderToPipeableStream(element, {
      onAllReady() {
        if (renderError) {
          reject(renderError);
          return;
        }
        stream.pipe(destination);
      },
      onShellError: reject,
      onError(error) {
        renderError = error;
      },
    });
  });
}

try {
  const [{ AppContent }, { projects }, { getSeoMetadata, SITE_ORIGIN }] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/data/projects.ts'),
    vite.ssrLoadModule('/src/lib/seo.ts'),
  ]);
  const paths = [
    '/',
    '/about',
    '/services',
    '/projects',
    ...projects.map((project) => `/projects/${project.slug}`),
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
  ];
  const template = await readFile(path.join(dist, 'index.html'), 'utf8');

  for (const route of paths) {
    const project = projects.find((item) => route === `/projects/${item.slug}`);
    const metadata = getSeoMetadata(route, project && {
      title: project.title,
      description: project.summary,
      image: project.image,
    });
    const content = await renderMarkup(
      createElement(StaticRouter, { location: route }, createElement(AppContent)),
    );
    const resourceHints = content.match(/^(?:<link\b[^>]*\/>)+/)?.[0] ?? '';
    const pageTemplate = withMetadata(template, metadata).replace(
      '</head>',
      `${resourceHints}</head>`,
    );
    const html = pageTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${content.slice(resourceHints.length)}</div>`,
    );
    const output = route === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, ...route.slice(1).split('/'), 'index.html');
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, html);
  }

  const sitemapEntries = paths
    .map((route) => `  <url><loc>${SITE_ORIGIN}${route === '/' ? '/' : route}</loc></url>`)
    .join('\n');
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapEntries,
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
  process.stdout.write(`Pre-rendered ${paths.length} routes and generated sitemap.xml\n`);
} finally {
  await vite.close();
}
