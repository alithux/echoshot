# ThaanaPDF v2.1 · Dhivehi PDF & Form Studio

Standalone, browser-based Dhivehi PDF editor deployed from an isolated branch of the ECHOSHOT repository. ECHOSHOT main remains unaffected.

## Implemented milestones

- **v1.1:** IndexedDB autosave of original PDF and editable overlays; recent projects; backup/restore .thaanapdf
- **v1.2:** Touch move/resize, Undo/Redo, copy/paste/duplicate annotations
- **v1.3:** Insert PNG/JPEG/WebP images, draw signatures, rectangles and lines; export to PDF
- **v1.4:** Visually cover and replace selectable existing PDF text; manual white cover rectangles for scanned/other PDFs
- **v1.5:** Mobile first-fit page, swipeable compact toolbar, bottom-sheet properties, install prompt/PWA caching
- **v1.6:** Build printable Dhivehi forms with embedded Faruma, RTL labels, registration/request/consent/questionnaire templates, customizable short/long answer, date, checkbox, single/multiple-choice, signature and section fields. Live paginated A4/A5 preview; local form draft save, backup and import; multi-page PDF export.
- **v2.0:** Rebuilt professional Form Studio workspace with Build, Design and My Forms navigation; structured template cards including patient intake and leave request; logo branding, five color themes plus custom colors; classic/banner/minimal PDF headers; answer boxes/lines, question numbering, required markers, compact spacing, page numbering; phone/email/number/time fields; field drag reorder and duplication; library with copy/open; mobile preview navigation, undo/redo and improved transactional save reliability. Real Chromium UI/export tests.
- **v2.1:** Institutional RTL grid layout inspired by Maldives government and BML application-form structure (without copying their branding). Dhivehi labels on the right, responses on the left, one detail per ruled table row; section headers across full width; segmented 8-character ID cells, A4/A5 pagination and avoid orphan section titles. Stacked layout remains optional; label column width can be 34/40/46%.

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

## Form Studio 2.0 acceptance checklist

- From **+ Dhivehi Form** in the main editor, select a form template or Blank.
- Use **Build** to edit the document title, instructions, footer and questions; drag the reorder handle or use arrows.
- Use **Design** to select a color, header style, answer style, A4/A5 paper and upload a local organization logo.
- Use **My Forms** to reopen a saved draft or create a copy. Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z are available when not focused in an input.
- Live preview and **Export Form PDF** use the same painter. Download a JSON backup as an additional safeguard.
- The output is still a printable flattened PDF, not an interactive fillable AcroForm. Avoid confusing the visual text replacement feature with secure redaction.
- For privacy, all document content and form designs remain in browser/IndexedDB; the app code and libraries are loaded over the internet.

## Quality gates

- `node thaana-editor/test.mjs`: syntax, source hooks, type/pagination limits.
- `node thaana-editor/e2e.mjs` (Playwright): Chromium test of design, forms, exported PDF, reopening a draft and mobile preview.
- The CI workflow collects desktop/mobile screenshots for visual review.
- The changes have not undergone an independent security audit, accessibility certification or full cross-device QA; test representative real-world PDFs before high-stakes use.

## Official-grid form layout references

These public forms were used only for layout and interaction reference:
- Maldives Ministry of Transport vehicle registration form: https://trade.gov.mv/wp-content/uploads/Vehicles-Registration-Application-form.pdf
- Bank of Maldives personal account opening form: https://www.bankofmaldives.com.mv/storage/file/927/11515/personal-account-opening-application-form-en.pdf

The new **Official grid** is the default and can be changed under **Design → Document layout**. The grid is right-to-left: label cells on the right, answer cells on the left, thin rules separating rows, full-width shaded section headers. **Stacked rows** is still available for less formal designs.

Visual structures are original and not copies of either institution's logos, document text, styling, or branding. Printable PDFs are not interactive fillable forms.
