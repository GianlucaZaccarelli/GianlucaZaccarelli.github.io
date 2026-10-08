// Geometria del marchio "ZG. punto in corsa" e i due backend che la disegnano:
// SVG e PDF (CMYK o tinta piatta Pantone). Una scena e' una lista di tracciati
// con colore e matrice; la stessa scena esce identica nei due formati, quindi i
// PDF di stampa non hanno testo vivo: anche le lettere sono tracciati.
import { createRequire } from 'node:module';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// fontkit non e' una dipendenza del sito: lo si prende da un progetto vicino
// (o da una qualunque installazione indicata con FONTKIT_FROM).
const require = createRequire(process.env.FONTKIT_FROM || 'C:/git/ThePianoNet/package.json');
const fontkit = require('fontkit');

const QUI = dirname(fileURLToPath(import.meta.url));
// Istanze statiche dei font variabili del sito (src/istanze-font.py)
export const FONT_TTF = {
  serif: `${QUI}/font/fraunces-400.ttf`,
  serifSemi: `${QUI}/font/fraunces-600.ttf`,
  serifItalic: `${QUI}/font/fraunces-400-italic.ttf`,
  mono: `${QUI}/font/jetbrains-mono-500.ttf`,
  sans: `${QUI}/font/inter-400.ttf`,
  sansSemi: `${QUI}/font/inter-600.ttf`,
};
const FONTS = Object.fromEntries(Object.entries(FONT_TTF).map(([k, f]) => [k, fontkit.openSync(f)]));

const n = (v) => +(+v).toFixed(2);
const rad = (g) => (g * Math.PI) / 180;

// ── Il segno ─────────────────────────────────────────────────────────────────
// Griglia 320 x 256. Monolinea di spessore T, inclinata di SK gradi (corsivo).
// Z: barre alte T da X0 a X1, diagonale di spessore perpendicolare T; la barra
// bassa prosegue fino al fondo della G (la base scorre nella G).
// G: anello di asse R centrato in (CX, CY), terminale alto tagliato a A1 gradi,
// fianco destro chiuso a meta' altezza dove la tangente e' verticale: li' si
// appoggia la barra, il cui bordo destro prosegue il bordo esterno della pancia.
// Intreccio: la G passa sotto la diagonale della Z, con un taglio di GAP.
// Punto in corsa: un punto di raggio RP sulla linea di base con una scia
// affusolata lunga CODA; non e' inclinato (e' un punto, non una lettera).
export const P = { T: 25, GAP: 7, SK: 12, CX: 166, CY: 128, R: 66, X0: 24, X1: 132, A1: 42, RP: 15, STACCO: 38, CODA: 50, PUNTA: 1.4 };

export function geometria(o = {}) {
  const p = { ...P, ...o };
  const ro = p.R + p.T / 2, ri = p.R - p.T / 2;
  const top = p.CY - ro, bot = p.CY + ro;
  let w = p.T * 1.4, ang = 0;
  for (let i = 0; i < 40; i++) { ang = Math.atan2(bot - top - 2 * p.T, p.X1 - p.X0 - w); w = p.T / Math.sin(ang); }
  const k = Math.tan(rad(p.SK));
  return { ...p, ro, ri, top, bot, w, ang, k, corsivo: [1, 0, -k, 1, k * bot, 0] };
}

const pt = (cx, cy, r, gradi) => [cx + r * Math.cos(rad(gradi)), cy - r * Math.sin(rad(gradi))];

