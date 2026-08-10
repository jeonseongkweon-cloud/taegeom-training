const trainings = [
  {id:'front', title:'정면베기', sub:'초승달 · 반달 · 보름달', text:'정면 중심선을 정확히 지키며 내려베기 합니다.', variants:[['crescent','초승달'],['half','반달'],['full','보름달']]},
  {id:'neck', title:'좌·우베기 15°', sub:'상대 목선 방향', text:'정면 기준 15° 검선을 따라 목선 방향으로 내려베기 합니다.', variants:[['left15','좌베기'],['right15','우베기']]},
  {id:'diagDown', title:'사선 내려베기 65°', sub:'좌·우 대각선', text:'약 65° 사선 검선을 따라 크게 내려베기 합니다.', variants:[['diagDownL','좌 사선'],['diagDownR','우 사선']]},
  {id:'diagUp', title:'사선 올려베기 65°', sub:'좌·우 대각선', text:'아래에서 위로 약 65° 검선을 따라 올려베기 합니다.', variants:[['diagUpL','좌 사선'],['diagUpR','우 사선']]},
  {id:'thrust', title:'찌르기', sub:'중심선 정확도', text:'검끝이 상대 중심선을 벗어나지 않도록 직선으로 찌릅니다.', variants:[['thrust','중심 찌르기']]},
  {id:'block', title:'막기 훈련', sub:'얼굴 · 몸통 · 아래막기', text:'상대 공격에 맞는 막기를 선택하고 정확한 위치에서 막아냅니다.', variants:[['faceBlock','얼굴막기'],['bodyBlock','몸통막기'],['lowBlock','아래막기']]},
  {id:'reaction', title:'3·2·1 반응훈련', sub:'공격을 보고 즉시 방어', text:'카운트다운 후 상대 공격을 보고 알맞은 대응 기술을 선택하세요.', variants:[]},
  {id:'combo', title:'콤보 훈련', sub:'3연속 검선 연결', text:'제시된 3개 기술을 끊김 없이 순서대로 수행하세요.', variants:[]}
];

const technique = {
  crescent:{label:'초승달베기', desc:'이마 위 약 45° 준비 · 빠른 정면베기', prep:'이마 위에서 검을 약 45°로 세웁니다. 정면에서는 손잡이 끝이 거의 보이지 않고, 눈을 위로 들면 보이는 정도가 기준입니다.', pass:85, path:'M300 125 Q300 86 300 55 L300 515', start:[300,125], end:[300,515], rot0:0, rot1:180, duration:650},
  half:{label:'반달베기', desc:'머리 위 180° 수평 준비 · 중간 궤적', prep:'왼손을 충분히 뻗어 검이 머리 위에서 완전한 수평(180°)이 되도록 준비합니다.', pass:85, path:'M210 120 Q300 55 390 120 Q340 150 300 205 L300 515', start:[210,120], end:[300,515], rot0:-82, rot1:180, duration:950},
  full:{label:'보름달베기', desc:'왼손을 귀까지 올려 어깨·목덜미까지 깊게 준비', prep:'왼손을 귀까지 최대한 올리고, 검이 어깨·목덜미에 닿을 만큼 깊게 넘겨 가장 큰 궤적을 만듭니다.', pass:88, path:'M150 250 C135 65 465 30 455 245 C450 340 365 410 300 515', start:[150,250], end:[300,515], rot0:-125, rot1:180, duration:1350},
  left15:{label:'좌베기 15°', desc:'정면 기준 왼쪽 15°', pass:82, path:'M340 60 L220 510', start:[340,60], end:[220,510], rot0:15, rot1:195, duration:850},
  right15:{label:'우베기 15°', desc:'정면 기준 오른쪽 15°', pass:82, path:'M260 60 L380 510', start:[260,60], end:[380,510], rot0:-15, rot1:165, duration:850},
  diagDownL:{label:'좌 사선 내려베기 65°', desc:'좌측 위에서 우측 아래', pass:84, path:'M165 95 L440 500', start:[165,95], end:[440,500], rot0:-34, rot1:146, duration:900},
  diagDownR:{label:'우 사선 내려베기 65°', desc:'우측 위에서 좌측 아래', pass:84, path:'M435 95 L160 500', start:[435,95], end:[160,500], rot0:34, rot1:214, duration:900},
  diagUpL:{label:'좌 사선 올려베기 65°', desc:'좌측 아래에서 우측 위', pass:86, path:'M165 500 L440 100', start:[165,500], end:[440,100], rot0:-146, rot1:34, duration:900},
  diagUpR:{label:'우 사선 올려베기 65°', desc:'우측 아래에서 좌측 위', pass:86, path:'M435 500 L160 100', start:[435,500], end:[160,100], rot0:146, rot1:-34, duration:900},
  thrust:{label:'찌르기', desc:'중심선을 향해 직선 찌르기', pass:85, path:'M105 310 L490 310', start:[105,310], end:[490,310], rot0:90, rot1:90, duration:650},
  faceBlock:{label:'얼굴막기', desc:'정면베기에 대응', pass:82, path:'M205 205 L395 205', start:[205,205], end:[395,205], rot0:90, rot1:90, duration:650},
  bodyBlock:{label:'몸통막기', desc:'찌르기에 대응', pass:82, path:'M220 340 Q300 290 380 340', start:[220,340], end:[380,340], rot0:65, rot1:115, duration:700},
  lowBlock:{label:'아래막기', desc:'사선 올려베기에 대응', pass:84, path:'M210 430 L390 430', start:[210,430], end:[390,430], rot0:90, rot1:90, duration:650}
};

