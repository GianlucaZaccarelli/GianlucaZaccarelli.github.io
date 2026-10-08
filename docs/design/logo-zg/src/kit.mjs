// Genera il kit completo del marchio "ZG. punto in corsa".
// Uso (dalla radice del repo): node docs/design/logo-zg/src/kit.mjs
// Prima volta: python docs/design/logo-zg/src/istanze-font.py (istanze statiche dei font).
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import * as G from './geometria.mjs';
import * as H from './pagine.mjs';

export const ROOT = 'docs/design/logo-zg/kit';
export const INK = '#1C1D20';
const CARTA = '#FBF9F6';
const BASE = '#C2552D';        // terracotta: il punto in corsa
const COPERTINA = '#842C00';   // terracotta profondo: il retro di copertina del sito
const TINTA = G.mescola(BASE, '#FFFFFF', 0.25); // il punto su fondo scuro

export const p = {
  nome: 'Gianluca Zaccarelli',
  sigla: 'ZG.',
  ruolo: 'Senior Full-Stack Developer',
  host: 'gianlucazaccarelli.github.io',
  email: 'gianluca.zaccarelli.work@gmail.com',
  luogo: 'San Secondo Parmense (PR), Italia',
  slogan: 'Scrivo codice e studio le persone che lo scrivono.',
  base: BASE, copertina: COPERTINA, tinta: TINTA, carta: CARTA, ink: INK,
  chiaro: G.mescola(BASE, '#FFFFFF', 0.88),
};
p.colori = {
  base: { hex: BASE, cmyk: G.cmykIngenuo(BASE), pantone: 'PANTONE 7592 C' },
  copertina: { hex: COPERTINA, cmyk: G.cmykIngenuo(COPERTINA), pantone: 'PANTONE 7600 C' },
  tinta: { hex: TINTA, cmyk: G.cmykIngenuo(TINTA) },
  chiaro: { hex: p.chiaro, cmyk: G.cmykIngenuo(p.chiaro) },
  ink: { hex: INK, cmyk: G.cmykIngenuo(INK) },
  carta: { hex: CARTA, cmyk: G.cmykIngenuo(CARTA) },
  nero: { hex: '#000000', cmyk: [0, 0, 0, 100] },
  bianco: { hex: '#FFFFFF', cmyk: [0, 0, 0, 0] },
  grigioTesto: { hex: '#6B6F76', cmyk: [0, 0, 0, 62] },
};

// ── Mattoni ──────────────────────────────────────────────────────────────────
// varianti di colore: corpo (Z e G), punto, testo (nome), ruolo (riga mono)
export const VARIANTI = {
  colore: { corpo: 'ink', punto: 'base', testo: 'ink', ruolo: 'grigioTesto' },
  nero: { corpo: 'nero', punto: 'nero', testo: 'nero', ruolo: 'nero' },
  bianco: { corpo: 'bianco', punto: 'bianco', testo: 'bianco', ruolo: 'bianco' },
  scuro: { corpo: 'carta', punto: 'tinta', testo: 'carta', ruolo: 'carta' },
};
export const simbolo = (v = VARIANTI.colore, opz = {}, m = null) => G.segno(v.corpo, v.punto, opz, m);

export function bbox(items) {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  const add = (x, y, m) => {
    const [a, b, c, d, e, f] = m || [1, 0, 0, 1, 0, 0];
    const X = a * x + c * y + e, Y = b * x + d * y + f;
    x0 = Math.min(x0, X); y0 = Math.min(y0, Y); x1 = Math.max(x1, X); y1 = Math.max(y1, Y);
  };
  for (const it of items)
    for (const [k, ...a] of it.d) {
      if (k === 'A') { add(a[0] - a[2], a[1] - a[2], it.m); add(a[0] + a[2], a[1] + a[2], it.m); add(a[0] - a[2], a[1] + a[2], it.m); add(a[0] + a[2], a[1] - a[2], it.m); }
      else for (let i = 0; i + 1 < a.length; i += 2) add(a[i], a[i + 1], it.m);
    }
  return [x0, y0, x1 - x0, y1 - y0];
}
export const vbDi = (items, pad = 0) => { const [x, y, w, h] = bbox(items); return [x - pad, y - pad, w + 2 * pad, h + 2 * pad]; };

