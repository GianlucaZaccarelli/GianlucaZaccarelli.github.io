// Scrive il segno per il sito: src/components/LogoMark.astro.
// Corpo in currentColor, punto in var(--logo-punto): i colori li decide il CSS.
// Archi campionati ogni 2 gradi (a 40 px la differenza non si vede, il peso scende di 4 volte).
// Uso: node docs/design/logo-zg/src/web.mjs
import { writeFileSync } from 'node:fs';
import * as G from './geometria.mjs';

const opz = { PASSO: 2 };
const corpo = G.pezzi(G.corpo(opz).tracciati, 'currentColor', G.geometria().corsivo);
const punto = G.pezzi(G.punto(opz).tracciati, 'var(--logo-punto, #C2552D)');
const scena = [...corpo, ...punto];
// ingombro del segno inclinato, con un margine di 2 unita'
const xs = [], ys = [];
for (const it of scena) {
  const [a, b, c, d, e, f] = it.m || [1, 0, 0, 1, 0, 0];
  for (const [k, ...v] of it.d) {
    if (k === 'A') { xs.push(v[0] - v[2], v[0] + v[2]); ys.push(v[1] - v[2], v[1] + v[2]); continue; }
    for (let i = 0; i + 1 < v.length; i += 2) { xs.push(a * v[i] + c * v[i + 1] + e); ys.push(b * v[i] + d * v[i + 1] + f); }
  }
}
const vb = [Math.min(...xs) - 2, Math.min(...ys) - 2, Math.max(...xs) - Math.min(...xs) + 4, Math.max(...ys) - Math.min(...ys) + 4].map((v) => +v.toFixed(2));
const svg = G.svg(scena, { vb: vb.join(' '), colori: {} })
  .replace(/^<svg[^>]*>/, '').replace('</svg>\n', '')
  .replace(/fill="var\(--logo-punto, #C2552D\)"/g, 'class="logo-punto"');
const out = `---
// Marchio "ZG. punto in corsa". Generato da docs/design/logo-zg/src/web.mjs: non modificare a mano.
// Corpo in currentColor; il punto usa --logo-punto (default terracotta).
interface Props {
  class?: string;
  /** Testo alternativo; vuoto = decorativo (aria-hidden) */
  label?: string;
}
const { class: className, label } = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="${vb.join(' ')}"
  class={className}
  role={label ? 'img' : undefined}
  aria-label={label || undefined}
  aria-hidden={label ? undefined : 'true'}
  focusable="false"
>${svg}</svg>

<style>
  .logo-punto { fill: var(--logo-punto, var(--color-accent-600)); }
</style>
`;
writeFileSync('src/components/LogoMark.astro', out);
console.log('LogoMark.astro', out.length, 'byte, viewBox', vb.join(' '));
