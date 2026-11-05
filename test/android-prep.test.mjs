import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(fileURLToPath(new URL('..',import.meta.url)));
const original = readFileSync(join(root,'index.html'),'utf8');
const pkg = JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
const config = JSON.parse(readFileSync(join(root,'capacitor.config.json'),'utf8'));

test('Capacitor config uses locally bundled game and matching v8 plugins', () => {
 assert.equal(config.webDir,'www');
 assert.equal(config.appId,'com.alithux.echoshot');
 for(const p of ['core','android','app','filesystem','share'])
  assert.equal(pkg.dependencies['@capacitor/'+p],'^8.0.0');
});

test('Android web shell packages offline without editing public web game', () => {
 execFileSync(process.execPath,[join(root,'scripts/prepare-android.mjs'),'--no-bundle'],{cwd:root});
 const html=readFileSync(join(root,'www/index.html'),'utf8');
 assert.equal(readFileSync(join(root,'index.html'),'utf8'),original);
 assert.match(html,/ECHOSHOT v[0-9]/);
 assert.match(html,/native-bridge\.js/);
 assert.match(html,/OFFLINE READY · ANDROID APP/);
 assert.doesNotMatch(html,/navigator\.serviceWorker\.register/);
 assert.match(html,/__ECHOSHOT_NATIVE__\?\.shareBackup/);
 assert.match(html,/ANDROID APP INSTALLED/);
 assert.match(html,/const AIM_LIMIT=Math\.PI\/2/);
 assert.match(html,/const STORAGE='echoshot-progress-v1'/);
 assert.match(html,/const MASTER_CHAPTERS=/);
 assert.ok(existsSync(join(root,'www','icons','icon-192.png')));
 assert.ok(existsSync(join(root,'www','icons','icon-512.png')));
 assert.ok(existsSync(join(root,'www','native-bridge.js')));
 assert.equal(existsSync(join(root,'www','sw.js')),false);
 const game=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(game);
 assert.doesNotThrow(()=>new Function(game));
});
