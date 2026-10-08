// Pagine HTML del kit (social, documenti, mockup, linee guida) e testi
// (README, colori, sorgenti). Le immagini le rasterizza kit.mjs con Chromium;
// i font del sito (Fraunces, Inter, JetBrains Mono) sono incorporati in base64,
// quindi le pagine non chiedono nulla alla rete.
import { readFileSync } from 'node:fs';
import * as G from './geometria.mjs';
import { p, ROOT, VARIANTI, simbolo, simboloIn, lockup, trama as tramaDi, bbox, vbDi, tessera } from './kit.mjs';

// dichiarato qui: kit.mjs e pagine.mjs si importano a vicenda
const INK = '#1C1D20';

const NM = 'node_modules/@fontsource-variable';
const f64 = (f) => readFileSync(`${NM}/${f}`).toString('base64');
const FONT = [
  ['Fraunces', 'normal', 'fraunces/files/fraunces-latin-full-normal.woff2'],
  ['Fraunces', 'italic', 'fraunces/files/fraunces-latin-full-italic.woff2'],
  ['Inter', 'normal', 'inter/files/inter-latin-wght-normal.woff2'],
  ['JetBrains Mono', 'normal', 'jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'],
].map(([fam, st, f]) => `@font-face{font-family:'${fam}';font-style:${st};font-weight:100 900;src:url(data:font/woff2;base64,${f64(f)}) format('woff2')}`).join('');
const CSS = `${FONT}*{box-sizing:border-box;margin:0;padding:0}html,body{font-family:Inter,sans-serif;color:${INK}}
  .serif{font-family:Fraunces,Georgia,serif;font-variation-settings:'opsz' 96,'SOFT' 100}.mono{font-family:'JetBrains Mono',monospace}`;
const pagina = (corpo, css = '', extra = '') =>
  `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${extra}<style>${CSS}${css}</style></head><body>${corpo}</body></html>`;

// SVG in linea di una scena, alto `h` px (o largo `w`)
export function inline(items, { vb, h = null, w = null, stile = '' } = {}) {
  const [x, y, W, Hh] = vb || bbox(items);
  const s = G.svg(items, { vb: `${x} ${y} ${W} ${Hh}`, colori: p.colori });
  const dim = h ? `height="${h}" width="${(h * W) / Hh}"` : w ? `width="${w}" height="${(w * Hh) / W}"` : '';
  return s.replace('<svg ', `<svg ${dim} style="display:block;${stile}" `).replace(/<title>.*?<\/title>/, '');
}
const Q = [0, 0, 512, 512];
const SU_INK = { corpo: 'carta', punto: 'base', testo: 'carta', ruolo: 'carta' };
const SU_COPERTINA = { corpo: 'carta', punto: 'carta', testo: 'carta', ruolo: 'carta' };
const tramaUrl = (colore, opacita) =>
  `url('data:image/svg+xml;base64,${Buffer.from(G.svg(tramaDi(colore, opacita), { vb: '0 0 480 240', colori: p.colori })).toString('base64')}')`;
// fondo inchiostro con la trama dei punti in corsa
const conTrama = (scala = 0.6, fondo = INK, colore = 'tinta', opacita = 0.18) =>
  `background:${fondo};background-image:${tramaUrl(colore, opacita)};background-size:${480 * scala}px ${240 * scala}px`;

export const trama = (tileSvg) =>
  pagina(`<div style="width:2400px;height:1200px;background-image:url('data:image/svg+xml;base64,${Buffer.from(tileSvg).toString('base64')}');background-size:480px 240px"></div>`);

// ── Social ───────────────────────────────────────────────────────────────────
export function social({ pngDa }) {
  const d = `${ROOT}/social`;
  const cop = (w, h, altLockup, { sw = w, allinea = 'center', slogan = true, url = false, padDestra = 0 } = {}) =>
    pagina(
      `<div style="${conTrama(Math.max(0.5, h / 900))};width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:${padDestra ? 'flex-end' : 'center'};padding-right:${padDestra}px">
        <div style="width:${sw}px;display:flex;flex-direction:column;align-items:${allinea};gap:${altLockup * 0.34}px">
          ${inline(lockup('orizzontale', VARIANTI.scuro), { h: altLockup })}
          ${slogan ? `<p class="serif" style="color:${p.carta};font-size:${altLockup * 0.3}px;font-style:italic;opacity:.9">${p.slogan}</p>` : ''}
          ${url ? `<p class="mono" style="color:${p.tinta};font-size:${altLockup * 0.17}px;letter-spacing:.12em;text-transform:uppercase">${p.host}</p>` : ''}
        </div></div>`,
    );
  pngDa(pagina(`<div style="width:1080px;height:1080px;background:${INK};display:flex;align-items:center;justify-content:center">${inline(simboloIn(SU_INK, 540, 540, 760), { vb: [0, 0, 1080, 1080], w: 1080 })}</div>`), 1080, 1080, `${d}/profilo-1080.png`);
  pngDa(cop(1640, 624, 140, { sw: 1200 }), 1640, 624, `${d}/copertina-facebook-1640x624.png`);
  pngDa(cop(1584, 396, 100, { sw: 980, allinea: 'flex-start', padDestra: 110 }), 1584, 396, `${d}/copertina-linkedin-1584x396.png`);
  pngDa(cop(1500, 500, 120), 1500, 500, `${d}/copertina-x-1500x500.png`);
  pngDa(cop(1200, 630, 110, { url: true }), 1200, 630, `${d}/open-graph-1200x630.png`);
  const post = (w, h, pad = 90) =>
    pagina(
      `<div style="background:${p.carta};width:${w}px;height:${h}px;padding:${pad}px 90px;display:flex;flex-direction:column;justify-content:space-between">
        ${inline(lockup('orizzontale'), { h: 72 })}
        <h1 class="serif" style="font-size:${Math.round(w / 10.5)}px;font-weight:400;line-height:1.05;letter-spacing:-.025em;max-width:92%">Scrivo codice e <em style="color:${p.base}">studio le persone</em> che lo scrivono.</h1>
        <p class="mono" style="font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:#6B6F76">${p.host}</p></div>`,
    );
  pngDa(post(1080, 1080), 1080, 1080, `${d}/post-1080x1080.png`);
  pngDa(post(1080, 1350), 1080, 1350, `${d}/post-1080x1350.png`);
  pngDa(post(1080, 1920, 250), 1080, 1920, `${d}/storia-1080x1920.png`);
}

