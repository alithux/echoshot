const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const raw=html.split('<script>')[1].split('</script>')[0];
const engine=raw.slice(raw.indexOf('const WORLD'),raw.indexOf('const $=id'));
const {getLevel,makeShot,stepShot,LEVEL_COUNT,crystalCount,parTime,gateIsOpen}=Function(engine+';return {getLevel,makeShot,stepShot,LEVEL_COUNT,crystalCount,parTime,gateIsOpen};')();
assert.equal(LEVEL_COUNT,75);
let passages=0;
for(let n=1;n<=75;n++){
 const level=getLevel(n),shot=makeShot(level,level.angle);
 let armed=null,opened=null,bounced=null;
 for(let k=0;k<2300&&!shot.done;k++){
  stepShot(shot,1/180);
  for(const e of shot.events){
   if(e.type==='switch'&&armed===null)armed=e.t;
   if(e.type==='gateOpen'&&opened===null)opened=e.t;
   if(e.type==='gateBlock'&&bounced===null)bounced=e.t;
  }
 }
 assert(shot.success,'Reference shot failed on level '+n);
 assert.equal(shot.removed.size,level.targets.length);
 assert.equal(shot.shattered.size,crystalCount(level));
 assert(shot.elapsed<=shot.timeLimit+0.01);
 assert(parTime(level)>=shot.elapsed-.1);
 if(n>=58){
  assert.equal(shot.gateBlocked.size,1,'Gate did not ricochet on '+n);
  assert.equal(shot.gateCharged.size,1,'Gate did not charge on '+n);
  assert(bounced<opened,'Gate bounced too late on '+n);
  assert(opened-armed>=.26&&opened-armed<=.29,'Wrong charge duration on '+n);
  assert(gateIsOpen(shot,'circuit-1'),'Gate did not open on '+n);
  assert.equal(level.targets.length,7+Math.floor((n-51)/5));
  if(shot.gateTraversed.size)passages++;
 }
}
const historical='d0e65a194efe7c5bd5a1eac22c42396d8aef97700bed0d8d50e1cc2136eaac9f';
const current=crypto.createHash('sha256').update(JSON.stringify(Array.from({length:57},(_,i)=>getLevel(i+1)))).digest('hex');
assert.equal(current,historical,'Levels 1–57 were changed');
console.log('PASS: 75 solvable levels, 18 timed gate ricochets, '+passages+' post-open gate passages, legacy 1–57 unchanged.');
