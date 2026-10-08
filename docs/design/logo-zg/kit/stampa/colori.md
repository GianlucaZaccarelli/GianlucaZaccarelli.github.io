# Gianluca Zaccarelli — colori per la stampa

| Colore | HEX | RGB | CMYK | Pantone |
| --- | --- | --- | --- | --- |
| Inchiostro (corpo del segno, testo) | `#1C1D20` | 28 29 32 | 12 9 0 87 | — |
| Terracotta (il punto in corsa) | `#C2552D` | 194 85 45 | 0 56 77 24 | PANTONE 7592 C |
| Terracotta profondo (retro di copertina, fronte del biglietto) | `#842C00` | 132 44 0 | 0 67 100 48 | PANTONE 7600 C |
| Terracotta chiaro (punto su fondo scuro) | `#D18062` | 209 128 98 | 0 39 53 18 | — |
| Carta (fondo) | `#FBF9F6` | 251 249 246 | 0 1 2 2 | — |

- I PDF `*-cmyk.pdf` usano la quadricromia; i `*-pantone.pdf` il terracotta come tinta piatta
  (Separation) con l'alternativa CMYK qui sopra; i `*-nero.pdf` solo nero.
- **CMYK**: conversione di partenza, non un profilo colore. Va validata dalla tipografia con una
  prova colore sul suo profilo (es. FOGRA39 su carta patinata).
- **Pantone**: il più vicino a vista nella serie Solid Coated, da confermare sulla mazzetta.
- Il biglietto ha 3 mm di abbondanza (BleedBox) e il formato finito nel TrimBox.
- Nessun font nei PDF: tutte le lettere sono tracciati.