// Il segno messo in un riquadro: centrato sul suo ingombro, largo `lato * s`
export function simboloIn(v, cx, cy, larghezza, opz = {}) {
  const base = simbolo(v, opz);
  const [x, y, w, h] = bbox(base);
  const s = larghezza / w;
  return G.conMatrice(base, [s, 0, 0, s, cx - (x + w / 2) * s, cy - (y + h / 2) * s]);
}

// Lockup. Il segno sta sulla griglia 320 x 256 (linea di base y = bot = 206.5).
// Orizzontale: nome in Fraunces (maiuscole 66) con la base all'altezza della barra
// della G, ruolo in JetBrains Mono (maiuscole 19) allineato alla base del segno.
const GEO = G.geometria();
export function lockup(tipo, v = VARIANTI.colore) {
  const seg = simbolo(v);
  const [sx, , sw] = bbox(seg);
  if (tipo === 'orizzontale') {
    const x = sx + sw + 46;
    const nome = G.testo([[p.nome, 'serif']], { x, base: GEO.CY + 32, cap: 66, colore: v.testo, tracking: -18 });
    const ruolo = G.testo([[p.ruolo.toUpperCase(), 'mono']], { x: x + 3, base: GEO.bot, cap: 19, colore: v.ruolo, tracking: 160 });
    return [...seg, ...nome.items, ...ruolo.items];
  }
  if (tipo === 'verticale') {
    const cx = sx + sw / 2;
    const wn = G.larghezzaTesto([[p.nome, 'serif']], 46, -18);
    const wr = G.larghezzaTesto([[p.ruolo.toUpperCase(), 'mono']], 14, 160);
    return [
      ...seg,
      ...G.testo([[p.nome, 'serif']], { x: cx - wn / 2, base: GEO.bot + 92, cap: 46, colore: v.testo, tracking: -18 }).items,
      ...G.testo([[p.ruolo.toUpperCase(), 'mono']], { x: cx - wr / 2, base: GEO.bot + 136, cap: 14, colore: v.ruolo, tracking: 160 }).items,
    ];
  }
  if (tipo === 'wordmark') {
    const nome = G.testo([[p.nome, 'serif']], { x: 0, base: 66, cap: 66, colore: v.testo, tracking: -18 });
    const ruolo = G.testo([[p.ruolo.toUpperCase(), 'mono']], { x: 3, base: 66 + 52, cap: 19, colore: v.ruolo, tracking: 160 });
    return [...nome.items, ...ruolo.items];
  }
  return seg;
}

// ── Uscita ───────────────────────────────────────────────────────────────────
const lavori = [];
export function scrivi(file, dati) { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, dati); }
export function esporta(file, items, { vb, sfondo = null, png = null, titolo = `${p.nome} — ZG.` } = {}) {
  vb = vb || vbDi(items);
  const [x, y, w, h] = vb;
  const s = G.svg(items, { vb: `${x} ${y} ${w} ${h}`, colori: p.colori, titolo, sfondo });
  if (file.endsWith('.svg')) scrivi(file, s);
  if (png) {
    const [pw, ph] = typeof png === 'number' ? [png, Math.round((png * h) / w)] : png;
    lavori.push({ html: paginaSvg(s, pw, ph), w: pw, h: ph, out: file.replace(/\.svg$/, '') + (file.endsWith('.svg') ? '.png' : ''), trasparente: !sfondo });
  }
  return s;
}
const paginaSvg = (s, w, h) =>
  `<!doctype html><html><body style="margin:0;background:transparent">${s.replace('<svg ', `<svg width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" `)}</body></html>`;
export const pngDa = (html, w, h, out, opz = {}) => lavori.push({ html, w, h, out, trasparente: false, ...opz });

// ── app/ ─────────────────────────────────────────────────────────────────────
// Icone e favicon. Il segno e' largo: in un quadrato occupa il 72% della larghezza.
const Q = [0, 0, 512, 512];
export const tessera = (fondo, v, { r = 0, s = 0.72, opz = {} } = {}) =>
  [G.item([G.rettangolo(0, 0, 512, 512, r)], fondo), ...simboloIn(v, 256, 262, 512 * s, opz)];