const reactionCases = [
  {attack:'정면베기!', answer:'얼굴막기', key:'얼굴막기'},
  {attack:'찌르기!', answer:'몸통막기', key:'몸통막기'},
  {attack:'사선 올려베기!', answer:'아래막기', key:'아래막기'},
  {attack:'얼굴막기!', answer:'정면베기', key:'정면베기'},
  {attack:'아래막기!', answer:'사선 내려베기', key:'사선 내려베기'}
];
const reactionOptions=['얼굴막기','몸통막기','아래막기','정면베기','좌베기','우베기','사선 내려베기','사선 올려베기','찌르기'];
const combos=[
  ['정면베기','좌베기','우베기'],['좌 사선 내려베기','우 사선 내려베기','정면베기'],['사선 올려베기','정면베기','찌르기'],['정면베기','우베기','좌 사선 내려베기']
];

const ranks=[
  {name:'LEVEL 1 · 입문',min:0,next:100},
  {name:'LEVEL 2 · 기본',min:100,next:250},
  {name:'LEVEL 3 · 정확',min:250,next:500},
  {name:'LEVEL 4 · 연결',min:500,next:850},
  {name:'LEVEL 5 · 반응',min:850,next:1300},
  {name:'LEVEL 6 · 숙련',min:1300,next:1900},
  {name:'LEVEL 7 · 상급',min:1900,next:2700},
  {name:'LEVEL 8 · 지도',min:2700,next:3800},
  {name:'LEVEL 9 · 마스터',min:3800,next:5200},
  {name:'LEVEL 10 · TAEGEOM MASTER',min:5200,next:null}
];
const frontAngleInfo={
  crescent:{badge:'초승달 · 약 45°',title:'초승달 준비각도',coach:'측면을 보고 이마 위에서 검을 약 45°로 세웁니다. 정면에서는 손잡이 끝이 거의 보이지 않고, 눈을 위로 들면 보이는 정도가 기준입니다.'},
  half:{badge:'반달 · 수평 180°',title:'반달 준비각도',coach:'왼손을 충분히 뻗어 검이 머리 위에서 완전한 수평(180°)을 이루도록 합니다. 수평선이 무너지지 않는 것이 핵심입니다.'},
  full:{badge:'보름달 · 최대 준비',title:'보름달 준비각도',coach:'왼손을 귀까지 최대한 올리고 검이 어깨·목덜미에 닿을 만큼 깊게 넘겨 가장 큰 준비 궤적을 만듭니다.'}
};