// ── Documenti ────────────────────────────────────────────────────────────────
export function documenti({ pngDa, scrivi, pdfHtml, esporta }) {
  const d = `${ROOT}/documenti`;
  const cop = pagina(
    `<div style="width:210mm;height:297mm;display:flex;flex-direction:column">
      <div style="${conTrama(0.45)};height:62%;padding:22mm 20mm;display:flex;flex-direction:column;justify-content:space-between">
        ${inline(lockup('orizzontale', VARIANTI.scuro), { h: 48 })}
        <div style="color:${p.carta}"><p class="mono" style="font-size:10pt;letter-spacing:.16em;text-transform:uppercase;color:${p.tinta}">Documento</p>
        <h1 class="serif" style="font-size:42pt;font-weight:400;line-height:1.02;letter-spacing:-.02em;margin-top:5mm">Titolo del <em style="color:${p.tinta}">documento</em></h1>
        <p style="font-size:13pt;margin-top:6mm;opacity:.85">Sottotitolo o periodo di riferimento</p></div></div>
      <div style="flex:1;padding:16mm 20mm;display:flex;flex-direction:column;justify-content:flex-end;font-size:10pt;color:#6B6F76">
        <p><b style="color:${INK}">Preparato per</b> Nome del destinatario</p><p style="margin-top:2mm"><b style="color:${INK}">Data</b> 1 gennaio 2027</p>
        <p class="mono" style="margin-top:8mm;font-size:8.5pt;letter-spacing:.1em;text-transform:uppercase">${p.nome} · ${p.host}</p></div></div>`,
    '@page{size:210mm 297mm;margin:0}',
  );
  scrivi(`${d}/copertina-documento.html`, cop);
  pdfHtml.push({ file: `${d}/copertina-documento.html`, out: `${d}/copertina-documento.pdf` });
  pngDa(cop, 794, 1123, `${d}/copertina-documento.png`);

  const slide = [
    `<div class="s" style="${conTrama(0.7)};color:${p.carta};justify-content:space-between">
      ${inline(lockup('orizzontale', VARIANTI.scuro), { h: 74 })}
      <div><h1 class="serif" style="font-size:100px;font-weight:400;line-height:1;letter-spacing:-.025em">Titolo della <em style="color:${p.tinta}">presentazione</em></h1>
      <p class="mono" style="font-size:26px;margin-top:34px;letter-spacing:.12em;text-transform:uppercase;color:${p.tinta}">Sottotitolo · evento · data</p></div></div>`,
    `<div class="s" style="background:${p.carta};justify-content:flex-start;gap:56px">
      <div style="display:flex;align-items:center;justify-content:space-between"><p class="mono" style="font-size:22px;letter-spacing:.14em;color:${p.base}">02 — SEZIONE</p>${inline(simbolo(), { h: 40 })}</div>
      <h2 class="serif" style="font-size:72px;font-weight:400;line-height:1.05;letter-spacing:-.02em">Titolo della slide di <em style="color:${p.base}">contenuto</em></h2>
      <ul style="font-size:32px;line-height:1.6;padding-left:1.1em;color:#33363C"><li>Un punto per riga, frasi brevi</li><li>Il terracotta solo per ciò che va notato</li><li>Numeri e date in JetBrains Mono</li></ul>
      <div class="mono" style="margin-top:auto;display:flex;justify-content:space-between;font-size:18px;letter-spacing:.1em;color:#9A9DA3"><span>${p.nome.toUpperCase()}</span><span>02</span></div></div>`,
    `<div class="s" style="background:${p.copertina};color:${p.carta};align-items:center;justify-content:center;gap:52px">
      ${inline(simbolo(SU_COPERTINA), { h: 170 })}
      <h2 class="serif" style="font-size:96px;font-weight:400;letter-spacing:-.02em">Grazie<em>.</em></h2><p class="mono" style="font-size:26px;letter-spacing:.1em;opacity:.85">${p.email} · ${p.host}</p></div>`,
  ];
  const cssS = `.s{width:1920px;height:1080px;padding:110px 130px;display:flex;flex-direction:column;page-break-after:always;position:relative;overflow:hidden}@page{size:1920px 1080px;margin:0}`;
  scrivi(`${d}/slide-16-9.html`, pagina(slide.join(''), cssS));
  pdfHtml.push({ file: `${d}/slide-16-9.html`, out: `${d}/slide-16-9.pdf` });
  slide.forEach((s, i) => pngDa(pagina(s, cssS), 1920, 1080, `${d}/slide-${i + 1}-${['titolo', 'contenuto', 'chiusura'][i]}.png`));

  const wm = simbolo({ corpo: 'ink', punto: 'ink' }).map((it) => ({ ...it, opacita: 0.06 }));
  esporta(`${d}/watermark.svg`, wm, { vb: vbDi(wm, 8), png: 1024 });
}

