const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const code=html.split('<script>')[1].split('</script>')[0].split('const $=id')[0];
const {getLevel,makeShot,stepShot,requiredObjectives,crystalCount,LEVEL_COUNT}=Function(code+';return {getLevel,makeShot,stepShot,requiredObjectives,crystalCount,LEVEL_COUNT};')();
const counts=[4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,11,11,11,11,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11];
const portalPhysical=[38,42,59],echoPhysical=[21,24,52,54,60,62,64],motionPhysical=[39,43,45,47,49,50];
const run=(l,a=l.angle)=>{const s=makeShot(l,a);for(let k=0;k<2200&&!s.done;k++)stepShot(s,1/180);return s;};
assert.equal(LEVEL_COUNT,75);
const protectedStages=[];
for(let n=1;n<=75;n++){
 const l=getLevel(n),s=run(l);
 assert(s.success,'stage '+n+' unsolvable');
 assert.equal(l.targets.length,counts[n-1],'target count changed '+n);
 assert.equal(s.removed.size,l.targets.length);
 assert.equal(s.shattered.size,crystalCount(l));
 assert(s.elapsed<=(n>=35?12:8.4)+.001);
 assert(requiredObjectives(l,s).every(x=>x.done),'incomplete objective '+n);
 if(n<=20||n===67)protectedStages.push(l);
 if(portalPhysical.includes(n))assert(!run({...l,portals:[]}).success,'portal optional '+n);
 if(echoPhysical.includes(n)){
  assert(s.echoesUsed.size>0,'echo not fired '+n);
  assert(!run({...l,obstacles:l.obstacles.filter(o=>o.type!=='resonator')}).success,'resonator optional '+n);
 }
 if(motionPhysical.includes(n))assert(!run({...l,targets:l.targets.map(t=>({...t,moving:false}))}).success,'motion optional '+n);
 if(n>=35&&n<=50){
  assert(l.objectives?.portalUse,'missing portal objective '+n);
  assert(s.portalsUsed>0&&requiredObjectives(l,s).some(x=>x.key==='portalUse'));
  assert(!run({...l,portals:[]}).success);
 }
}
const hash=crypto.createHash('sha256').update(JSON.stringify(protectedStages)).digest('hex');
assert.equal(hash,'b34a5b064f572a3ac0d8a5e263e115745d06010cb451cc493da591cdbdd09836','levels 1–20 or 67 modified');
assert(html.includes("const STORAGE='echoshot-progress-v1'"));
assert(html.includes('const AIM_LIMIT=Math.PI/2'));
assert(html.includes("$('soundBtn').addEventListener('click'"));
assert(html.includes('function updateObjectivePanel()'));
console.log('PASS: 75/75 seed solutions; unchanged target counts and 21 protected levels; 7 echo, 3 portal, 6 moving-target physical dependencies; 16 portal objectives; save/iPhone/SFX intact.');
