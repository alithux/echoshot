# ThaanaPDF v1.5 · Dhivehi PDF Editor

Standalone, browser-based Dhivehi PDF editor deployed from an isolated branch of the ECHOSHOT repository. ECHOSHOT main remains unaffected.

## Implemented milestones

- **v1.1:** IndexedDB autosave of original PDF and editable overlays; recent projects; backup/restore .thaanapdf
- **v1.2:** Touch move/resize, Undo/Redo, copy/paste/duplicate annotations
- **v1.3:** Insert PNG/JPEG/WebP images, draw signatures, rectangles and lines; export to PDF
- **v1.4:** Visually cover and replace selectable existing PDF text; manual white cover rectangles for scanned/other PDFs
- **v1.5:** Mobile first-fit page, swipeable compact toolbar, bottom-sheet properties, install prompt/PWA caching

Faruma subset is built in for Thaana; importing another font remains optional. User PDFs are edited locally in the browser and aren't uploaded to a backend.

## Important limitations

- PDF text replacement is **visual cover-and-replace**, **not native PDF content editing**. Covered source text remains extractable and this MUST NEVER be used for private/confidential redaction.
- Newly added Faruma text is saved as a rasterized overlay, so it isn't searchable/editable in the exported PDF; reopen the saved editable ThaanaPDF project to edit it.
- Rotated PDF pages aren't yet supported by PDF export.
- No OCR for scanned PDF text.
- Offline app shell is cached; PDF libraries may need a prior online load.
- Browser storage may be cleared by the OS or by user actions; use Backup Project for important work.
- Font redistribution permission must be verified for any public releases.

## Render

- Static site: https://thaana-pdf-editor.onrender.com/
- Repository: https://github.com/alithux/echoshot
- Branch: deploy/thaana-pdf-editor
- Render build command:
  mkdir -p thaana-output && cp thaana-editor/index.html thaana-editor/manifest.webmanifest thaana-editor/icon.svg thaana-editor/sw.js thaana-output/
- Publish directory: thaana-output

## Smoke test

Run node thaana-editor/test.mjs from the repo root (Node 22). GitHub Actions workflow .github/workflows/thaana-check.yml runs source checks on push.

## User acceptance checklist

1. Create A4 and enter Dhivehi with fili marks; Save Text, drag and resize.
2. Verify local project auto-restores after closing browser and opening again.
3. Undo/redo and copy/paste.
4. Add an image, rectangle, line, and handwritten signature. Export PDF and verify placement.
5. Select text in an existing PDF and visually cover-and-replace it. Confirm warning remains visible.
6. Install on Android using Add to Home Screen; test bottom-sheet controls and page fitting.
7. Reopen exported PDFs in Android PDF viewer; inspect RTL line wrapping and fonts.
