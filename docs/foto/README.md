# Foto

Gli scatti originali stanno in `originali/` (fuori da `src/`, quindi non finiscono nel sito).
Le foto usate dal sito stanno in `src/assets/foto/` e `src/assets/og-image.jpg`.

| Originale | Contenuto |
| --- | --- |
| `originali/in-chiesa-bn.jpg` | In chiesa, piano americano con la testimone accanto, bianco e nero (4000×2662) |
| `originali/in-chiesa-colori.jpg` | Lo stesso scatto a colori |
| `originali/in-chiesa-verticale-colori.jpg` | Variante verticale a colori, figura intera (993×2662) |
| `originali/matrimonio-con-lo-sposo-colori.jpg` | Con lo sposo, a colori |

## Foto del sito

| File | Da dove viene |
| --- | --- |
| `src/assets/foto/hero-ritratto-bn.jpg` | Copertina (hero). Ritaglio di `in-chiesa-bn.jpg` con solo il soggetto, centrato (ricetta sotto) |
| `src/assets/foto/cv-ritratto.jpg` | Foto del CV in PDF: `in-chiesa-colori.jpg` con la stessa ricetta dell'hero (senza la spalla della testimone), poi ritaglio quadrato `crop=1120:1120:0:290,scale=800:800` |
| `src/assets/og-image.jpg` | Anteprima social 1200×630: nome, ruolo, marchio ZG. e il ritratto dell'hero |

### Ricetta dell'hero

A destra del soggetto, nello scatto, c'e' la testimone: lo spazio mancante a destra e' ricostruito
dal fondo della chiesa a sinistra (la colonna vuota, specchiata, sfocata e fusa sul fondo, senza
toccare il braccio), cosi' il soggetto e' centrato con lo stesso respiro ai due lati.

```bash
ffmpeg -i docs/foto/originali/in-chiesa-bn.jpg -filter_complex \
  "[0]crop=990:1900:1370:0,pad=1120:1900:0:0[p];\
   [0]crop=175:1900:1370:0,hflip,boxblur=10:1,eq=brightness=-0.08,format=rgba,\
geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*min(1,X/38)'[s];\
   [p][s]overlay=948:0,format=yuvj420p" \
  -q:v 2 src/assets/foto/hero-ritratto-bn.jpg
```

Risultato 1120×1900: testa con aria sopra (il contenitore dell'hero parte 10% sopra lo schermo
per la parallasse), mani comprese in basso. Astro la serve in AVIF + WebP.

Se cambia la foto dell'hero va rigenerata anche `src/assets/og-image.jpg`
(impaginazione: colonna sinistra Night Deep con marchio, nome in Fraunces, ruolo in corsivo
terracotta chiaro, riga dei fatti in JetBrains Mono, URL; a destra il ritratto che sfuma).
