const fs=require('node:fs');const html=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'..','index.html'),'utf8');const code=html.split('<script>')[1].split('</script>')[0].split('const $=id')[0];const {getLevel,makeShot,stepShot,LEVEL_COUNT,crystalCount}=Function(code+';return {getLevel,makeShot,stepShot,LEVEL_COUNT,crystalCount};')();
function simulate(l,a){const s=makeShot(l,a);const targetKinds={};let res=0,bump=0,wall=0;for(let k=0;k<750&&!s.done;k++){stepShot(s,1/60);for(const e of s.events){if(e.type==='target')targetKinds[e.kind]=(targetKinds[e.kind]||0)+1;if(e.type==='resonance')res++;if(e.type==='bumper')bump++;if(e.type==='wall')wall++;}}return {success:s.success,hits:s.removed.size,echoes:s.echoesUsed.size,portals:s.portalsUsed,crystals:s.shattered.size,switches:s.switches.size,blocked:s.gateBlocked.size,through:s.gateTraversed.size,diodes:s.diodePasses.size,primeHits:targetKinds.prime||0,echoHits:targetKinds.echo||0,bumps:bump,walls:wall,time:+s.elapsed.toFixed(2)};}
const rows=[];const started=Date.now();
for(let n=1;n<=75;n++){
 const l=getLevel(n),base=simulate(l,l.angle),typeCounts=l.obstacles.reduce((a,o)=>(a[o.type]=(a[o.type]||0)+1,a),{});
 const angleOffsets=[-.08,-.04,0,.04,.08];const angleTests=angleOffsets.map(o=>simulate(l,l.angle+o));
 const ablations={};
 if(typeCounts.resonator)ablations.noRes=simulate({...l,obstacles:l.obstacles.filter(o=>o.type!=='resonator')},l.angle);
 if(l.portals?.length)ablations.noPortals=simulate({...l,portals:[]},l.angle);
 if(typeCounts.switch)ablations.noCircuit=simulate({...l,obstacles:l.obstacles.filter(o=>!['switch','gate'].includes(o.type))},l.angle);
 if(typeCounts.diode)ablations.noDiode=simulate({...l,obstacles:l.obstacles.filter(o=>o.type!=='diode')},l.angle);
 if(l.targets.some(t=>t.moving))ablations.staticTargets=simulate({...l,targets:l.targets.map(t=>({...t,moving:false}))},l.angle);
 const warnings=[];
 for(const [key,value] of Object.entries(ablations))if(value.success)warnings.push(key+': reference shot still clears stage');
 if(!base.echoHits&&base.echoes)warnings.push('echo never hits target on seed path');
 if(angleTests.filter(x=>x.success).length===5)warnings.push('5/5 near-angle successes ±4.6°');
 if(!base.success)warnings.push('UNSOLVABLE');
 rows.push({id:n,name:l.name,targetCount:l.targets.length,seedAngle:l.angle,base,angleTests:angleTests.map(x=>x.success),ablations,warnings,obstacles:typeCounts,portals:l.portals?.length||0});
 if(n%15===0)console.log('Audited '+n+'/75 in '+((Date.now()-started)/1000).toFixed(1)+'s');
}
const flagged={};for(const row of rows)for(const w of row.warnings)flagged[w]=(flagged[w]||0)+1;
const chapters=[[1,20],[21,24],[25,34],[35,44],[45,50],[51,57],[58,65],[66,75]].map(([lo,hi])=>({range:lo+'–'+hi,stages:rows.slice(lo-1,hi).length,warnings:rows.slice(lo-1,hi).flatMap(r=>r.warnings.map(w=>r.id+': '+w)),avgNearPass:rows.slice(lo-1,hi).reduce((a,r)=>a+r.angleTests.filter(Boolean).length,0)/(hi-lo+1)}));
const report={timeSeconds:(Date.now()-started)/1000,flags:flagged,chapters,rows};
fs.writeFileSync(process.argv[3]||require('node:path').join(__dirname,'audit-latest.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({timeSeconds:report.timeSeconds,flags:flagged,summary:chapters.map(c=>({range:c.range,flags:c.warnings.length,avgNearPass:c.avgNearPass,first:c.warnings.slice(0,6)}))},null,2));
