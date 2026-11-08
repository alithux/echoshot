import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=path.dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const rel=pathname==='/'?'/index.html':pathname;
 const abs=path.resolve(root,'.'+rel);
 if(!abs.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(abs,(err,data)=>{
  if(err){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(abs)]||'application/octet-stream'});
  res.end(data);
 });
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port;
let browser;
try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:900}});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>typeof document.querySelector('#createForm')?.onclick==='function',{timeout:45000});
 await page.locator('#createForm').click();
 await page.locator('#formOverlay').waitFor({state:'visible'});
 assert.equal(await page.locator('#studioBuild').isVisible(),true);
 await page.locator('[data-template="patient"]').click();
 await page.waitForTimeout(600);
 assert.match(await page.locator('#formTitle').inputValue(),/ބަލިމީހާ/);
 const fields=await page.locator('#formFields .form-field').count();
 assert.ok(fields>=7,'Expected form template fields, got '+fields);
 await page.locator('[data-studio-tab="design"]').click();
 assert.ok(await page.locator('#studioDesign').isVisible());
 assert.ok((await page.locator('[data-studio-tab="design"]').getAttribute('class')).includes('active'),'Design tab must indicate active state');
 assert.ok(!(await page.locator('[data-studio-tab="build"]').getAttribute('class')).includes('active'),'Build tab must be deselected');
 const screenDir=path.join(root,'test-screenshots');fs.mkdirSync(screenDir,{recursive:true});
 await page.screenshot({path:path.join(screenDir,'studio-desktop-design.png')});

 await page.locator('#studioColorPalette [data-color="#058A83"]').click();
 await page.locator('#formHeaderStyle').selectOption('banner');
 await page.locator('#formResponseStyle').selectOption('boxes');
 await page.locator('#formNumbered').uncheck();
 assert.ok(await page.locator('#formUndo').isEnabled(),'Undo should activate after design edits');
 await page.locator('#formUndo').click();await page.locator('#formRedo').click();
 assert.equal(await page.locator('#formAccent').inputValue(),'#058a83');
 await page.locator('[data-studio-tab="build"]').click();
 await page.locator('#formAddType').selectOption('email');
 await page.locator('#formAddField').click();
 await page.locator('#formFields .form-field').last().locator('input.dv-input').first().fill('އީމެއިލް');
 await page.locator('#saveFormNow').click();
 await page.waitForFunction(()=>document.querySelector('#formSaveState')?.textContent.includes('Saved'),{timeout:15000});
 const filled = await page.locator('#formPreview').evaluate(node=>{
  const ctx=node.getContext('2d'),d=ctx.getImageData(50,50,1,1).data;
  return [...d];
 });
 assert.equal(filled[3],255,'Page preview should render opaque pixels');
 const [download]=await Promise.all([page.waitForEvent('download',{timeout:45000}),page.locator('#downloadFormPdf').click()]);
 const exportFile=await download.path();
 const pdf=fs.readFileSync(exportFile);
 assert.ok(pdf.subarray(0,8).toString().startsWith('%PDF-'),'Export must be a PDF');
 assert.ok(pdf.byteLength>2000,'Exported PDF too small');
 console.log('Before reload',await page.evaluate(async()=>{const id=localStorage.getItem('thaana-form-last');const db=await new Promise((rs,rj)=>{const req=indexedDB.open('ThaanaPDFFormDrafts');req.onsuccess=()=>rs(req.result);req.onerror=()=>rj(req.error)});const rec=await new Promise(rs=>{const tx=db.transaction('forms','readonly');const r=tx.objectStore('forms').getAll();r.onsuccess=()=>rs(r.result.map(x=>({id:x.id,title:x.title})));});db.close();return{id,records:rec,title:document.querySelector('#formTitle')?.value}}));
 await page.reload({waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>typeof document.querySelector('#createForm')?.onclick==='function',{timeout:45000});
 await page.locator('#createForm').click();
 await page.locator('#formOverlay').waitFor({state:'visible'});
 console.log('After reopen',await page.evaluate(()=>({title:document.querySelector('#formTitle')?.value,id:localStorage.getItem('thaana-form-last'),save:document.querySelector('#formSaveState')?.textContent})));
 await page.waitForFunction(()=>document.querySelector('#formTitle')?.value.includes('ބަލިމީހާ'),{timeout:7000});
 assert.match(await page.locator('#formTitle').inputValue(),/ބަލިމީހާ/,'Draft must restore');
 assert.equal(await page.locator('#formHeaderStyle').inputValue(),'banner','Design should restore');
 await page.setViewportSize({width:390,height:844});
 await page.locator('#formMobilePreview').click();
 assert.ok(await page.locator('#formPreview').isVisible(),'Mobile PDF preview should be visible');
 await page.waitForFunction(()=>{
  const c=document.querySelector('#formPreview'),x=Math.floor(c.width*.1),y=Math.floor(c.height*.04),d=c.getContext('2d').getImageData(x,y,1,1).data;
  return d[0]+d[1]+d[2]<700;
 },{timeout:15000});
 await page.screenshot({path:path.join(screenDir,'studio-mobile-preview.png')});

 await page.locator('#formMobileBuild').click();
 assert.ok(await page.locator('#studioBuild').isVisible(),'Mobile build panel should be visible');
 await page.screenshot({path:path.join(screenDir,'studio-mobile-build.png')});

 // Verify the institutional grid inspired by official Maldivian form layouts.
 await page.setViewportSize({width:1440,height:900});
 await page.locator('[data-template="official"]').click();
 await page.waitForFunction(()=>document.querySelector('#formTitle')?.value.includes('ރަސްމީ'),{timeout:10000});
 assert.ok(await page.locator('#formFields .form-field').count()>=10,'Official template should have grouped detail rows');
 await page.locator('[data-studio-tab="design"]').click();
 assert.equal(await page.locator('#formLayout').inputValue(),'grid','Official RTL table should be the default');
 assert.equal(await page.locator('#formLabelWidth').inputValue(),'40');
 await page.waitForTimeout(300);
 await page.locator('#formPreview').screenshot({path:path.join(screenDir,'official-form-grid-page.png')});
 await page.locator('#formLayout').selectOption('stacked');
 assert.equal(await page.locator('#formLayout').inputValue(),'stacked');
 await page.locator('#formLayout').selectOption('grid');
 await page.locator('#formLabelWidth').selectOption('46');
 await page.locator('#formPaperDesign').selectOption('A5');
 await page.waitForFunction(()=>document.querySelector('#formPreviewInfo')?.textContent.includes('A5'),{timeout:12000});
 const [officialPdf]=await Promise.all([page.waitForEvent('download',{timeout:45000}),page.locator('#downloadFormPdf').click()]);
 const officialBytes=fs.readFileSync(await officialPdf.path());
 assert.ok(officialBytes.subarray(0,8).toString().startsWith('%PDF-'),'Official form should export as PDF');
 assert.ok(officialBytes.byteLength>3000,'Official form export has no contents');
 assert.equal(errors.length,0,'Unexpected browser errors: '+errors.join('; '));
 console.log('PASS: Form Studio template, theme, fields, PDF export, IndexedDB restore, mobile layout');
 await context.close();
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