// ── Mockup ───────────────────────────────────────────────────────────────────
export function mockup({ pngDa }) {
  const d = `${ROOT}/mockup`;
  const W = 1600, Hh = 1000;
  const scena = (corpo, bg = '#E9E5DF') => pagina(`<div style="width:${W}px;height:${Hh}px;background:${bg};display:flex;align-items:center;justify-content:center;overflow:hidden">${corpo}</div>`);
  const finestra = (contenuto, larg = 1320, alt = 820) =>
    `<div style="width:${larg}px;height:${alt}px;background:${p.carta};border-radius:14px;box-shadow:0 30px 80px rgba(24,27,36,.18);overflow:hidden;display:flex;flex-direction:column">
      <div style="height:44px;background:#EFECE7;display:flex;align-items:center;gap:8px;padding:0 18px">${['#E58A7A', '#E8C26A', '#8CC59A'].map((c) => `<i style="width:12px;height:12px;border-radius:50%;background:${c}"></i>`).join('')}
      <div style="margin-left:24px;flex:1;height:26px;border-radius:8px;background:#fff;font-size:13px;color:#6B6F76;display:flex;align-items:center;padding-left:12px">https://${p.host}</div></div>${contenuto}</div>`;
  // header del sito: marchio a sinistra, schede al centro, CV a destra
  const nav = `<div style="height:84px;border-bottom:1px solid #E6E2DC;display:flex;align-items:center;padding:0 44px;gap:28px;background:#fff">
      ${inline(lockup('orizzontale'), { h: 40 })}<div style="flex:1"></div>
      <div style="display:flex;gap:4px;padding:4px;border:1px solid #DCD8D2;border-radius:999px">${['Chi sono', 'Esperienza', 'Progetti', 'Contatti'].map((t, i) => `<span style="font-size:14px;font-weight:500;padding:7px 15px;border-radius:999px;${i === 1 ? `background:${INK};color:${p.carta}` : 'color:#6B6F76'}">${t}</span>`).join('')}</div>
      <span style="border:1px solid ${p.base};color:${p.base};font-weight:600;font-size:14px;padding:9px 18px;border-radius:999px;background:${p.chiaro}">↓ CV</span></div>`;
  const hero = `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 90px;gap:22px">
      <p class="mono" style="font-size:15px;letter-spacing:.16em;color:${p.base}">02</p>
      <h1 class="serif" style="font-size:76px;font-weight:400;line-height:1;letter-spacing:-.03em">Percorso <em style="color:${p.base}">professionale</em></h1>
      <p style="font-size:21px;color:#4A4D53;max-width:640px">${p.slogan}</p></div>`;
  pngDa(scena(finestra(nav + hero)), W, Hh, `${d}/navbar.png`);

  const tab = (icon, titolo, attiva) =>
    `<div style="height:64px;width:380px;display:flex;align-items:center;gap:14px;padding:0 22px;border-radius:14px 14px 0 0;background:${attiva ? '#fff' : 'transparent'};font-size:19px;color:${attiva ? INK : '#6B6F76'}">${icon}<span>${titolo}</span></div>`;
  const grigio = `<i style="width:30px;height:30px;border-radius:8px;background:#C9CDD3"></i>`;
  const fav = (h) => inline(tessera('ink', SU_INK, { r: 96, s: 0.86, opz: G.PICCOLO }), { vb: Q, h });
  pngDa(
    scena(`<div style="width:1400px;background:#DCDFE4;border-radius:18px;padding:16px 16px 0;box-shadow:0 30px 80px rgba(24,27,36,.15)">
      <div style="display:flex;gap:6px">${tab(fav(30), `${p.nome} — Portfolio`, true)}${tab(grigio, 'Posta in arrivo', false)}${tab(grigio, 'Calendario', false)}</div>
      <div style="height:420px;background:#fff;display:flex;align-items:center;justify-content:center;gap:70px">
        <div style="text-align:center">${fav(96)}<p style="margin-top:14px;color:#6B6F76;font-size:16px">favicon 16 px (×6), taglio piccolo</p></div>
        <div style="text-align:center">${inline(tessera('ink', SU_INK, { r: 112 }), { vb: Q, h: 96 })}<p style="margin-top:14px;color:#6B6F76;font-size:16px">icona 192 px</p></div></div></div>`),
    W, Hh, `${d}/tab-browser.png`,
  );

  const app = (col) => `<i style="width:118px;height:118px;border-radius:28px;background:${col};display:block"></i>`;
  const cella = (ico, nome) => `<div style="display:flex;flex-direction:column;align-items:center;gap:10px">${ico}<span style="color:#fff;font-size:17px;text-shadow:0 1px 3px rgba(0,0,0,.4)">${nome}</span></div>`;
  const nostra = `<div style="width:118px;height:118px;border-radius:28px;overflow:hidden">${inline(tessera('ink', SU_INK), { vb: Q, w: 118 })}</div>`;
  const altre = ['#A8A29E', '#B7AFA6', '#9C958D', '#C2BAB0', '#A39C94', '#B1A99F', '#958F88', '#BDB5AB', '#A09990', '#AFA79E', '#999289'];
  const griglia = altre.map((c, i) => (i === 4 ? cella(nostra, 'Zakka') : '') + cella(app(c), ['Meteo', 'Foto', 'Note', 'Mappe', 'Posta', 'Orologio', 'Musica', 'File', 'Banca', 'Libri', 'Salute'][i])).join('');
  pngDa(
    scena(`<div style="width:560px;height:1100px;margin-top:180px;border-radius:70px;background:#111;padding:18px;box-shadow:0 40px 90px rgba(0,0,0,.3)">
      <div style="width:100%;height:100%;border-radius:54px;background:linear-gradient(160deg,#3A3A3F,${p.copertina} 150%);padding:120px 34px;display:grid;grid-template-columns:repeat(3,1fr);row-gap:36px;align-content:start;justify-items:center">${griglia}</div></div>`),
    W, Hh, `${d}/telefono-home.png`,
  );

  const img = (f, w) => `<img src="${f}" style="width:${w}px;display:block;border-radius:4px;box-shadow:0 22px 50px rgba(24,27,36,.28)">`;
  const bf = readFileSync(`${ROOT}/stampa/biglietto-fronte.svg`, 'utf8');
  const br = readFileSync(`${ROOT}/stampa/biglietto-retro.svg`, 'utf8');
  const taglio = (s) => `data:image/svg+xml;base64,${Buffer.from(s.replace('viewBox="0 0 910 610"', 'viewBox="30 30 850 550"')).toString('base64')}`;
  pngDa(scena(`<div style="display:flex;gap:70px;transform:rotate(-4deg)">${img(taglio(bf), 600)}${img(taglio(br), 600)}</div>`, '#D9D4CC'), W, Hh, `${d}/biglietto.png`);
}

