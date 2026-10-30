// ECHOSHOT v0.4 deterministic verification. Run: node test_levels.cjs
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const script = html.slice(html.indexOf('<script>') + 8, html.indexOf('</script>', html.indexOf('<script>')));
const engine = script.slice(0, script.indexOf('const $=id=>'));
const sandbox = {console, Math, Map, Set, JSON};
vm.runInNewContext(engine + '\nglobalThis.api={getLevel,makeShot,stepShot,LEVEL_COUNT,parTime};', sandbox, {timeout: 45000});
const {getLevel,makeShot,stepShot,LEVEL_COUNT,parTime} = sandbox.api;
assert.equal(LEVEL_COUNT,75);
for(let n=1;n<=LEVEL_COUNT;n++){
 const level=getLevel(n),shot=makeShot(level,level.angle);
 assert.equal(level.id,n);
 assert.ok(level.targets.length>0,'No targets on stage '+n);
 for(let k=0;k<2300&&!shot.done;k++)stepShot(shot,1/180);
 assert.equal(shot.success,true,'Unsolvable stage '+n);
 assert.equal(shot.removed.size,level.targets.length,'Uncleared target on '+n);
 assert.ok(shot.elapsed<=shot.timeLimit+0.01,'Flight exceeded time on '+n);
 assert.ok(shot.elapsed<=parTime(level)+0.01,'Time benchmark not achievable on '+n);
 if(n>=25&&n<=50 || n>=57)assert.ok(shot.portalsUsed>0,'Missing wormhole use on '+n);
 if(n>=35)assert.ok(level.targets.some(t=>t.moving),'Moving target missing on '+n);
 if(n>=51){assert.ok(level.targets.length>=7,'Too few targets on '+n);}
 if(n>=51&&n<=57 || n>=70)assert.ok(shot.shattered.size>0,'Crystal not shattered on '+n);
 if(n>=58)assert.ok(shot.switches.size>0,'Switch not activated on '+n);
 if(n>=66)assert.ok(shot.diodePasses.size>0,'One-way shield not crossed on '+n);
}
console.log('PASS: All 75 stages solved; timing benchmarks and all new mechanics verified.');
