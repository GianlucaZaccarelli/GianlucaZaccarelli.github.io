/**
 * generate-pdf.mjs
 * Genera public/cv.pdf dalla pagina /cv-print usando Puppeteer.
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
const OUT  = resolve(__dirname, '../public/cv.pdf');
const PORT = 4399;

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

// Minimal static file server for dist/
const server = createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  let filePath = join(DIST, urlPath);
  if (existsSync(filePath) && (await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html');
  if (!existsSync(filePath)) filePath = join(DIST, urlPath + '.html');
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
    await page.goto(`http://localhost:${PORT}/cv-print`, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: OUT,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    console.log(`✅  PDF generato: ${OUT}`);
  } finally {
    await browser.close();
    server.close();
  }
});
