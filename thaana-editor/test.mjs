import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8');
const inline=html.match(/<script type="module">([\s\S]*?)<\/script>/);
assert.ok(inline,'Inline JS module must exist');
const check=spawnSync(process.execPath,['--check','--input-type=module'],{input:inline[1],encoding:'utf8'});
assert.equal(check.status,0,'JavaScript syntax: '+(check.stderr||check.stdout));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'HTML element IDs must be unique');
const idset=new Set(ids);
for(const m of inline[1].matchAll(/\$\(['"]([^'"]+)['"]\)/g))assert.ok(idset.has(m[1]),'Missing HTML element: '+m[1]);
for(const id of ['saveProject','projectsList','undo','redo','pasteObject','addImage','addRect','addLine','addSignature','replaceMode','replaceProceed','toggleProperties','installApp','export'])assert.ok(idset.has(id),'Expected feature missing '+id);
const match=html.match(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/);
assert.ok(match,'Embedded Faruma font required');
const binary=Buffer.from(match[1],'base64');assert.ok(binary.byteLength>1000);assert.equal(binary.toString('latin1',0,4),'wOF2');
assert.match(html,/const DBNAME='ThaanaPDFProjects'/);
assert.match(html,/original PDF text remains/i);
assert.match(html,/Cover &amp; replace/);
assert.match(html,/beforeinstallprompt/);
console.log('PASS: embedded font, syntax, HTML IDs, controls, features and user-facing warnings');


/* Form-builder smoke tests: verify controls and page-break geometry without a browser. */
import vm from 'node:vm';
for(const id of ['createForm','formOverlay','formTitle','formIntro','formFooter','formFields','formTemplate','formAddField','formPreview','formPages','formPrev','formNext','saveFormNow','formSaved','formLoad','formBackup','formRestore','downloadFormPdf'])assert.ok(idset.has(id),'Missing form builder control: '+id);
assert.match(inline[1],/const FORM_KIND=/);
assert.match(inline[1],/async function saveForm\(/);
assert.match(inline[1],/function drawFormPage\(/);
assert.match(inline[1],/async function renderFormPreview\(/);
assert.match(inline[1],/async function formStorage\(/);
const from=inline[1].indexOf('function formTextLines('),to=inline[1].indexOf('function formDrawLines(');
assert.ok(from>0&&to>from,'Form layout functions must exist');
const ctx={document:{createElement:()=>({getContext:()=>({measureText:v=>({width:Array.from(String(v)).length*7})})})},FA:'sans-serif'};
vm.createContext(ctx);vm.runInContext(inline[1].slice(from,to)+'\nthis.layoutForm=layoutFormPages;',ctx);
function field(n,type='short',options=''){return {id:String(n),type,label:'ފުރިހަމަ ނަން '+n,hint:'',required:true,options};}
for(const paper of ['A4','A5']){
 const items=Array.from({length:40},(_,n)=>field(n,n%5===0?'long':'short'));
 items.push(field(41,'multi',Array.from({length:30},(_,i)=>'ޖަވާބު '+i).join('\n')));
 items.push(field(42,'signature'));
 const layout=ctx.layoutForm({paper,title:'ރަޖިސްޓްރޭޝަން ފޯމު',intro:'އިރުޝާދު',fields:items});
 assert.ok(layout.pages.length>2,'Expected multiple pages '+paper);
 for(const page of layout.pages){
  for(let i=0;i<page.blocks.length;i++){
   const block=page.blocks[i];
   assert.ok(block.y>=0&&block.height>0,'Valid field geometry');
   assert.ok(block.y+block.height<=layout.paper.h-60,'Field must fit before footer on '+paper+' ('+block.field.id+')');
   if(!block.section){
    assert.ok(block.answerOffset>=block.topPad+block.labelLines.length*21+block.hintLines.length*16+8,'Label/hints must be above answer area');
    assert.ok(block.height>block.answerOffset+22,'Every field needs visible answer space');
   }
   const next=page.blocks[i+1];
   if(next)assert.ok(next.y-(block.y+block.height)>=4,'Every detail needs its own vertically separated row on '+paper);
  }
 }
 assert.ok(layout.pages.flatMap(p=>p.blocks).some(b=>b.field.id==='42'),'Signature must be laid out');
}
assert.match(inline[1],/ctx\.strokeRect\(left\+\.4,top\+\.4,rowWidth-\.8,block\.height-\.8\)/,'Each detail must draw its own border');
console.log('PASS: separate form-detail rows, label/answer spacing, fields, and A4/A5 pagination');
