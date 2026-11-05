// ECHOSHOT v0.9.2 portal spacing and solvability regression.
// Run: node test_portal_spacing.cjs
const assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const js=html.split('<script>')[1].split('</script>')[0].split('const $=id')[0];
const {getLevel,makeShot,stepShot,crystalCount,objectivesMet,LEVEL_COUNT}=Function(js+';return {getLevel,makeShot,stepShot,crystalCount,objectivesMet,LEVEL_COUNT};')();
const EXPECTED_TARGETS=[4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,11,11,11,11,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11];
assert.equal(LEVEL_COUNT,75);
const portalDistances=[];
for(let n=1;n<=75;n++){
 const level=getLevel(n);
 assert.equal(level.targets.length,EXPECTED_TARGETS[n-1], 'Changed target count on stage '+n);
 const shot=makeShot(level,level.angle);
 for(let k=0;k<2400&&!shot.done;k++)stepShot(shot,1/180);
 assert(shot.success,'Reference shot failed stage '+n);
 assert.equal(shot.removed.size,level.targets.length,'Missing target on '+n);
 assert.equal(shot.shattered.size,crystalCount(level),'Missing crystal on '+n);
 assert(objectivesMet(shot),'Incomplete objective on '+n);
 if(level.portals?.length===2){
  const [a,b]=level.portals;
  portalDistances.push(Math.hypot(a.x-b.x,a.y-b.y));
 }
}
assert.equal(portalDistances.length,45);
assert.equal(portalDistances.filter(d=>d<140).length,5,'Portal pairs too close');
assert.equal(portalDistances.filter(d=>d>=160).length,34,'Not enough widely spaced pairs');
const avg=portalDistances.reduce((a,b)=>a+b,0)/portalDistances.length;
assert(avg>168&&avg<171,'Unexpected mean distance '+avg);
assert(html.includes('const AIM_LIMIT=Math.PI/2'),'iPhone aiming changed');
assert(html.includes("const STORAGE='echoshot-progress-v1'"),'Save key changed');
assert(html.includes('WARP_ENTRY_DURATION=.235')&&html.includes('WARP_EXIT_DURATION=.31'),'Warp visual timing changed');
console.log('PASS 75/75 reference solutions, 45 portal pairs (mean '+avg.toFixed(1)+'), targets/objectives/progress preserved.');