const SU_INK = { corpo: 'carta', punto: 'base', testo: 'carta', ruolo: 'carta' };
const SU_COPERTINA = { corpo: 'carta', punto: 'carta', testo: 'carta', ruolo: 'carta' };

function app() {
  const d = `${ROOT}/app`;
  const icona = simbolo();
  esporta(`${d}/logo-icon.svg`, icona, { vb: vbDi(icona, 8), png: 1024 });
  esporta(`${d}/logo-icon-mono.svg`, simbolo(VARIANTI.nero), { vb: vbDi(icona, 8), png: 1024 });
  const piccolo = simbolo(VARIANTI.colore, G.PICCOLO);
  esporta(`${d}/logo-icon-small.svg`, piccolo, { vb: vbDi(piccolo, 8), png: 256 });
  esporta(`${d}/logo-icon-tile.svg`, tessera('ink', SU_INK, { r: 112 }), { vb: Q, png: 1024 });
  esporta(`${d}/logo-icon-tile-chiaro.svg`, tessera('carta', VARIANTI.colore, { r: 112 }), { vb: Q, png: 1024 });
  esporta(`${d}/logo-icon-tile-copertina.svg`, tessera('copertina', SU_COPERTINA, { r: 112 }), { vb: Q, png: 1024 });
  esporta(`${d}/logo-wordmark.svg`, lockup('orizzontale'), { png: 2000 });
  esporta(`${d}/logo-wordmark-dark.svg`, lockup('orizzontale', VARIANTI.scuro), { png: 2000 });
  // favicon: tessera inchiostro; sotto i 64 px il taglio piccolo, piu' grande nel riquadro
  for (const z of [16, 32, 48, 64])
    esporta(`${d}/favicon-${z}x${z}.png`, tessera('ink', SU_INK, { r: 96, s: z <= 32 ? 0.86 : 0.78, opz: G.PICCOLO }), { vb: Q, sfondo: null, png: [z, z] });
  esporta(`${d}/favicon-512.png`, tessera('ink', SU_INK, { r: 112 }), { vb: Q, png: [512, 512] });
  esporta(`${d}/favicon.svg`, tessera('ink', SU_INK, { r: 96, s: 0.86, opz: G.PICCOLO }), { vb: Q });
  // apple-touch e PWA: al vivo (iOS arrotonda da se'), la maschera nel cerchio sicuro (40%)
  esporta(`${d}/apple-touch-icon.png`, tessera('ink', SU_INK), { vb: Q, sfondo: 'ink', png: [180, 180] });
  esporta(`${d}/icon-192.png`, tessera('ink', SU_INK), { vb: Q, sfondo: 'ink', png: [192, 192] });
  esporta(`${d}/icon-512.png`, tessera('ink', SU_INK), { vb: Q, sfondo: 'ink', png: [512, 512] });
  esporta(`${d}/icon-maskable-512.png`, tessera('ink', SU_INK, { s: 0.6 }), { vb: Q, sfondo: 'ink', png: [512, 512] });
  scrivi(`${d}/site.webmanifest`, JSON.stringify({
    name: p.nome, short_name: 'ZG.', start_url: '/', display: 'standalone', background_color: CARTA, theme_color: INK,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }, null, 2) + '\n');
}
// favicon.ico (16 + 32 + 48) con i PNG incorporati, dopo la rasterizzazione
function favicon() {
  const d = `${ROOT}/app`;
  const pngs = [16, 32, 48].map((z) => [z, readFileSync(`${d}/favicon-${z}x${z}.png`)]);
  const testa = Buffer.alloc(6); testa.writeUInt16LE(0, 0); testa.writeUInt16LE(1, 2); testa.writeUInt16LE(pngs.length, 4);
  let off = 6 + 16 * pngs.length;
  const voci = pngs.map(([z, b]) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(z, 0); e.writeUInt8(z, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(off, 12);
    off += b.length; return e;
  });
  scrivi(`${d}/favicon.ico`, Buffer.concat([testa, ...voci, ...pngs.map(([, b]) => b)]));
}