// ── Linee guida ──────────────────────────────────────────────────────────────
export function lineeGuida({ scrivi, pdfHtml }) {
  const d = `${ROOT}/linee-guida`;
  const g = G.geometria();
  const sez = (n, titolo, corpo) =>
    `<section class="pg"><header><span class="mono">${String(n).padStart(2, '0')}</span><h2 class="serif">${titolo}</h2>${inline(simbolo(), { h: 20 })}</header><div class="c">${corpo}</div><footer class="mono">${p.nome.toUpperCase()} · LINEE GUIDA DEL MARCHIO</footer></section>`;

  // Costruzione: griglia 16, segno chiaro, quote
  const griglia = Array.from({ length: 21 }, (_, i) => `<line x1="${i * 16}" y1="0" x2="${i * 16}" y2="256"/>`).join('') +
    Array.from({ length: 17 }, (_, i) => `<line x1="0" y1="${i * 16}" x2="320" y2="${i * 16}"/>`).join('');
  const chiaro = simbolo({ corpo: G.mescola(INK, '#FFFFFF', 0.78), punto: G.mescola(p.base, '#FFFFFF', 0.5) });
  const pp = G.punto();
  const costruzione = `<svg viewBox="-8 -8 336 272" width="470" height="380" style="display:block">
    <g stroke="#E6E2DC" stroke-width=".6">${griglia}</g>
    ${G.svg(chiaro, { vb: '0 0 320 256', colori: p.colori }).replace(/<\/?svg[^>]*>/g, '')}
    <g fill="none" stroke="${p.base}" stroke-width="1.1">
      <circle cx="${g.CX}" cy="${g.CY}" r="${g.R}" stroke-dasharray="3 3" transform="matrix(${g.corsivo.join(' ')})"/>
      <line x1="0" y1="${g.bot}" x2="320" y2="${g.bot}" stroke-dasharray="2 4"/><line x1="0" y1="${g.top}" x2="320" y2="${g.top}" stroke-dasharray="2 4"/>
      <line x1="${g.CX - 30}" y1="${g.top - 12}" x2="${g.CX - 30 - Math.tan((g.SK * Math.PI) / 180) * (g.bot - g.top + 24)}" y2="${g.bot + 12}" stroke-dasharray="5 3"/>
      <circle cx="${pp.cx}" cy="${pp.cy}" r="${g.RP}"/></g></svg>`;
  const quote = [
    [`T ${g.T}`, 'spessore del tratto, su griglia 320 × 256'], [`SK ${g.SK}°`, 'inclinazione del corsivo (Z e G; il punto resta dritto)'],
    [`R ${g.R}`, 'raggio dell\'asse della G'], [`GAP ${g.GAP}`, 'taglio dell\'intreccio: la G passa sotto la diagonale della Z'],
    [`A1 ${g.A1}°`, 'taglio del terminale alto della G, lungo il raggio'], [`RP ${g.RP}`, 'raggio del punto, sulla linea di base'],
    [`CODA ${g.CODA}`, 'scia del punto in corsa, affusolata fino a 2 × ' + g.PUNTA],
  ];

  const unita = 2 * g.T; // area di rispetto: due spessori del tratto
  const rispetto = (items, h) => {
    const [, , , bh] = bbox(items);
    const x = (unita / bh) * h;
    return `<div style="display:inline-block;padding:${x}px;outline:1.5px dashed ${p.base};background:repeating-linear-gradient(45deg,${p.chiaro} 0 6px,#fff 6px 12px)"><div style="background:#fff">${inline(items, { h })}</div></div>`;
  };

  const palette = [
    ['Inchiostro (corpo del segno, testo)', p.colori.ink], ['Terracotta (il punto in corsa)', p.colori.base], ['Terracotta profondo (retro di copertina)', p.colori.copertina],
    ['Terracotta chiaro (punto su fondo scuro)', p.colori.tinta], ['Carta (fondo)', p.colori.carta], ['Grigio testo', p.colori.grigioTesto],
  ].map(([nome, c]) => `<div class="sw"><i style="background:${c.hex}"></i><b>${nome}</b>
      <span>HEX ${c.hex}</span><span>RGB ${G.rgb(c.hex).join(' ')}</span><span>CMYK ${c.cmyk.join(' ')}</span><span>${c.pantone || '—'}</span></div>`).join('');

  const base = simbolo();
  const vietati = [
    ['Non deformarlo', 'transform:scaleX(1.45)'],
    ['Non raddrizzarlo né cambiarne l\'inclinazione', 'transform:skewX(14deg)'],
    ['Non aggiungere ombre o effetti', 'filter:drop-shadow(6px 8px 4px rgba(0,0,0,.45))'],
    ['Non colorare Z e G in modo diverso', null, simbolo({ corpo: '#3B82F6', punto: 'base' }).map((it, i) => (i < 1 ? { ...it, colore: '#10B981' } : it))],
    ['Non usarlo a contorno', null, null, true],
    ['Non togliere il punto in corsa', null, G.pezzi(G.corpo().tracciati, 'ink', G.geometria().corsivo)],
  ].map(([t, css, items, contorno]) => {
    let arte = inline(items || base, { h: 70, stile: css || '' });
    if (contorno) arte = arte.replace(/<path fill="[^"]+"/g, `<path fill="none" stroke="${INK}" stroke-width="4"`);
    return `<figure class="no"><div>${arte}</div><figcaption>✕ ${t}</figcaption></figure>`;
  }).join('');

  const corretti = [
    [p.carta, lockup('orizzontale'), 'Su carta: inchiostro e punto terracotta'],
    [INK, lockup('orizzontale', VARIANTI.scuro), 'Su inchiostro: carta e punto terracotta chiaro'],
    [p.copertina, lockup('orizzontale', SU_COPERTINA), 'Sul retro di copertina: tutto carta'],
    ['linear-gradient(135deg,#3b3a38,#6b6358)', lockup('orizzontale', VARIANTI.bianco), 'Su foto: bianco, su una zona scura e calma'],
  ].map(([bg, it, t]) => `<figure class="ok"><div style="background:${bg}">${inline(it, { h: 44 })}</div><figcaption>✓ ${t}</figcaption></figure>`).join('');

  const social = ['copertina-linkedin-1584x396', 'open-graph-1200x630', 'profilo-1080', 'post-1080x1080', 'copertina-x-1500x500', 'storia-1080x1920']
    .map((f) => `<img src="../social/${f}.png" alt="${f}">`).join('');

  const corpo = [
    `<section class="pg copertina" style="${conTrama(0.8)}"><div style="display:flex;flex-direction:column;justify-content:space-between;height:100%;color:${p.carta}">
      ${inline(lockup('orizzontale', VARIANTI.scuro), { h: 62 })}<div><p class="mono" style="font-size:11pt;letter-spacing:.16em;color:${p.tinta}">LINEE GUIDA DEL MARCHIO</p>
      <h1 class="serif" style="font-size:52pt;font-weight:400;line-height:1;letter-spacing:-.02em;margin-top:4mm">ZG<em style="color:${p.tinta}">.</em> punto in corsa</h1><p style="font-size:12pt;margin-top:5mm;opacity:.85">Versione 1.0 · ottobre 2026</p></div></div></section>`,
    sez(1, 'Il concetto', `<div class="due"><div><p class="lead">Il marchio sono le iniziali, <b>Z</b> e <b>G</b>, scritte in un solo movimento: la base della Z scorre nella pancia della G, e la G passa <b>sotto</b> la diagonale della Z.</p>
      <p>Due lettere intrecciate come codice e persone: la tecnica e chi la usa, legate in un unico segno. Il corsivo di 12° è l'accento del sito («il corsivo è l'accento»), e il punto terracotta chiude la sigla con decisione: è la penna rossa dell'editor.</p>
      <p>Il punto non è fermo: arriva in corsa, con una breve scia affusolata. È l'unico elemento che non si inclina, perché è un punto, non una lettera. Nella trama diventa una pioggia di punti in corsa, e nell'animazione arriva davvero.</p></div>
      <div style="display:flex;justify-content:center;padding-top:10mm">${inline(base, { h: 210 })}</div></div>`),
    sez(2, 'Costruzione', `<div class="due"><div>${costruzione}</div><div><p>Griglia di 320 × 256 unità (in grigio il modulo 16). Monolinea di spessore costante; tutte le curve della G sono archi di cerchio, poi inclinati con il resto del corpo. Misure in unità della griglia:</p>
      <table class="t">${quote.map(([a, b]) => `<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join('')}</table>
      <p style="margin-top:4mm">Il taglio dell'intreccio è un vuoto vero nella forma, non un bianco sovrapposto: il segno funziona su qualunque fondo. La sorgente parametrica è <code>segno-sorgente.svg</code> nella radice del kit; la geometria sta in <code>src/geometria.mjs</code>.</p></div></div>`),
    sez(3, 'Area di rispetto', `<p>Attorno al marchio va lasciato libero almeno <b>il doppio dello spessore del tratto</b> (2T = ${unita} unità, circa un terzo dell'altezza del segno). Nessun testo, bordo o immagine entra in quest'area.</p>
      <div style="display:flex;gap:16mm;align-items:center;margin-top:10mm">${rispetto(base, 130)}${rispetto(lockup('orizzontale'), 80)}</div>`),
    sez(4, 'Dimensioni minime', `<div class="due"><div><h3>Schermo</h3><table class="t">
      <tr><td>Segno</td><td>40 px di larghezza; sotto, fino a 16 px, il <b>taglio piccolo</b> (<code>logo-icon-small.svg</code>)</td></tr>
      <tr><td>Lockup orizzontale</td><td>180 px di larghezza</td></tr><tr><td>Lockup verticale</td><td>110 px di larghezza</td></tr></table>
      <h3 style="margin-top:8mm">Stampa</h3><table class="t"><tr><td>Segno</td><td>12 mm; sotto, fino a 6 mm, il taglio piccolo</td></tr><tr><td>Lockup orizzontale</td><td>40 mm di larghezza</td></tr><tr><td>Lockup verticale</td><td>25 mm di larghezza</td></tr></table></div>
      <div><h3>Il taglio piccolo</h3><p>Sotto i 40 px il taglio dell'intreccio e la scia del punto si chiudono. Il taglio piccolo è più spesso (T 34), senza intreccio e senza scia, con il punto più grande: resta «ZG.» anche a 16 px. Nelle favicon sta su una tessera inchiostro.</p>
      <div style="display:flex;align-items:flex-end;gap:10mm;margin-top:6mm">
      <figure>${inline(base, { h: 40 })}<figcaption>segno, 40 px</figcaption></figure>
      <figure>${inline(simbolo(VARIANTI.colore, G.PICCOLO), { h: 24 })}<figcaption>taglio piccolo, 24 px</figcaption></figure>
      <figure>${inline(tessera('ink', SU_INK, { r: 96, s: 0.86, opz: G.PICCOLO }), { vb: Q, h: 32 })}<figcaption>favicon 32 px</figcaption></figure>
      <figure>${inline(tessera('ink', SU_INK, { r: 96, s: 0.86, opz: G.PICCOLO }), { vb: Q, h: 16 })}<figcaption>16 px</figcaption></figure></div></div></div>`),
    sez(5, 'Palette', `<div class="pal">${palette}</div><p class="nota">Sono i colori del sito (DESIGN.md): inchiostro, carta e terracotta. Il terracotta nel marchio è solo il punto; il terracotta profondo riempie una sola superficie, il retro di copertina. CMYK: conversione di partenza, da validare con la tipografia su prova colore (profilo dello stampatore, es. FOGRA39). Pantone: il più vicino a vista (Solid Coated), da confermare sulla mazzetta fisica.</p>`),
    sez(6, 'Tipografia', `<div class="due"><div><p>Le stesse tre voci del sito. <b class="serif" style="font-size:13pt">Fraunces</b> parla (il nome, i titoli, il corsivo d'accento), <b>Inter</b> spiega (il testo), <b class="mono">JetBrains Mono</b> certifica (ruolo, date, numeri). Tutte open source, pacchetti <code>@fontsource-variable/*</code>.</p>
      <h3 style="margin-top:6mm">Nel lockup</h3><p>Il nome in Fraunces Regular (ottica 72, SOFT 100), il ruolo in JetBrains Mono maiuscolo spaziato. Il lockup è un disegno: si usa il file, non si riscrive col font.</p></div>
      <div class="scala"><p class="serif" style="font-size:34pt;line-height:1.02;letter-spacing:-.02em">Titolo con <em style="color:${p.base}">accento</em></p><p style="font-size:13pt;color:#33363C">Testo corrente · Inter 400, interlinea 1,6, righe di 45–75 caratteri.</p>
      <p class="mono" style="font-size:10pt;letter-spacing:.14em;color:#6B6F76">RUOLO · DATE · 2017 — 2026</p></div></div>`),
    sez(7, 'Usi corretti', `<div class="griglia2">${corretti}</div>`),
    sez(8, 'Usi vietati', `<div class="griglia3">${vietati}</div>`),
    sez(9, 'Movimento', `<div class="due"><div><p class="lead">Il punto arriva in corsa.</p><p>Nell'animazione (<code>segno-animato.svg</code>) Z e G sono ferme; il punto entra da sinistra, la scia si allunga durante la corsa e si ritira quando il punto si posa sulla linea di base. Uscita decelerata, circa un secondo, poi pausa. Con movimento ridotto il segno è fermo.</p></div>
      <div style="display:flex;justify-content:center">${inline(base, { h: 150 })}</div></div>`),
    sez(10, 'Sui social', `<div class="social">${social}</div>`),
  ].join('');

  const css = `@page{size:297mm 210mm;margin:0}body{background:#E6E2DC}
    .pg{width:297mm;height:210mm;background:#fff;padding:16mm 18mm 14mm;display:flex;flex-direction:column;page-break-after:always;margin:0 auto 8mm;position:relative;overflow:hidden}
    @media print{body{background:#fff}.pg{margin:0}}
    .pg header{display:flex;align-items:center;gap:5mm;border-bottom:1px solid #E6E2DC;padding-bottom:4mm;margin-bottom:8mm}
    .pg header span{font-size:10pt;font-weight:500;color:${p.base}}.pg header h2{font-size:22pt;font-weight:400;flex:1;letter-spacing:-.01em}
    .pg footer{margin-top:auto;font-size:7.5pt;letter-spacing:.12em;color:#9A9DA3}.c{font-size:10.5pt;line-height:1.55;color:#33363C}.c p+p{margin-top:3mm}
    .lead{font-family:Fraunces,serif;font-size:16pt;line-height:1.35;color:${INK}}h3{font-size:12pt;font-weight:600;color:${INK};margin-bottom:2mm}
    .due{display:grid;grid-template-columns:1fr 1fr;gap:14mm;align-items:start}.t{border-collapse:collapse;margin-top:3mm;width:100%}.t td{border-bottom:1px solid #F1EEEA;padding:1.6mm 2mm;vertical-align:top}
    code{font-family:'JetBrains Mono',monospace;font-size:8.5pt;background:#F3F0EC;padding:0 1.5mm;border-radius:3px}figure{font-size:8.5pt;color:#6B6F76}figcaption{margin-top:2mm}
    .pal{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm}.sw{border:1px solid #E6E2DC;border-radius:3mm;overflow:hidden;font-size:8.5pt;display:flex;flex-direction:column}
    .sw i{height:18mm;display:block;border-bottom:1px solid #E6E2DC}.sw b{padding:2mm 3mm 1mm;color:${INK}}.sw span{padding:0 3mm;color:#4A4D53}.sw span:last-child{padding-bottom:3mm}
    .nota{margin-top:5mm;font-size:8.5pt;color:#6B6F76}.scala>*+*{margin-top:5mm}
    .griglia2{display:grid;grid-template-columns:1fr 1fr;gap:6mm}.griglia2 figure div{height:40mm;border-radius:3mm;display:flex;align-items:center;justify-content:center;border:1px solid #E6E2DC}
    .griglia3{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm}.griglia3 figure div{height:40mm;border-radius:3mm;display:flex;align-items:center;justify-content:center;background:#FAF8F5;border:1px solid #E6E2DC}
    .no figcaption{color:#B42318;font-weight:500}.ok figcaption{color:#2F6B3A;font-weight:500}
    .social{display:flex;flex-wrap:wrap;gap:4mm;align-items:flex-end}.social img{height:38mm;width:auto;display:block;border-radius:2mm}
    .copertina{padding:18mm}`;
  scrivi(`${d}/linee-guida.html`, pagina(corpo, css, `<title>${p.nome} — Linee guida del marchio</title>`));
  pdfHtml.push({ file: `${d}/linee-guida.html`, out: `${d}/linee-guida.pdf` });
}

