# Asad Custom Script Converter V2

100% static client-side web application for the Asad Custom Script alphabet.

## V2 features
- Roman English ↔ Custom Script
- Official TTF rendering
- Full A-Z / 0-9 alphabet reference
- Custom web keyboard
- Copy converted text
- Live font preview
- 280° print mode
- Font Lab with browser-local glyph transform presets
- Unicode Private Use Area mapping
- JSON import/export for glyph presets
- Mobile-first UI
- No backend

## Source of truth
The supplied `assets/fonts/Asad_Custom_Script_Alphabet.ttf` is the visual source of truth. V2 does not invent replacement glyph artwork.

## Important font-editor behavior
The built-in Font Lab stores transformation presets locally in the browser. It intentionally does not overwrite the original TTF. This protects the source font while allowing controlled editing experiments. A true TTF outline editor/exporter can be added as a later module using the same glyph mapping.

## Deployment
The project is designed for Vercel or any static host. No build command, server, database, or environment variables are required.
