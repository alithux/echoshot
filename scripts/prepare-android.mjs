/**
 * Prepare ECHOSHOT's standalone web game for the Capacitor Android WebView.
 * The repository's root index.html and public/ remain unchanged for Render.
 * Run npm install first. --no-bundle is reserved for source-only tests.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const build = join(root, 'www');
const source = readFileSync(join(root, 'index.html'), 'utf8');
const ensure = (text, pattern, name) => {
  if (!text.includes(pattern) || text.split(pattern).length !== 2) throw Error('Expected one ' + name + ' in ECHOSHOT index.html');
};
ensure(source, "if('serviceWorker' in navigator){", 'PWA service-worker block');
ensure(source, "$('exportBtn').addEventListener('click',()=>{", 'export handler');
ensure(source, "function updateInstallUI(){", 'installation controls');
ensure(source, "const payload={app:'ECHOSHOT',format:1", 'backup payload');
ensure(source, '</head>', 'head close');
ensure(source, '</script>', 'main script close');

rmSync(build, { recursive: true, force: true });
mkdirSync(build, { recursive: true });
cpSync(join(root, 'public'), build, {recursive: true, filter: file => basename(file) !== 'sw.js'});
let html = source;

// Capacitor loads bundled assets offline, and doesn't need a service worker.
// Remove the PWA registration and its network status listeners from the native copy.
const swStart = html.indexOf("if('serviceWorker' in navigator){");
const afterSW = 'setSound();refreshPreview();updateProgress();requestAnimationFrame(tick);';
const swEnd = html.indexOf(afterSW, swStart);
if (swEnd <= swStart) throw Error('Cannot find end of PWA service-worker setup');
html = html.slice(0, swStart) + "$('offlineBadge').textContent='OFFLINE READY · ANDROID APP';\n" + html.slice(swEnd);

// Native app is already installed; avoid misleading PWA install instructions.
html = html.replace('function updateInstallUI(){', "function updateInstallUI(){\n $('installBtn').textContent='ANDROID APP INSTALLED';\n $('installBtn').disabled=true;\n $('installHelp').textContent='You are playing the offline Android app. Progress stays on this phone; export a backup before uninstalling.';\n return;\n");

// Export progress through the native Android Sharesheet rather than WebView downloads.
html = html.replace("$('exportBtn').addEventListener('click',()=>{", "$('exportBtn').addEventListener('click',async()=>{");
const backupAnchor = " const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});";
ensure(html, backupAnchor, 'backup download');
const nativeBackup = [
 " const backupName='ECHOSHOT-progress-'+new Date().toISOString().slice(0,10)+'.json';",
 " if(window.__ECHOSHOT_NATIVE__?.shareBackup){",
 "   try{",
 "     await window.__ECHOSHOT_NATIVE__.shareBackup(backupName,JSON.stringify(payload,null,2));",
 "     reportBackup('Choose a destination to save your progress backup.');",
 "   }catch(e){reportBackup('Could not share backup: '+(e.message||e),true);}",
 "   return;",
 " }",
 ""
].join('\n');
html = html.replace(backupAnchor, nativeBackup + backupAnchor);

// The companion module uses Capacitor's App, Filesystem and Share plugins.
html = html.replace('</head>', '  <script type="module" src="./native-bridge.js"></script>\n</head>');
writeFileSync(join(build, 'index.html'), html);
if (!process.argv.includes('--no-bundle')) {
  const esbuildPath = join(root, 'node_modules', 'esbuild', 'lib', 'main.js');
  if (!existsSync(esbuildPath)) throw Error('Missing npm dependencies. Run npm install before npm run android:prepare.');
  const {build: bundle} = await import('esbuild');
  await bundle({
    entryPoints:[join(root,'scripts','native-bridge.mjs')],
    outfile:join(build,'native-bridge.js'),
    bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,
  });
} else {
  writeFileSync(join(build,'native-bridge.js'), '/* Build-time test stub. Run npm install to create the native bundle. */\n');
}
console.log('Android game packaged in ' + build + ' (' + Buffer.byteLength(html) + ' bytes).');