const $=s=>document.querySelector(s);
const today=()=>new Date().toISOString().slice(0,10);
let saved;
try{saved=JSON.parse(localStorage.getItem('taegeomTraining')||'{}')}catch{saved={}}
saved.totalTime=Number(saved.totalTime)||0;saved.totalCount=Number(saved.totalCount)||0;saved.bestScore=Number(saved.bestScore)||0;saved.logs=Array.isArray(saved.logs)?saved.logs:[];saved.today=saved.today||today();saved.todayCount=Number(saved.todayCount)||0;saved.todayHit=Number(saved.todayHit)||0;saved.todayMiss=Number(saved.todayMiss)||0;saved.todayMinutes=Number(saved.todayMinutes)||0;saved.xp=Number(saved.xp)||0;saved.passed=saved.passed&&typeof saved.passed==='object'?saved.passed:{};saved.missionDays=Array.isArray(saved.missionDays)?saved.missionDays:[];
if(saved.today!==today()){saved.today=today();saved.todayCount=0;saved.todayHit=0;saved.todayMiss=0;saved.todayMinutes=0;}

let state={current:'front',variant:'crescent',started:false,startAt:null,timer:null,sessionCount:0,hit:0,miss:0,score:0,bestReaction:null,reactionStart:null,reactionCase:null,reactionTimer:null,combo:null,comboStep:0,demoing:false};

function renderCards(){
  $('#trainingCards').innerHTML=trainings.map(t=>`<button class="training-card ${t.id===state.current?'active':''}" data-id="${t.id}"><b>${t.title}</b><small>${t.sub}</small></button>`).join('');
  document.querySelectorAll('.training-card').forEach(b=>b.onclick=()=>selectTraining(b.dataset.id));
}
function renderVariants(){
  const t=trainings.find(x=>x.id===state.current); const box=$('#variantBox');
  if(!t.variants.length){box.style.display='none';return} box.style.display='block';
  if(!t.variants.some(v=>v[0]===state.variant)) state.variant=t.variants[0][0];
  $('#variantButtons').innerHTML=t.variants.map(v=>`<button class="choice-btn ${v[0]===state.variant?'active':''}" data-v="${v[0]}">${v[1]}</button>`).join('');
  document.querySelectorAll('.choice-btn').forEach(b=>b.onclick=()=>{state.variant=b.dataset.v;renderVariants();updateTechnique();updateAngleLab();});
}
function selectTraining(id){
  clearTimeout(state.reactionTimer); state.reactionStart=null; state.current=id;
  const t=trainings.find(x=>x.id===id); if(t.variants.length) state.variant=t.variants[0][0];
  $('#reactionPanel').classList.add('hidden');$('#responseButtons').classList.add('hidden');
  renderCards();renderVariants();updateTechnique();updateAngleLab();
  if(id==='reaction'){$('#currentTitle').textContent='3·2·1 반응훈련';$('#instruction').textContent='훈련 시작을 누르면 카운트다운 후 상대 공격이 나타납니다.';hideGuide(true)}
  if(id==='combo'){$('#currentTitle').textContent='콤보 훈련';$('#instruction').textContent='훈련 시작 후 제시되는 3개 기술을 순서대로 수행하세요.';newCombo();hideGuide(false)}
}
function updateTechnique(){
  if(['reaction','combo'].includes(state.current))return;
  const tech=technique[state.variant];$('#currentTitle').textContent=tech.label;$('#instruction').textContent=`${tech.desc} · ${tech.prep?tech.prep+' · ':''}검끝이 빛나는 검선을 정확히 따라가도록 반복하세요.`;drawGuide(tech);updateAngleLab();
}
function updateAngleLab(){
  const lab=$('#angleLab'); if(!lab)return;
  const isFront=state.current==='front'; lab.style.display=isFront?'block':'none';
  if(!isFront)return;
  const info=frontAngleInfo[state.variant]||frontAngleInfo.crescent;
  $('#angleBadge').textContent=info.badge; $('#angleTitle').textContent=info.title; $('#angleCoach').textContent=info.coach;
  document.querySelectorAll('.angle-card').forEach(c=>c.classList.toggle('active',c.dataset.angleTech===state.variant));
}
function setupAngleCards(){
  document.querySelectorAll('.angle-card').forEach(c=>c.onclick=()=>{state.current='front';state.variant=c.dataset.angleTech;renderCards();renderVariants();updateTechnique();});
}

