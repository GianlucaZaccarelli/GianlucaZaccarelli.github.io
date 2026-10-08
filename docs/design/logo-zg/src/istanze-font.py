"""Istanze statiche dei font variabili del sito, per disegnare il testo in tracciati.
fontkit non legge le variazioni dai WOFF2: qui si fissano gli assi come nel sito.
Uso: python docs/design/logo-zg/src/istanze-font.py"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

NM = Path("node_modules")
OUT = Path(__file__).parent / "font"
ISTANZE = [
    ("@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2", {"wght": 400, "opsz": 72, "SOFT": 100, "WONK": 0}, "fraunces-400.ttf"),
    ("@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2", {"wght": 600, "opsz": 72, "SOFT": 100, "WONK": 0}, "fraunces-600.ttf"),
    ("@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2", {"wght": 400, "opsz": 72, "SOFT": 100, "WONK": 0}, "fraunces-400-italic.ttf"),
    ("@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2", {"wght": 500}, "jetbrains-mono-500.ttf"),
    ("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", {"wght": 400}, "inter-400.ttf"),
    ("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", {"wght": 600}, "inter-600.ttf"),
]
OUT.mkdir(exist_ok=True)
for src, assi, nome in ISTANZE:
    f = TTFont(NM / src)
    f.flavor = None
    st = instantiateVariableFont(f, assi)
    st.save(OUT / nome)
    print("scritto", nome)
