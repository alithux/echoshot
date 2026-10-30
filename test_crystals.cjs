// ECHOSHOT v0.5.1 regression: 75 solutions, one-hit mirror behavior, mandatory glass objectives.
const fs = require('node:fs'),vm = require('node:vm'),assert = require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.slice(html.indexOf('<script>')+8,html.indexOf('</script>',html.indexOf('<script>')));
const engine=script.slice(script.indexOf('const WORLD'),script.indexOf('const $=id=>'));
const context=vm.createContext({console,Math,Map,Set,JSON,performance:{now:()=>0}});
vm.runInContext(engine+'\nglobalThis.api={getLevel,makeShot,stepShot,verify,LEVEL_COUNT,crystalCount,parTime};',context,{timeout:60000});
const {getLevel,makeShot,stepShot,verify,LEVEL_COUNT,crystalCount,parTime}=context.api;
assert.equal(LEVEL_COUNT,75);
let covered=0;
for(let n=1;n<=LEVEL_COUNT;n++){
 const l=getLevel(n),s=makeShot(l,l.angle),expected=n>50?Math.min(12,7+Math.floor((n-51)/5)):null;
 let steps=0;
 while(!s.done&&steps++<2400)stepShot(s,1/180);
 assert(s.success,`Stage ${n} failed reference after ${s.elapsed.toFixed(2)} secs, hit ${s.removed.size}/${l.targets.length}`);
 assert.equal(s.removed.size,l.targets.length);
 assert(s.elapsed<=s.timeLimit+0.01,`Stage ${n} hit time limit`);
 assert(s.elapsed<=parTime(l)+0.01,`Stage ${n} has unattainable par time`);
 if(n>=51){assert.equal(l.targets.length,expected,`Stage ${n}: target count unexpectedly reduced`)};
 if(n>=51&&n<=57||n>=70){
  assert.equal(crystalCount(l),1,'Expected one crystal on stage '+n);
  assert.equal(s.shattered.size,1,'Expected crystal destruction on stage '+n);
  covered++;
 }else assert.equal(crystalCount(l),0,'Unexpected crystal on stage '+n);
 if(n>=58)assert.equal(s.switches.size,1,'Switch not activated on stage '+n);
 if(n>=66)assert.equal(s.diodePasses.size,1,'One-way shield missed on '+n);
}
const stage={id:51,obstacles:[{id:'glass',type:'crystal',x:180,y:448,r:12}],portals:[],targets:[{id:'t0',x:180,y:397,r:10.5}],echoSpread:0.52};
const s=makeShot(stage,0);
let initialShatter=false,returned=false;
for(let i=0;i<2300&&!s.done;i++){
 stepShot(s,1/180);
 if(s.shattered.size>0&&!initialShatter){
  initialShatter=true;
  assert(s.balls[0].vy>0,'First collision must reflect ball back toward launcher');
 }
 if(initialShatter&&s.balls[0].y<420&&s.balls[0].vy<0)returned=true;
}
assert(initialShatter,'Crystal must shatter on initial collision');
assert(returned,'Ball must subsequently travel through destroyed crystal');
assert(s.success,'Clearing target after a crystal ricochet should complete stage');
const needGlass={id:51,obstacles:[{id:'glass',type:'crystal',x:265,y:330,r:12}],portals:[],targets:[{id:'t0',x:180,y:448,r:10.5}]};
const miss=makeShot(needGlass,0);
for(let k=0;k<2400&&!miss.done;k++)stepShot(miss,1/180);
assert.equal(miss.removed.size,1,'Setup should hit all regular targets');
assert.equal(miss.shattered.size,0,'Setup must miss the crystal');
assert.equal(miss.success,false,'Crystal cannot be bypassed to complete stage');
console.log(`PASS: 75 levels solvable; ${covered} crystal levels require reflection, all advanced target counts preserved, one-use reflection/second pass verified, unbroken crystal prevents a win.`);