function drawGuide(tech){
  const path=$('#guidePath');path.setAttribute('d',tech.path);$('#startDot').setAttribute('cx',tech.start[0]);$('#startDot').setAttribute('cy',tech.start[1]);$('#targetDot').setAttribute('cx',tech.end[0]);$('#targetDot').setAttribute('cy',tech.end[1]);
  const sword=$('#sword');sword.setAttribute('transform',`translate(${tech.start[0]} ${tech.start[1]}) rotate(${tech.rot0})`);hideGuide(false);applyLevel();
}
function applyLevel(){
  const lv=$('#level').value,p=$('#guidePath');p.style.opacity=lv==='beginner'?'1':lv==='intermediate'?'.48':'.08';p.style.strokeWidth=lv==='beginner'?'10':lv==='intermediate'?'7':'5';
}
function hideGuide(hide){$('#guidePath').style.display=hide?'none':'block';$('#startDot').style.display=hide?'none':'block';$('#targetDot').style.display=hide?'none':'block';$('#sword').style.display=hide?'none':'block'}
function beep(freq=880,dur=.1){try{const a=new (window.AudioContext||window.webkitAudioContext)();const o=a.createOscillator(),g=a.createGain();o.frequency.value=freq;o.connect(g);g.connect(a.destination);g.gain.setValueAtTime(.12,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+dur);o.start();o.stop(a.currentTime+dur)}catch{}}

function demo(){
  if(state.demoing||['reaction','combo'].includes(state.current))return;state.demoing=true;const tech=technique[state.variant],s=$('#sword'),path=$('#guidePath');s.classList.add('demoing');const len=path.getTotalLength();const start=performance.now();
  function frame(now){const p=Math.min(1,(now-start)/tech.duration),e=1-Math.pow(1-p,3),pt=path.getPointAtLength(len*e),pt2=path.getPointAtLength(Math.min(len,len*e+3)),ang=Math.atan2(pt2.y-pt.y,pt2.x-pt.x)*180/Math.PI+90;s.setAttribute('transform',`translate(${pt.x} ${pt.y}) rotate(${ang})`);if(p<1)requestAnimationFrame(frame);else{state.demoing=false;s.classList.remove('demoing');setTimeout(()=>s.setAttribute('transform',`translate(${tech.start[0]} ${tech.start[1]}) rotate(${tech.rot0})`),350)}}requestAnimationFrame(frame);
}