// ── lockup/ ──────────────────────────────────────────────────────────────────
function lockups() {
  for (const tipo of ['orizzontale', 'verticale', 'wordmark', 'icona'])
    for (const [nome, v] of Object.entries(VARIANTI)) {
      const items = lockup(tipo, v);
      esporta(`${ROOT}/lockup/${tipo}-${nome}.svg`, items, { vb: vbDi(items, tipo === 'icona' ? 8 : 0), png: tipo === 'icona' ? 1024 : 2000 });
    }
}

// ── email/ (solo PNG) ────────────────────────────────────────────────────────
function email() {
  const d = `${ROOT}/email`;
  const header = (fondo, v) => {
    const l = lockup('orizzontale', v);
    const [x, y, w, h] = vbDi(l);
    const s = 100 / h;
    return [G.item([G.rettangolo(0, 0, 1200, 240)], fondo), ...G.conMatrice(l, [s, 0, 0, s, 600 - (w * s) / 2 - x * s, 120 - (h * s) / 2 - y * s])];
  };
  esporta(`${d}/header-600-chiaro@2x.png`, header('carta', VARIANTI.colore), { vb: [0, 0, 1200, 240], sfondo: 'carta', png: [1200, 240] });
  esporta(`${d}/header-600-scuro@2x.png`, header('ink', VARIANTI.scuro), { vb: [0, 0, 1200, 240], sfondo: 'ink', png: [1200, 240] });
  const firma = lockup('orizzontale');
  esporta(`${d}/firma-300@2x.png`, firma, { vb: vbDi(firma, 24), sfondo: 'bianco', png: 600 });
  for (const [nome, fondo, v] of [['chiaro', 'carta', VARIANTI.colore], ['scuro', 'ink', SU_INK]])
    for (const z of [96, 192])
      esporta(`${d}/icona-${z}-${nome}.png`, tessera(fondo, v), { vb: Q, sfondo: fondo, png: [z, z] });
}

// ── pattern/ ─────────────────────────────────────────────────────────────────
// Trama: punti in corsa su file sfalsate, tutti nella stessa direzione.
// Tile 480 x 240: si ripete senza cuciture (le file sfalsate di meta' tile).
export function trama(colore, opacita) {
  const cometa = (cx, cy) => {
    const r = 9, coda = 46;
    return [
      G.item([['M', cx, cy - r], ['L', cx, cy + r], ['L', cx - coda, cy + 1], ['L', cx - coda, cy - 1], ['Z']], colore, null, { opacita }),
      G.item(G.cerchio(cx, cy, r), colore, null, { opacita }),
    ];
  };
  const out = [];
  for (const [x, y] of [[90, 60], [330, 60], [210, 180], [450, 180], [-30, 180]]) out.push(...cometa(x, y));
  return out;
}
function pattern() {
  const d = `${ROOT}/pattern`;
  const varianti = [['chiara', 'carta', 'base', 0.22], ['scura', 'ink', 'tinta', 0.28], ['colore', 'copertina', 'carta', 0.22]];
  for (const [v, fondo, col, op] of varianti) {
    const s = esporta(`${d}/trama-tile-${v}.svg`, trama(col, op), { vb: [0, 0, 480, 240], sfondo: fondo });
    pngDa(H.trama(s), 2400, 1200, `${d}/trama-${v}-2400x1200.png`);
  }
}

