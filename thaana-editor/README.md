# ThaanaPDF Render deployment branch

This is a standalone browser-only edition of the Dhivehi PDF overlay editor deployed to Render. The original React/Vite source ZIP is delivered in the ChatGPT conversation. This isolated branch leaves the ECHOSHOT main branch unchanged.

## Features
- Open PDFs or create an A4 page
- Dhivehi RTL by default; upload user's own Faruma font; Noto Sans Thaana fallback
- Place, drag and format text boxes; Thaana soft keyboard
- Export edited PDF as flattened text stamps while preserving original page content
- No server-side document uploads

## Render
- Source repository: alithux/echoshot
- Branch: deploy/thaana-pdf-editor
- Build command: mkdir -p thaana-output && cp thaana-editor/index.html thaana-editor/manifest.webmanifest thaana-editor/icon.svg thaana-editor/sw.js thaana-output/
- Publish path: thaana-output

This standalone build imports PDF.js and pdf-lib from pinned jsDelivr URLs, so a network connection is required to load those libraries. The app's PDF data remains in the user's browser. Font licenses must be checked before redistributing Faruma.
