"""Font del sito alleggeriti: stessi file variabili di @fontsource-variable, ridotti a
- caratteri latini (Latin-1, punteggiatura tipografica, frecce, euro): tutto il testo del sito;
- intervalli d'asse davvero usati (Fraunces wght 100-600, WONK fisso a 1 come il default;
  Inter wght 400-700; JetBrains Mono wght 400-600);
- niente hinting (inutile nei browser moderni).
Gli altri script (giapponese dell'intro) ricadono sui font di sistema, come prima.

Uso: python scripts/subset-fonts.py   (serve: pip install fonttools brotli)
I file generati in src/fonts/ sono versionati: build e CI non hanno bisogno di Python.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

NM = Path('node_modules/@fontsource-variable')
OUT = Path('src/fonts')

UNICODES = (
    list(range(0x20, 0x7F))            # ASCII
    + list(range(0xA0, 0x100))         # Latin-1: lettere accentate, « », ·, ©, °
    + [0x131, 0x152, 0x153, 0x2C6, 0x2DC]
    + list(range(0x2010, 0x2028))      # trattini (anche U+2011 non divisibile), virgolette, …, •
    + list(range(0x2030, 0x203B))      # ‰ ′ ″ ‹ ›
    + [0x2044, 0x20AC, 0x2122, 0x2212, 0x2215]
    + list(range(0x2190, 0x219A))      # frecce ← ↑ → ↓ ↗
)

FONT = [
    ('fraunces/files/fraunces-latin-full-normal.woff2', {'wght': (100, 600), 'WONK': 1}, 'fraunces-normal.woff2'),
    ('fraunces/files/fraunces-latin-full-italic.woff2', {'wght': (100, 600), 'WONK': 1}, 'fraunces-italic.woff2'),
    ('inter/files/inter-latin-wght-normal.woff2', {'wght': (400, 700)}, 'inter.woff2'),
    ('jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2', {'wght': (400, 600)}, 'jetbrains-mono.woff2'),
]

OUT.mkdir(parents=True, exist_ok=True)
for src, assi, nome in FONT:
    f = TTFont(NM / src)
    opz = subset.Options()
    opz.layout_features = ['*']   # tiene rvrn (WONK), liga, calt, tnum...
    opz.hinting = False
    opz.name_IDs = ['*']
    opz.notdef_outline = True
    opz.flavor = 'woff2'
    s = subset.Subsetter(opz)
    s.populate(unicodes=UNICODES)
    s.subset(f)
    # prima i caratteri, poi gli assi (al contrario fontTools perde la variazione di .notdef)
    f = instantiateVariableFont(f, assi, updateFontNames=False)
    f.flavor = 'woff2'
    f.save(OUT / nome)
    prima = (NM / src).stat().st_size // 1024
    dopo = (OUT / nome).stat().st_size // 1024
    print(f'{nome}: {prima} KB -> {dopo} KB')
