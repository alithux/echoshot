const assert=require('node:assert/strict'),fs=require('node:fs');
const files=(f)=>fs.readFileSync(__dirname+'/'+f,'utf8');
const html=files('index.html');
const source=html.split('<script>')[1].split('</script>')[0].split('const $=id')[0];
const {getLevel,makeShot,stepShot,crystalCount,objectivesMet,LEVEL_COUNT}=Function(source+';return {getLevel,makeShot,stepShot,crystalCount,objectivesMet,LEVEL_COUNT};')();
const BASELINE_TARGET_COUNTS=[4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,11,11,11,11,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11];
function run(l,a=l.angle){const s=makeShot(l,a);for(let k=0;k<720&&!s.done;k++)stepShot(s,1/60);return s;}
assert.equal(LEVEL_COUNT,75);
let curated=0,clear=0,ablation=0;
for(let n=1;n<=75;n++){
 const l=getLevel(n),s=run(l);
 assert(s.success,`stage ${n} unsolvable`);assert.equal(s.removed.size,l.targets.length);
 assert.equal(s.shattered.size,crystalCount(l));assert(objectivesMet(s));
 assert(Math.abs(s.elapsed)<=12.01);
 if(n===28||n===30||n===32){
  const no=run({...l,portals:[]});assert(!no.success,`stage ${n} should require portal route`);curated++;
 }
 if(n===67){const staticVersion={...l,targets:l.targets.map(t=>({...t,moving:false}))};assert(!run(staticVersion).success,'stage 67 should require target movement');curated++;}
 if(n>=58){
  assert(s.gateBlocked.size>0&&s.gateCharged.size>0,`stage ${n} needs gate bounce & opening`);
  assert(s.diodePasses.size>0||n<66,`stage ${n} needs diode`);
  assert(s.gateTraversed.size>0||!l.objectives.gateTraverse,`stage ${n} needs traversal`);
  const withoutCircuit={...l,obstacles:l.obstacles.filter(o=>!['switch','gate'].includes(o.type))};
  const no=run(withoutCircuit);assert(!no.success,`stage ${n} should require the circuit objective`);ablation++;
 }
 if(n<=27 || n>=33 && n<=57 || n>=58 && n<=66 || n>=68){
  assert.equal(l.targets.length,BASELINE_TARGET_COUNTS[n-1],`target count changed at ${n}`);
 }
 clear++;
}
const s=html.match(/const STORAGE='([^']+)'/)?.[1];assert.equal(s,'echoshot-progress-v1');
assert(html.includes('const AIM_LIMIT=Math.PI/2'),'iPhone full-range limit regressed');
console.log(`PASS ${clear}/75 solutions; ${curated} authored mechanic puzzles; ${ablation} mandatory circuit stages; existing storage and iPhone input retained.`);