// Pancia della G come poligono (archi campionati ogni mezzo grado): serve per
// sottrarre la fascia dell'intreccio con un taglio vero, non con un bianco sopra.
function panciaPoligono(g) {
  const pts = [], d = g.PASSO || 0.5; // gradi tra due punti: 0,5 per la stampa, piu' largo per il web
  const n = Math.round((360 - g.A1) / d);
  for (let i = 0; i <= n; i++) pts.push(pt(g.CX, g.CY, g.ro, g.A1 + ((360 - g.A1) * i) / n));
  for (let i = n; i >= 0; i--) pts.push(pt(g.CX, g.CY, g.ri, g.A1 + ((360 - g.A1) * i) / n));
  return pts;
}
// Sutherland–Hodgman: la parte di `poli` dal lato sinistro della retta a -> b
function taglia(poli, a, b) {
  const lato = (p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const inter = (p, q) => { const t = lato(p) / (lato(p) - lato(q)); return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]; };
  const out = [];
  for (let i = 0; i < poli.length; i++) {
    const p = poli[i], q = poli[(i + 1) % poli.length];
    const lp = lato(p) >= 0, lq = lato(q) >= 0;
    if (lp) out.push(p);
    if (lp !== lq) out.push(inter(p, q));
  }
  return out;
}
const daPunti = (pts) => [['M', ...pts[0]], ...pts.slice(1).map((q) => ['L', ...q]), ['Z']];

// Il corpo (Z + G) nel sistema non inclinato; il chiamante applica g.corsivo.
export function corpo(o = {}) {
  const g = geometria(o);
  const { X0, X1, T, CX, CY, top, bot, w, ro, ri } = g;
  const Z = [[X0, top], [X1, top], [X1, top + T], [X0 + w, bot - T], [CX, bot - T], [CX, bot], [X0, bot], [X0, bot - T], [X1 - w, top + T], [X0, top + T]];
  const barra = [[CX + 4, CY - T], [CX + ro, CY - T], [CX + ro, CY], [CX + 4, CY]];
  const tracciati = [daPunti(Z), daPunti(barra)];
  if (g.GAP > 0) {
    // fascia del taglio: la diagonale allargata di GAP (perpendicolare) per lato, tra le barre
    const kn = g.GAP / Math.sin(g.ang);
    const K = [[X1 - w - kn, top + T], [X1 + kn, top + T], [X0 + w + kn, bot - T], [X0 - kn, bot - T]];
    const pancia = panciaPoligono(g);
    // pancia meno K = unione delle parti fuori da ciascun lato di K (K e' convesso)
    for (let i = 0; i < 4; i++) {
      const a = K[i], b = K[(i + 1) % 4];
      const pezzo = taglia(pancia, b, a); // lato esterno del bordo a -> b
      if (pezzo.length > 2) tracciati.push(daPunti(pezzo));
    }
  } else {
    const o1 = pt(CX, CY, ro, g.A1), i1 = pt(CX, CY, ri, g.A1);
    tracciati.push([['M', ...o1], ['A', CX, CY, ro, CX + ro, CY, 1, 0], ['L', CX + ri, CY], ['A', CX, CY, ri, ...i1, 1, 1], ['Z']]);
  }
  return { g, tracciati };
}

// Il punto in corsa (coordinate della griglia, non inclinate)
export function punto(o = {}) {
  const g = geometria(o);
  const cx = g.CX + g.ro + g.STACCO, cy = g.bot - g.RP;
  const tr = [cerchio(cx, cy, g.RP)];
  // la scia gira nello stesso verso del cerchio (orario), cosi' nell'unione non buca il punto
  if (g.CODA > 0) tr.push([['M', cx, cy - g.RP], ['L', cx, cy + g.RP], ['L', cx - g.CODA, cy + g.PUNTA], ['L', cx - g.CODA, cy - g.PUNTA], ['Z']]);
  return { cx, cy, tracciati: tr };
}

// Taglio piccolo (16–32 px): piu' spesso, niente intreccio ne' scia, punto pieno.
export const PICCOLO = { T: 34, GAP: 0, CODA: 0, RP: 19, STACCO: 30 };

