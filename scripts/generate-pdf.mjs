/**
 * generate-pdf.mjs
 * Genera public/cv.pdf (/cv-print) e public/cv-en.pdf (/cv-print-en) usando Puppeteer.
 * Uso: node scripts/generate-pdf.mjs
 * Prerequisito: npm run build deve essere già stato eseguito.
 */

import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = resolve(__dirname, '../dist');
const PORT = 4399;

const TARGETS = [
  {
    path: '/cv-print',
    out: resolve(__dirname, '../public/cv.pdf'),
    dateLocale: 'it-IT',
    footer: (date) => `Gianluca Zaccarelli — Curriculum Vitae · aggiornato a ${date}`,
    page: 'pagina',
    of: 'di',
  },
  {
    path: '/cv-print-en',
    out: resolve(__dirname, '../public/cv-en.pdf'),
    dateLocale: 'en-GB',
    footer: (date) => `Gianluca Zaccarelli — Curriculum Vitae · updated ${date}`,
    page: 'page',
    of: 'of',
  },
];

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

if (!existsSync(DIST)) {
  console.error('❌  dist/ non trovata. Esegui prima: npm run build');
  process.exit(1);
}

// Minimal static file server for dist/ (with path-traversal guard)
const server = createServer(async (req, res) => {
  let urlPath = (req.url ?? '/').split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const candidate = resolve(DIST, '.' + urlPath);
  if (!candidate.startsWith(DIST)) { res.writeHead(403); res.end('Forbidden'); return; }

  let filePath = candidate;
  if (existsSync(filePath) && (await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html');
  if (!existsSync(filePath)) filePath = candidate + '.html';
  if (!existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }

  const ext  = extname(filePath);
  const mime = MIME[ext] ?? 'application/octet-stream';
  const data = await readFile(filePath);
  res.writeHead(200, { 'Content-Type': mime });
  res.end(data);
});

server.listen(PORT, async () => {
  console.log(`🌐  Server locale su http://localhost:${PORT}`);
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    for (const target of TARGETS) {
      await page.goto(`http://localhost:${PORT}${target.path}`, { waitUntil: 'networkidle0' });
      // I font variable (Fraunces/Inter) devono essere renderizzati prima della stampa
      await page.evaluateHandle('document.fonts.ready');

      const updatedAt = new Intl.DateTimeFormat(target.dateLocale, {
        month: 'long',
        year: 'numeric',
      }).format(new Date());

      const footerTemplate = `
        <div style="width:100%; padding:0 16mm; font-family:Helvetica,Arial,sans-serif; font-size:6.5px; color:#9a9a9a; display:flex; justify-content:space-between; align-items:center;">
          <span>${target.footer(updatedAt)}</span>
          <span>${target.page} <span class="pageNumber"></span> ${target.of} <span class="totalPages"></span></span>
        </div>`;

      await page.pdf({
        path: target.out,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate,
        margin: { top: '13mm', right: '0', bottom: '16mm', left: '0' },
      });

      console.log(`✅  PDF generato: ${target.out}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
});
