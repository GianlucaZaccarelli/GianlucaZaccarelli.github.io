// Uso: node scripts/foto-galleria.mjs (dalla radice del progetto)
// Foto della galleria con sharp: converte il profilo colore (Display P3 dell'iPhone) in sRGB
// invece di scartarlo, e non salva metadati (niente GPS).
import sharp from 'sharp';
const O = 'docs/foto/originali';
const G = 'src/assets/foto/galleria';
const jpg = (s) => s.toColourspace('srgb').jpeg({ quality: 90, mozjpeg: true });

// Profilo: via la banda di cielo, aria sopra la testa dal muro specchiato e allungato, poi specchiata
const corpo = await sharp(`${O}/estetica-profilo.jpg`).extract({ left: 0, top: 580, width: 2314, height: 2312 }).toColourspace('srgb').png().toBuffer();
const aria = await sharp(corpo).extract({ left: 0, top: 0, width: 2314, height: 280 }).flip().resize(2314, 465, { fit: 'fill' }).png().toBuffer();
const unita = await sharp({ create: { width: 2314, height: 2777, channels: 3, background: '#fff' } })
  .composite([{ input: aria, top: 0, left: 0 }, { input: corpo, top: 465, left: 0 }]).png().toBuffer();
await jpg(sharp(unita).flop()).toFile(`${G}/estetica.jpg`);

// Moto: solo il taglio del pavimento vuoto in basso (5:6), colori originali
await jpg(sharp(`${O}/moto-z650.jpg`).extract({ left: 0, top: 0, width: 6048, height: 7258 }).resize(2000)).toFile(`${G}/moto.jpg`);

for (const f of ['estetica', 'moto']) {
  const m = await sharp(`${G}/${f}.jpg`).metadata();
  console.log(f, m.width, m.height, m.space, 'icc:', !!m.icc, 'exif:', !!m.exif);
}