// ── Testi ────────────────────────────────────────────────────────────────────
export function coloriMd() {
  const riga = (nome, c) => `| ${nome} | \`${c.hex}\` | ${G.rgb(c.hex).join(' ')} | ${c.cmyk.join(' ')} | ${c.pantone || '—'} |`;
  return `# ${p.nome} — colori per la stampa

| Colore | HEX | RGB | CMYK | Pantone |
| --- | --- | --- | --- | --- |
${riga('Inchiostro (corpo del segno, testo)', p.colori.ink)}
${riga('Terracotta (il punto in corsa)', p.colori.base)}
${riga('Terracotta profondo (retro di copertina, fronte del biglietto)', p.colori.copertina)}
${riga('Terracotta chiaro (punto su fondo scuro)', p.colori.tinta)}
${riga('Carta (fondo)', p.colori.carta)}

- I PDF \`*-cmyk.pdf\` usano la quadricromia; i \`*-pantone.pdf\` il terracotta come tinta piatta
  (Separation) con l'alternativa CMYK qui sopra; i \`*-nero.pdf\` solo nero.
- **CMYK**: conversione di partenza, non un profilo colore. Va validata dalla tipografia con una
  prova colore sul suo profilo (es. FOGRA39 su carta patinata).
- **Pantone**: il più vicino a vista nella serie Solid Coated, da confermare sulla mazzetta.
- Il biglietto ha 3 mm di abbondanza (BleedBox) e il formato finito nel TrimBox.
- Nessun font nei PDF: tutte le lettere sono tracciati.
`;
}