// ── Primitive ────────────────────────────────────────────────────────────────
export function cerchio(cx, cy, r) {
  return [['M', cx - r, cy], ['A', cx, cy, r, cx + r, cy, 0, 1], ['A', cx, cy, r, cx - r, cy, 0, 1], ['Z']];
}
export function rettangolo(x, y, w, h, r = 0) {
  if (!r) return [['M', x, y], ['L', x + w, y], ['L', x + w, y + h], ['L', x, y + h], ['Z']];
  return [
    ['M', x + r, y], ['L', x + w - r, y], ['A', x + w - r, y + r, r, x + w, y + r, 0, 1],
    ['L', x + w, y + h - r], ['A', x + w - r, y + h - r, r, x + w - r, y + h, 0, 1],
    ['L', x + r, y + h], ['A', x + r, y + h - r, r, x, y + h - r, 0, 1],
    ['L', x, y + r], ['A', x + r, y + r, r, x + r, y, 0, 1], ['Z'],
  ];
}

// ── Testo in tracciati ───────────────────────────────────────────────────────
// segmenti: [[testo, chiaveFont], ...]; cap = altezza delle maiuscole (unita' scena).
export function testo(segmenti, { x = 0, base = 0, cap = 100, colore = 'ink', tracking = 0 } = {}) {
  const rif = FONTS[segmenti[0][1]];
  const s = cap / rif.capHeight;
  const items = [];
  let pen = 0;
  for (const [t, f] of segmenti) {
    const run = FONTS[f].layout(t);
    run.glyphs.forEach((gl, i) => {
      const cmds = gl.path.commands;
      if (cmds.length) items.push({ d: daFontkit(cmds), m: [s, 0, 0, -s, x + pen * s, base], colore });
      pen += run.positions[i].xAdvance + tracking;
    });
  }
  return { items, w: (pen - tracking) * s };
}
export const larghezzaTesto = (segmenti, cap, tracking = 0) => testo(segmenti, { cap, tracking }).w;
function daFontkit(cmds) {
  const map = { moveTo: 'M', lineTo: 'L', quadraticCurveTo: 'Q', bezierCurveTo: 'C', closePath: 'Z' };
  return cmds.map((c) => [map[c.command], ...c.args]);
}

// ── Scene ────────────────────────────────────────────────────────────────────
// item: { d: tracciato | tracciati[], m?: [a b c d e f], colore, regola?: 'evenodd', opacita? }
export const item = (tracciati, colore, m = null, extra = {}) => ({
  d: Array.isArray(tracciati[0][0]) ? tracciati.flat() : tracciati,
  colore,
  m,
  ...extra,
});
// Un item per tracciato: i pezzi si sovrappongono (Z e G, punto e scia) e non
// devono annullarsi a vicenda con versi opposti in un tracciato unico.
export const pezzi = (tracciati, colore, m = null, extra = {}) => tracciati.map((t) => item(t, colore, m, extra));

// Il segno completo: corpo inclinato + punto in corsa. opz: geometria (es. PICCOLO).
export function segno(coloreCorpo, colorePunto, opz = {}, m = null) {
  const { g, tracciati } = corpo(opz);
  const mc = m ? componi(m, g.corsivo) : g.corsivo;
  return [...pezzi(tracciati, coloreCorpo, mc), ...pezzi(punto(opz).tracciati, colorePunto, m)];
}

export function componi(m1, m2) {
  const [a, b, c, d, e, f] = m1;
  const [A, B, C, D, E, F] = m2;
  return [a * A + c * B, b * A + d * B, a * C + c * D, b * C + d * D, a * E + c * F + e, b * E + d * F + f];
}
export const conMatrice = (items, m) => items.map((it) => ({ ...it, m: it.m ? componi(m, it.m) : m }));

// ── Backend SVG ──────────────────────────────────────────────────────────────
function dSVG(d) {
  let out = '';
  let px = 0, py = 0;
  for (const c of d) {
    const [k, ...a] = c;
    if (k === 'M' || k === 'L') {
      if (k === 'L' && n(a[0]) === n(px)) out += `V${n(a[1])}`;
      else if (k === 'L' && n(a[1]) === n(py)) out += `H${n(a[0])}`;
      else out += `${k}${n(a[0])} ${n(a[1])}`;
      [px, py] = a;
    } else if (k === 'C') { out += `C${a.map(n).join(' ')}`; [px, py] = a.slice(4); }
    else if (k === 'Q') { out += `Q${a.map(n).join(' ')}`; [px, py] = a.slice(2); }
    else if (k === 'A') { const [, , r, x, y, g, o] = a; out += `A${n(r)} ${n(r)} 0 ${g} ${o} ${n(x)} ${n(y)}`; [px, py] = [x, y]; }
    else out += 'Z';
  }
  return out;
}

