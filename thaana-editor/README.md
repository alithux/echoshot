# ThaanaPDF v1.6 · Dhivehi PDF & Form Editor

Standalone, browser-based Dhivehi PDF editor deployed from an isolated branch of the ECHOSHOT repository. ECHOSHOT main remains unaffected.

## Implemented milestones

- **v1.1:** IndexedDB autosave of original PDF and editable overlays; recent projects; backup/restore .thaanapdf
- **v1.2:** Touch move/resize, Undo/Redo, copy/paste/duplicate annotations
- **v1.3:** Insert PNG/JPEG/WebP images, draw signatures, rectangles and lines; export to PDF
- **v1.4:** Visually cover and replace selectable existing PDF text; manual white cover rectangles for scanned/other PDFs
- **v1.5:** Mobile first-fit page, swipeable compact toolbar, bottom-sheet properties, install prompt/PWA caching
- **v1.6:** Build printable Dhivehi forms with embedded Faruma, RTL labels, registration/request/consent/questionnaire templates, customizable short/long answer, date, checkbox, single/multiple-choice, signature and section fields. Live paginated A4/A5 preview; local form draft save, backup and import; multi-page PDF export.

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

## Using the Dhivehi Form Builder (v1.6)

1. Open the web app and select **＋ Dhivehi Form** in the header.
2. Choose Blank, Registration, Request, Consent or Questionnaire, then write the title and instructions in Dhivehi.
3. Add fields and select their type. Reorder with the ↑ / ↓ controls, mark required responses, and enter answer choices one per line.
4. Check the live preview and navigate generated A4/A5 pages.
5. Press **Export Form PDF** to download the printable document; use **Save draft** or **Backup JSON** to keep the editable form design.

All form draft data is stored locally via IndexedDB (`ThaanaPDFFormDrafts`). Forms are **not uploaded** to Render. Output PDFs are flat, printable pages: people cannot fill them interactively in a PDF reader, and flattened text is not searchable. This is a PDF form design/generation feature, not secure removal of existing PDF data.

## Testing

The automated `node thaana-editor/test.mjs` suite checks JavaScript syntax, UI controls, bundled font, and multi-page A4/A5 form geometry with synthetic fields. Browser acceptance still needs testing on real Android devices (including Faruma + fili marks, local saves, and actual PDF export).