export function sorgente({ scrivi }) {
  const g = G.geometria();
  const commento = `
  Marchio "ZG. punto in corsa" di ${p.nome}: sorgente.
  Griglia 320 x 256. Monolinea di spessore T = ${g.T}.
  Z piena: barre alte T da x ${g.X0} a ${g.X1}, tra y ${g.top} e ${g.bot}; diagonale di spessore
  perpendicolare T (larghezza orizzontale ${g.w.toFixed(2)}); la barra bassa prosegue fino a x ${g.CX},
  il fondo della G: la base della Z scorre nella G.
  G: anello di asse R = ${g.R} centrato in (${g.CX}, ${g.CY}), raggi ${g.ri} e ${g.ro}; terminale alto
  tagliato lungo il raggio a ${g.A1} gradi; fianco destro chiuso a meta' altezza (y ${g.CY}), dove la
  tangente e' verticale; li' si appoggia la barra (alta T, da x ${g.CX + 4} al bordo esterno).
  Intreccio: la pancia della G e' scavata da una fascia larga quanto la diagonale + GAP = ${g.GAP} per
  lato (perpendicolare): la G passa sotto la Z. Il taglio e' un vuoto vero.
  Corsivo: Z e G inclinate di SK = ${g.SK} gradi, matrix(1 0 ${(-g.k).toFixed(5)} 1 ${(g.k * g.bot).toFixed(3)} 0)
  (la linea di base resta ferma).
  Punto in corsa (non inclinato): cerchio r ${g.RP} in (${(g.CX + g.ro + g.STACCO).toFixed(1)}, ${(g.bot - g.RP).toFixed(1)}), sulla
  linea di base; scia affusolata lunga ${g.CODA}, dalla larghezza del punto a 2 x ${g.PUNTA}.
  Fonte: src/geometria.mjs (P, geometria(), corpo(), punto(), segno()).
`;
  const s = G.svg(simbolo(), { vb: vbDi(simbolo(), 8).join(' '), colori: p.colori, titolo: `${p.nome} — ZG. punto in corsa` });
  scrivi(`${ROOT}/segno-sorgente.svg`, s.replace('<title>', `<!--${commento}-->\n<title>`));
  const pic = simbolo(VARIANTI.colore, G.PICCOLO);
  const sp = G.svg(pic, { vb: vbDi(pic, 8).join(' '), colori: p.colori, titolo: `${p.nome} — taglio piccolo` });
  scrivi(`${ROOT}/segno-sorgente-piccolo.svg`, sp.replace('<title>', `<!--\n  Taglio piccolo per 16-40 px: T 34, nessun intreccio, nessuna scia, punto r 19.\n  Stessa costruzione del segno (src/geometria.mjs, PICCOLO).\n-->\n<title>`));
  scrivi(`${ROOT}/segno-animato.svg`, animato());
  scrivi(`${ROOT}/README.md`, readme());
}