export function svg(scena, { vb, colori, titolo = '', sfondo = null, px = null }) {
  const col = (c) => (colori[c] ? colori[c].hex : c);
  const dim = px ? ` width="${px[0]}" height="${px[1]}"` : '';
  const [vx, vy, vw, vh] = vb.split(' ');
  let body = sfondo ? `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="${col(sfondo)}"/>` : '';
  for (const it of scena) {
    const t = it.m ? ` transform="matrix(${it.m.map((v) => +v.toFixed(5)).join(' ')})"` : '';
    const r = it.regola === 'evenodd' ? ' fill-rule="evenodd"' : '';
    const o = it.opacita != null ? ` fill-opacity="${it.opacita}"` : '';
    body += `<path fill="${col(it.colore)}"${r}${o}${t} d="${dSVG(it.d)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${dim}>${titolo ? `<title>${titolo}</title>` : ''}${body}</svg>\n`;
}

// ── Backend PDF (CMYK / Pantone) ─────────────────────────────────────────────
function dPDF(d) {
  const out = [];
  let px = 0, py = 0, sx = 0, sy = 0;
  const f = (v) => n(v).toString();
  for (const c of d) {
    const [k, ...a] = c;
    if (k === 'M') { out.push(`${f(a[0])} ${f(a[1])} m`); [px, py] = a; [sx, sy] = a; }
    else if (k === 'L') { out.push(`${f(a[0])} ${f(a[1])} l`); [px, py] = a; }
    else if (k === 'C') { out.push(`${a.map(f).join(' ')} c`); [px, py] = a.slice(4); }
    else if (k === 'Q') {
      const [qx, qy, x, y] = a;
      out.push(`${f(px + (2 / 3) * (qx - px))} ${f(py + (2 / 3) * (qy - py))} ${f(x + (2 / 3) * (qx - x))} ${f(y + (2 / 3) * (qy - y))} ${f(x)} ${f(y)} c`);
      [px, py] = [x, y];
    } else if (k === 'A') {
      const [cx, cy, r, x, y, , orario] = a;
      const a1 = Math.atan2(py - cy, px - cx);
      let dA = Math.atan2(y - cy, x - cx) - a1;
      if (orario) { while (dA <= 1e-9) dA += 2 * Math.PI; } else { while (dA >= -1e-9) dA -= 2 * Math.PI; }
      const nSeg = Math.ceil(Math.abs(dA) / (Math.PI / 2) - 1e-9);
      const passo = dA / nSeg;
      const k4 = (4 / 3) * Math.tan(passo / 4);
      for (let i = 0; i < nSeg; i++) {
        const t0 = a1 + i * passo, t1 = t0 + passo;
        const [x0, y0] = [cx + r * Math.cos(t0), cy + r * Math.sin(t0)];
        const [x3, y3] = [cx + r * Math.cos(t1), cy + r * Math.sin(t1)];
        out.push(`${f(x0 - k4 * r * Math.sin(t0))} ${f(y0 + k4 * r * Math.cos(t0))} ${f(x3 + k4 * r * Math.sin(t1))} ${f(y3 - k4 * r * Math.cos(t1))} ${f(x3)} ${f(y3)} c`);
      }
      [px, py] = [x, y];
    } else { out.push('h'); [px, py] = [sx, sy]; }
  }
  return out.join('\n');
}

export function pdf(scena, { w, h, mm, colori, modo = 'cmyk', abbondanza = 0, titolo = '' }) {
  const PT = 72 / 25.4;
  const [Wpt, Hpt] = [mm[0] * PT, mm[1] * PT];
  const s = Wpt / w;
  const spazi = {};
  const riempi = (nome) => {
    const c = colori[nome] || colori[Object.keys(colori).find((k) => colori[k].hex.toLowerCase() === String(nome).toLowerCase())];
    if (!c) throw new Error(`colore sconosciuto: ${nome}`);
    if (modo === 'pantone' && c.pantone) {
      const id = `CS${Object.keys(spazi).length}`;
      const cs = Object.entries(spazi).find(([, v]) => v.nome === c.pantone)?.[0] || id;
      if (cs === id) spazi[id] = { nome: c.pantone, cmyk: c.cmyk };
      return `/${cs} cs 1 scn`;
    }
    return `${c.cmyk.map((v) => n(v / 100)).join(' ')} k`;
  };
  let flusso = `${n(s)} 0 0 ${n(-s)} 0 ${n(Hpt)} cm\n`;
  for (const it of scena) {
    flusso += 'q\n' + (it.m ? `${it.m.map((v) => +v.toFixed(5)).join(' ')} cm\n` : '');
    flusso += `${riempi(it.colore)}\n${dPDF(it.d)}\n${it.regola === 'evenodd' ? 'f*' : 'f'}\nQ\n`;
  }
  const dati = deflateSync(Buffer.from(flusso, 'latin1'));
  const nomePdf = (t) => '/' + t.replace(/[^A-Za-z0-9]/g, (ch) => '#' + ch.charCodeAt(0).toString(16).padStart(2, '0'));
  const cs = Object.entries(spazi)
    .map(([id, v]) => `/${id} [/Separation ${nomePdf(v.nome)} /DeviceCMYK << /FunctionType 2 /Domain [0 1] /C0 [0 0 0 0] /C1 [${v.cmyk.map((x) => n(x / 100)).join(' ')}] /N 1 >>]`)
    .join(' ');
  const b = abbondanza * PT;
  const box = (d) => `[${n(d)} ${n(d)} ${n(Wpt - d)} ${n(Hpt - d)}]`;
  const oggetti = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${n(Wpt)} ${n(Hpt)}] /BleedBox ${box(0)} /TrimBox ${box(b)} /Resources << ${cs ? `/ColorSpace << ${cs} >>` : ''} >> /Contents 4 0 R >>`,
    null,
    `<< /Title (${titolo.replace(/[()\\]/g, '').replace(/[^\x20-\x7E]/g, '-')}) /Producer (ZG logo kit) >>`,
  ];
  const parti = [Buffer.from('%PDF-1.6\n%\xE2\xE3\xCF\xD3\n', 'latin1')];
  const offset = [];
  let len = parti[0].length;
  oggetti.forEach((o, i) => {
    offset.push(len);
    const testa = Buffer.from(`${i + 1} 0 obj\n`, 'latin1');
    const corpoObj = o === null
      ? Buffer.concat([Buffer.from(`<< /Length ${dati.length} /Filter /FlateDecode >>\nstream\n`, 'latin1'), dati, Buffer.from('\nendstream', 'latin1')])
      : Buffer.from(o, 'latin1');
    const coda = Buffer.from('\nendobj\n', 'latin1');
    parti.push(testa, corpoObj, coda);
    len += testa.length + corpoObj.length + coda.length;
  });
  const xref = `xref\n0 ${oggetti.length + 1}\n0000000000 65535 f \n${offset.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${oggetti.length + 1} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${len}\n%%EOF\n`;
  parti.push(Buffer.from(xref, 'latin1'));
  return Buffer.concat(parti);
}

// ── Colore ───────────────────────────────────────────────────────────────────
export const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
export const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
export const mescola = (a, b, t) => hex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t));
export function luminanza(h) {
  const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export const contrasto = (a, b) => { const [x, y] = [luminanza(a), luminanza(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
// Conversione ingenua RGB -> CMYK: punto di partenza, non un profilo colore.
export function cmykIngenuo(h) {
  const [r, g, b] = rgb(h).map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return [0, 0, 0, 100];
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) => Math.round(v * 100));
}