function start(){
  if(!state.started){state.started=true;state.startAt=Date.now();$('#startBtn').textContent='훈련 종료';$('#statusBadge').textContent='TRAINING';$('#statusBadge').classList.add('live');state.timer=setInterval(updateTime,250);addTempLog('훈련 시작',trainings.find(x=>x.id===state.current).title);if(state.current==='reaction')runReaction();if(state.current==='combo')showCombo();}
  else endSession();
}
function updateTime(){const sec=Math.floor((Date.now()-state.startAt)/1000);$('#sessionTime').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`}
function calcScore(){const total=state.hit+state.miss,acc=total?state.hit/total:0;state.score=Math.max(0,Math.min(100,Math.round(acc*85+Math.min(state.sessionCount,30)/2)))}
function success(){if(!state.started)return;state.sessionCount++;state.hit++;calcScore();refresh();if(state.current==='combo')advanceCombo();}
function miss(){if(!state.started)return;state.sessionCount++;state.miss++;calcScore();state.reactionStart=null;refresh();if(state.current==='combo')advanceCombo();}
function refresh(){const total=state.hit+state.miss;$('#sessionCount').textContent=state.sessionCount;$('#sessionAccuracy').textContent=(total?Math.round(state.hit/total*100):0)+'%';$('#score').textContent=state.score}

function runReaction(){
  if(!state.started||state.current!=='reaction')return;clearTimeout(state.reactionTimer);$('#reactionPanel').classList.remove('hidden');$('#responseButtons').classList.add('hidden');$('#reactionKicker').textContent='준비';$('#reactionCommand').textContent='집중';$('#reactionAnswer').textContent='';let n=3;$('#countdown').textContent=n;
  const tick=()=>{if(!state.started||state.current!=='reaction')return;n--;if(n>0){$('#countdown').textContent=n;beep(520,.07);state.reactionTimer=setTimeout(tick,650)}else{$('#countdown').textContent='삐!';beep(1050,.12);state.reactionCase=reactionCases[Math.floor(Math.random()*reactionCases.length)];$('#reactionKicker').textContent='상대 공격';$('#reactionCommand').textContent=state.reactionCase.attack;$('#reactionAnswer').textContent='정확한 대응을 선택하세요';state.reactionStart=performance.now();showReactionButtons();state.reactionTimer=setTimeout(()=>$('#countdown').textContent='',320)}};beep(520,.07);state.reactionTimer=setTimeout(tick,650)
}
function showReactionButtons(){const box=$('#responseButtons');box.classList.remove('hidden');const choices=[state.reactionCase.answer];while(choices.length<5){const p=reactionOptions[Math.floor(Math.random()*reactionOptions.length)];if(!choices.includes(p))choices.push(p)}choices.sort(()=>Math.random()-.5);box.innerHTML=choices.map(c=>`<button data-answer="${c}">${c}</button>`).join('');box.querySelectorAll('button').forEach(b=>b.onclick=()=>answerReaction(b))}
function answerReaction(btn){if(!state.reactionStart)return;const val=btn.dataset.answer,correct=val===state.reactionCase.answer,reaction=(performance.now()-state.reactionStart)/1000;state.reactionStart=null;state.sessionCount++;if(correct){state.hit++;btn.classList.add('correct');state.bestReaction=state.bestReaction===null?reaction:Math.min(state.bestReaction,reaction);$('#reactionBest').textContent=state.bestReaction.toFixed(2)+'초';$('#reactionAnswer').textContent=`정확! ${reaction.toFixed(2)}초 · ${state.reactionCase.answer}`;beep(1250,.08)}else{state.miss++;btn.classList.add('wrong');$('#reactionAnswer').textContent=`정답: ${state.reactionCase.answer}`;beep(220,.16)}calcScore();refresh();boxDisable(true);state.reactionTimer=setTimeout(()=>{boxDisable(false);runReaction()},1100)}
function boxDisable(disabled){document.querySelectorAll('#responseButtons button').forEach(b=>b.disabled=disabled)}

function newCombo(){state.combo=combos[Math.floor(Math.random()*combos.length)];state.comboStep=0}
function showCombo(){newCombo();$('#instruction').textContent=`콤보: ① ${state.combo[0]} → ② ${state.combo[1]} → ③ ${state.combo[2]}`;$('#currentTitle').textContent='콤보 3연속';beep(760,.08)}
function advanceCombo(){if(state.current!=='combo'||!state.started)return;state.comboStep++;if(state.comboStep>=3){$('#instruction').textContent='콤보 완료! 다음 콤보를 준비하세요.';beep(1250,.12);setTimeout(showCombo,900)}else{$('#instruction').textContent=`다음: ${state.combo[state.comboStep]} · (${state.comboStep+1}/3)`}}

function endSession(){
  clearInterval(state.timer);clearTimeout(state.reactionTimer);const sec=state.startAt?Math.floor((Date.now()-state.startAt)/1000):0,min=sec/60,total=state.hit+state.miss,accuracy=total?Math.round(state.hit/total*100):0;const t=trainings.find(x=>x.id===state.current);saved.totalTime+=min;saved.totalCount+=state.sessionCount;saved.todayCount+=state.sessionCount;saved.todayHit+=state.hit;saved.todayMiss+=state.miss;saved.todayMinutes+=min;saved.bestScore=Math.max(saved.bestScore,state.score);const earnedXP=Math.round(state.hit*2+state.score/5+min*4);saved.xp+=earnedXP;const techKey=state.variant,techObj=technique[techKey];if(techObj&&state.sessionCount>=10&&state.score>=techObj.pass){saved.passed[techKey]={date:today(),score:state.score,count:state.sessionCount};}checkMission();saved.logs.unshift({time:new Date().toLocaleString('ko-KR'),title:t.title,count:state.sessionCount,score:state.score,accuracy,minutes:+min.toFixed(1),bestReaction:state.bestReaction,xp:earnedXP});saved.logs=saved.logs.slice(0,60);persist();state.started=false;$('#startBtn').textContent='훈련 시작';$('#statusBadge').textContent='READY';$('#statusBadge').classList.remove('live');$('#countdown').textContent='';$('#reactionPanel').classList.add('hidden');$('#responseButtons').classList.add('hidden');renderSaved();addTempLog('훈련 완료',`${t.title} · ${state.sessionCount}회 · ${state.score}점`)
}
function resetSession(){clearInterval(state.timer);clearTimeout(state.reactionTimer);Object.assign(state,{started:false,startAt:null,timer:null,sessionCount:0,hit:0,miss:0,score:0,bestReaction:null,reactionStart:null,comboStep:0});$('#startBtn').textContent='훈련 시작';$('#statusBadge').textContent='READY';$('#statusBadge').classList.remove('live');$('#sessionTime').textContent='00:00';$('#reactionBest').textContent='-';$('#countdown').textContent='';$('#reactionPanel').classList.add('hidden');$('#responseButtons').classList.add('hidden');refresh();updateTechnique()}
function persist(){localStorage.setItem('taegeomTraining',JSON.stringify(saved))}
function addTempLog(title,detail){const box=$('#log'),el=document.createElement('div');el.className='log-item';el.innerHTML=`<b>${title}</b><span>${detail}</span>`;box.prepend(el)}
function renderSaved(){
  $('#totalTime').textContent=Math.round(saved.totalTime)+'분';$('#totalCount').textContent=saved.totalCount+'회';$('#bestScore').textContent=saved.bestScore+'점';$('#streak').textContent=saved.todayCount+'회';const goal=100,pct=Math.min(100,Math.round(saved.todayCount/goal*100));$('#goalText').textContent=pct+'%';$('#goalBar').style.width=pct+'%';const tt=saved.todayHit+saved.todayMiss;$('#todayAccuracy').textContent=(tt?Math.round(saved.todayHit/tt*100):0)+'%';$('#todayMinutes').textContent=Math.round(saved.todayMinutes)+'분';$('#log').innerHTML=saved.logs.map(l=>`<div class="log-item"><b>${l.title} · ${l.score}점</b><span>${l.time} · ${l.count}회 · 정확도 ${l.accuracy}% · ${l.minutes}분${l.xp?` · +${l.xp}XP`:''}${l.bestReaction?` · 반응 ${Number(l.bestReaction).toFixed(2)}초`:''}</span></div>`).join('')||'<div class="log-item"><b>아직 기록이 없습니다.</b><span>첫 수련을 시작해보세요.</span></div>';renderGrowth();renderMission();renderPassList();
}
function getRank(){
  let idx=0;for(let i=0;i<ranks.length;i++){if(saved.xp>=ranks[i].min)idx=i;}return {rank:ranks[idx],idx};
}
function renderGrowth(){
  const {rank,idx}=getRank();$('#rankName').textContent=rank.name;$('#passCount').textContent=`${Object.keys(saved.passed).length} / ${Object.keys(technique).length}`;
  if(rank.next===null){$('#rankNext').textContent='최고 등급 달성';$('#xpText').textContent=`${saved.xp} XP`;$('#xpBar').style.width='100%';return;}
  const base=rank.min,span=rank.next-base,progress=Math.max(0,Math.min(1,(saved.xp-base)/span));$('#rankNext').textContent=`다음 등급까지 ${rank.next-saved.xp} XP`;$('#xpText').textContent=`${saved.xp} / ${rank.next}`;$('#xpBar').style.width=(progress*100)+'%';
}
function missionMetrics(){const total=saved.todayHit+saved.todayMiss,acc=total?Math.round(saved.todayHit/total*100):0;return {count:saved.todayHit,acc,time:saved.todayMinutes,done:saved.todayHit>=30&&acc>=80&&saved.todayMinutes>=5};}
function checkMission(){const m=missionMetrics();if(m.done&&!saved.missionDays.includes(today())){saved.missionDays.push(today());saved.xp+=100;}}
function renderMission(){
  const m=missionMetrics();$('#missionCount').textContent=`${Math.min(m.count,30)} / 30`;$('#missionAccuracy').textContent=m.acc+'%';$('#missionTime').textContent=`${Math.min(5,Math.floor(m.time))} / 5분`;$('#missionStatus').textContent=m.done?'MISSION CLEAR · +100 XP':'진행중';$('#missionStatus').classList.toggle('clear',m.done);const parts=[Math.min(1,m.count/30),Math.min(1,m.acc/80),Math.min(1,m.time/5)];$('#missionBar').style.width=(parts.reduce((a,b)=>a+b,0)/3*100)+'%';
}
function renderPassList(){
  const box=$('#passList');if(!box)return;box.innerHTML=Object.entries(technique).map(([key,t])=>{const pass=saved.passed[key];return `<div class="pass-item ${pass?'passed':''}"><span>${pass?'✓':'○'} ${t.label}</span><b>${pass?`${pass.score}점 합격`:`${t.pass}점 이상`}</b></div>`}).join('');
}
function saveCertificate(){
  const c=document.createElement('canvas');c.width=1200;c.height=720;const x=c.getContext('2d');x.fillStyle='#080a0d';x.fillRect(0,0,c.width,c.height);x.strokeStyle='#d9a84e';x.lineWidth=8;x.strokeRect(32,32,1136,656);x.strokeStyle='#72531f';x.lineWidth=2;x.strokeRect(52,52,1096,616);x.textAlign='center';x.fillStyle='#f2cf78';x.font='700 28px Arial';x.fillText('WORLD TAEKWONKUMDO FEDERATION',600,112);x.fillStyle='#fff';x.font='900 54px Arial';x.fillText('TAEGEOM DIGITAL TRAINING',600,190);x.fillStyle='#d9a84e';x.font='900 42px Arial';x.fillText('수 련 인 증 카 드',600,252);const {rank}=getRank();x.fillStyle='#fff';x.font='700 36px Arial';x.fillText(rank.name,600,340);x.fillStyle='#ddd';x.font='28px Arial';x.fillText(`누적 수련 ${Math.round(saved.totalTime)}분  ·  수행 ${saved.totalCount}회  ·  최고 ${saved.bestScore}점`,600,404);x.fillText(`기술 합격 ${Object.keys(saved.passed).length}/${Object.keys(technique).length}  ·  TRAINING XP ${saved.xp}`,600,450);x.fillStyle='#aeb9c9';x.font='24px Arial';x.fillText(`기록일 ${new Date().toLocaleDateString('ko-KR')}  ·  TAEGEOM Training v1.4`,600,520);x.fillStyle='#f2cf78';x.font='700 23px Arial';x.fillText('창시자 · 시스템 개발자  전성권  |  JEON SEONG KWEON',600,585);x.fillStyle='#8f98a7';x.font='18px Arial';x.fillText('※ 본 카드는 브라우저에 기록된 개인 디지털 수련기록을 요약한 훈련 인증 카드입니다.',600,635);const a=document.createElement('a');a.download=`TAEGEOM-training-card-${today()}.png`;a.href=c.toDataURL('image/png');a.click();
}

function exportRecord(){const blob=new Blob([JSON.stringify(saved,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`taegeom-training-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),300)}
function clearData(){if(confirm('누적 수련기록을 모두 초기화할까요? 이 작업은 되돌릴 수 없습니다.')){localStorage.removeItem('taegeomTraining');location.reload()}}

$('#startBtn').onclick=start;$('#demoBtn').onclick=demo;$('#successBtn').onclick=success;$('#missBtn').onclick=miss;$('#resetBtn').onclick=resetSession;$('#exportBtn').onclick=exportRecord;$('#clearDataBtn').onclick=clearData;$('#certificateBtn').onclick=saveCertificate;$('#level').onchange=()=>applyLevel();
document.addEventListener('keydown',e=>{if(e.target.matches('select,input,textarea,button'))return;if(e.code==='Space'){e.preventDefault();start()}if(e.key==='ArrowUp'){e.preventDefault();success()}if(e.key==='ArrowDown'){e.preventDefault();miss()}});
renderCards();renderVariants();setupAngleCards();updateTechnique();renderSaved();