// Il punto arriva in corsa: Z e G ferme, il punto entra da sinistra con la scia
// allungata e si posa sulla linea di base, la scia si ritira.
function animato(durata = 3.2) {
  const { g, tracciati } = G.corpo();
  const pt = G.punto();
  const [x, y, w, h] = vbDi(simbolo(), 8);
  const corpoSvg = G.svg(G.pezzi(tracciati, p.ink, g.corsivo), { vb: '0 0 1 1', colori: {} }).replace(/<\/?svg[^>]*>/g, '');
  const r = g.RP;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}">
<title>${p.nome} — ZG. il punto arriva in corsa</title>
<style>
.punto{animation:corsa ${durata}s cubic-bezier(.16,1,.3,1) infinite both}
.scia{transform-box:fill-box;transform-origin:right center;animation:scia ${durata}s cubic-bezier(.16,1,.3,1) infinite both}
@keyframes corsa{0%{transform:translateX(-150px);opacity:0}8%{opacity:1}40%,100%{transform:none;opacity:1}}
@keyframes scia{0%{transform:scaleX(2.6)}40%,100%{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.punto,.scia{animation:none}}
</style>
${corpoSvg}
<g class="punto" fill="${p.base}"><path class="scia" d="M${pt.cx} ${pt.cy - r}L${pt.cx} ${pt.cy + r}L${pt.cx - g.CODA} ${pt.cy + g.PUNTA}L${pt.cx - g.CODA} ${pt.cy - g.PUNTA}Z"/><circle cx="${pt.cx}" cy="${pt.cy}" r="${r}"/></g>
</svg>
`;
}

function readme() {
  return `# ${p.nome} — kit del marchio «ZG. punto in corsa»

Il marchio sono le iniziali Z e G scritte in un solo movimento: la base della Z scorre nella G,
la G passa sotto la diagonale della Z, tutto in corsivo di 12°. Il punto terracotta chiude la
sigla e arriva in corsa, con una breve scia.

Tutto è generato da \`../src/kit.mjs\` (\`node docs/design/logo-zg/src/kit.mjs\` dalla radice del
repo). La prima volta: \`python docs/design/logo-zg/src/istanze-font.py\` crea le istanze
statiche dei font del sito in \`src/font/\` (serve \`pip install fonttools brotli\`). fontkit si
legge da un progetto vicino (\`FONTKIT_FROM\` per indicarne un altro).

In radice: \`segno-sorgente.svg\` (costruzione descritta nel commento), \`segno-sorgente-piccolo.svg\`
(taglio piccolo per 16–40 px) e \`segno-animato.svg\` (il punto che arriva in corsa).

## Indice

| Cartella | Contenuto |
| --- | --- |
| \`app/\` | \`logo-icon.svg\`, \`-mono\`, \`-small\` (taglio piccolo), \`-tile\` (inchiostro), \`-tile-chiaro\`, \`-tile-copertina\`, \`logo-wordmark.svg\`, \`-dark\` (+ PNG), \`favicon.svg\`, \`favicon.ico\` (16 + 32 + 48), \`favicon-16x16/32x32/48x48/64x64.png\`, \`favicon-512.png\`, \`apple-touch-icon.png\`, \`icon-192.png\`, \`icon-512.png\`, \`icon-maskable-512.png\`, \`site.webmanifest\` |
| \`lockup/\` | \`orizzontale\`, \`verticale\`, \`wordmark\`, \`icona\` × \`colore\`, \`nero\`, \`bianco\`, \`scuro\` (SVG + PNG trasparente) |
| \`social/\` | profilo, copertine LinkedIn / X / Facebook, Open Graph, post quadrato e verticale, storia |
| \`email/\` | header 600 px @2x chiaro e scuro, firma 300 px @2x, icona 96 e 192 su chiaro e scuro — solo PNG |
| \`stampa/\` | PDF vettoriali in tracciati: logo orizzontale / verticale / icona in CMYK, Pantone (tinta piatta) e nero; biglietto fronte/retro, carta intestata A4; \`colori.md\` |
| \`documenti/\` | copertina documento (HTML, PDF, PNG), template slide 16:9 titolo/contenuto/chiusura (HTML, PDF, PNG), watermark |
| \`pattern/\` | trama di punti in corsa in tile ripetibili 480×240 (chiara, scura, colore) e campioni 2400×1200 |
| \`mockup/\` | header del sito, tab del browser, icona sulla home del telefono, biglietto |
| \`linee-guida/\` | \`linee-guida.html\` e \`.pdf\`: concetto, costruzione, area di rispetto, dimensioni minime, palette, tipografia, usi corretti e vietati, movimento, social |

## Misure

| File | Misura | Note |
| --- | --- | --- |
| \`favicon-16x16 / 32x32.png\` | 16, 32 | taglio piccolo su tessera inchiostro |
| \`favicon-48x48 / 64x64.png\` | 48, 64 | taglio piccolo, più margine |
| \`favicon.ico\` | 16 + 32 + 48 | PNG incorporati |
| \`favicon-512.png\`, \`logo-icon-tile*\` | 512 | tessera arrotondata |
| \`apple-touch-icon.png\` | 180×180 | al vivo, iOS arrotonda da sé |
| \`icon-192 / icon-512.png\` | 192, 512 | PWA |
| \`icon-maskable-512.png\` | 512 | segno dentro il cerchio sicuro |
| \`social/profilo-1080.png\` | 1080×1080 | regge il ritaglio circolare |
| \`social/copertina-linkedin\` | 1584×396 | contenuto a destra (a sinistra la foto) |
| \`social/copertina-x\` | 1500×500 | |
| \`social/copertina-facebook\` | 1640×624 | |
| \`social/open-graph\` | 1200×630 | anteprima dei link al sito |
| \`social/post\` | 1080×1080, 1080×1350 | |
| \`social/storia\` | 1080×1920 | |
| \`email/header-600-*@2x.png\` | 1200×240 | da mostrare a 600×120 |
| \`email/firma-300@2x.png\` | 600 di larghezza | da mostrare a 300 |
| \`stampa/biglietto-*\` | 85×55 mm + 3 mm | |
| \`stampa/carta-intestata-a4\` | 210×297 mm | |

## Da sapere

- **Font**: Fraunces, Inter e JetBrains Mono, gli stessi del sito (open source). Nei loghi e nei
  PDF di stampa le lettere sono tracciati; nelle pagine HTML il font è incorporato.
- **CMYK e Pantone** sono valori di partenza: vanno validati dalla tipografia (vedi \`stampa/colori.md\`).
- Sotto i 40 px si usa il **taglio piccolo**, non il segno ridotto.
- Il marchio non è stato sottoposto a ricerca di anteriorità: prima di un uso commerciale serve
  una verifica sui registri dei marchi e una ricerca per immagini.
`;
}