// ── stampa/ (PDF CMYK e Pantone, tutto in tracciati) ─────────────────────────
function pdfDa(file, items, { vb, mm, modo = 'cmyk', abbondanza = 0 }) {
  const [x, y, w, h] = vb || vbDi(items);
  const scena = G.conMatrice(items, [1, 0, 0, 1, -x, -y]);
  scrivi(file, G.pdf(scena, { w, h, mm: mm || [80, (80 * h) / w], colori: p.colori, modo, abbondanza, titolo: `${p.nome} - ${file.split('/').pop()}` }));
}
function stampa() {
  const d = `${ROOT}/stampa`;
  for (const tipo of ['orizzontale', 'verticale', 'icona']) {
    const items = lockup(tipo);
    const vb = vbDi(items);
    const mm = tipo === 'orizzontale' ? [90, (90 * vb[3]) / vb[2]] : [45, (45 * vb[3]) / vb[2]];
    for (const modo of ['cmyk', 'pantone']) pdfDa(`${d}/logo-${tipo}-${modo}.pdf`, items, { vb, mm, modo });
    pdfDa(`${d}/logo-${tipo}-nero.pdf`, lockup(tipo, VARIANTI.nero), { vb, mm });
  }
  // biglietto 85 x 55 mm + 3 mm di abbondanza: scena in decimi di mm
  const B = [910, 610];
  const fronte = [G.item([G.rettangolo(0, 0, ...B)], 'copertina'), ...simboloIn(SU_COPERTINA, 455, 305, 380)];
  const lr = lockup('orizzontale');
  const [lx, ly, lw, lh] = vbDi(lr);
  const sL = 64 / lh; // lockup alto 6,4 mm
  const t = (s, f, cap, y, col = 'ink', tracking = 0) => G.testo([[s, f]], { x: 90, base: y, cap, colore: col, tracking }).items;
  const retro = [
    G.item([G.rettangolo(0, 0, ...B)], 'carta'),
    ...G.conMatrice(lr, [sL, 0, 0, sL, 90 - lx * sL, 100 - ly * sL]),
    ...t(p.email, 'sans', 19, 430), ...t(p.host, 'sans', 19, 466, 'base'), ...t(p.luogo, 'sans', 19, 502, 'grigioTesto'),
  ];
  for (const [nome, items] of [['fronte', fronte], ['retro', retro]]) {
    pdfDa(`${d}/biglietto-${nome}.pdf`, items, { vb: [0, 0, ...B], mm: [91, 61], abbondanza: 3 });
    esporta(`${d}/biglietto-${nome}.svg`, items, { vb: [0, 0, ...B], png: 1365 });
  }
  // carta intestata A4, in decimi di mm
  const A4 = [2100, 2970];
  const sC = 120 / lh; // lockup alto 12 mm
  const piede = `${p.nome} · ${p.ruolo} · ${p.luogo} · ${p.email} · ${p.host}`;
  const carta = [
    G.item([G.rettangolo(0, 0, ...A4)], 'bianco'),
    ...G.conMatrice(lr, [sC, 0, 0, sC, 200 - lx * sC, 200 - ly * sC]),
    G.item([G.rettangolo(200, 2760, 1700, 4)], 'base'),
    ...G.testo([[piede, 'sans']], { x: 200, base: 2830, cap: 22, colore: 'grigioTesto' }).items,
  ];
  pdfDa(`${d}/carta-intestata-a4.pdf`, carta, { vb: [0, 0, ...A4], mm: [210, 297] });
  esporta(`${d}/carta-intestata-a4.svg`, carta, { vb: [0, 0, ...A4], png: 1240 });
  scrivi(`${d}/colori.md`, H.coloriMd());
}

// ── Rasterizzazione ──────────────────────────────────────────────────────────
async function rasterizza(pdfs) {
  // il Chromium di Playwright se c'e', altrimenti il Chrome installato
  const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
  const page = await browser.newPage();
  for (const j of lavori) {
    await page.setViewportSize({ width: j.w, height: j.h });
    await page.setContent(j.html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const buf = await page.screenshot({ omitBackground: j.trasparente, clip: { x: 0, y: 0, width: j.w, height: j.h } });
    scrivi(j.out, buf);
  }
  for (const j of pdfs) {
    await page.goto(pathToFileURL(resolve(j.file)).href, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    scrivi(j.out, await page.pdf({ printBackground: true, preferCSSPageSize: true }));
  }
  await browser.close();
}

// ── Main ─────────────────────────────────────────────────────────────────────
const pdfHtml = [];
rmSync(ROOT, { recursive: true, force: true });
app(); lockups(); email(); pattern(); stampa();
H.social({ pngDa });
H.documenti({ pngDa, scrivi, pdfHtml, esporta });
H.mockup({ pngDa });
H.lineeGuida({ scrivi, pdfHtml });
H.sorgente({ scrivi });
console.log(`${lavori.length} PNG, ${pdfHtml.length} PDF da HTML: rasterizzo...`);
await rasterizza(pdfHtml);
favicon();
console.log('fatto');
