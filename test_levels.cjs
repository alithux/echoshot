// ECHOSHOT v0.2 deterministic full-level validation. Run: node test_levels.cjs
const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.split('<script>')[1].split('</script>')[0];
const code=script.slice(script.indexOf('const WORLD'),script.indexOf('const $=id'));
const {getLevel,makeShot,stepShot,verify}=Function(code+'; return {getLevel,makeShot,stepShot,verify};')();
for(let n=1;n<=50;n++){
  const level=getLevel(n);
  assert.equal(level.id,n);
  assert.ok(level.targets.length>=1,'no targets on '+n);
  assert.ok(verify(level),'unsolvable level '+n);
  const shot=makeShot(level,level.angle);
  for(let k=0;k<1500&&!shot.done;k++)stepShot(shot,1/180);
  assert.equal(shot.success,true,'solution failed on '+n);
  assert.equal(shot.removed.size,level.targets.length);
  if(n>=25){assert.equal(level.portals.length,2);assert.ok(shot.portalsUsed>0);}
  if(n>=35)assert.ok(level.targets.some(t=>t.moving));
}
console.log('PASS: All 50 stages are solvable, with functional portals and moving targets.');
