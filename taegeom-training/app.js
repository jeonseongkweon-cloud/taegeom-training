const trainings = [
  {id:'front', title:'정면베기', sub:'초승달 · 반달 · 보름달', line:'vertical', text:'검끝이 중앙 검선을 따라 수직으로 내려오도록 연습하세요.'},
  {id:'left', title:'좌베기 15°', sub:'상대 목선 방향', line:'left15', text:'정면 기준 왼쪽 15° 검선을 정확하게 따라 내려베기 합니다.'},
  {id:'right', title:'우베기 15°', sub:'상대 목선 방향', line:'right15', text:'정면 기준 오른쪽 15° 검선을 정확하게 따라 내려베기 합니다.'},
  {id:'diagDown', title:'사선 내려베기 65°', sub:'좌·우 대각선', line:'diagDown', text:'약 65° 사선 검선을 따라 크게 내려베기 합니다.'},
  {id:'diagUp', title:'사선 올려베기 65°', sub:'좌·우 대각선', line:'diagUp', text:'아래에서 위로 약 65° 검선을 따라 올려베기 합니다.'},
  {id:'thrust', title:'찌르기', sub:'중심선 정확도', line:'thrust', text:'검끝이 상대 중심선을 벗어나지 않도록 직선으로 찌릅니다.'},
  {id:'block', title:'막기 훈련', sub:'얼굴 · 몸통 · 아래막기', line:'block', text:'상대 공격을 보고 얼굴막기, 몸통막기, 아래막기를 선택하세요.'},
  {id:'reaction', title:'3·2·1 반응훈련', sub:'랜덤 공격·방어', line:'reaction', text:'카운트다운 후 나타나는 기술에 즉시 반응하세요.'},
  {id:'combo', title:'콤보 훈련', sub:'3·5·7 연속동작', line:'combo', text:'제시된 기술을 끊김 없이 연속 수행하세요.'}
];

const $ = (s)=>document.querySelector(s);
let state = { current:'front', started:false, startAt:null, timer:null, sessionCount:0, hit:0, miss:0, score:0, reactionStart:null, bestReaction:null };
let saved = JSON.parse(localStorage.getItem('taegeomTraining')||'{}');
saved.totalTime ||= 0; saved.totalCount ||= 0; saved.bestScore ||= 0; saved.logs ||= []; saved.today ||= new Date().toISOString().slice(0,10); saved.todayCount ||=0;
if(saved.today !== new Date().toISOString().slice(0,10)){ saved.today=new Date().toISOString().slice(0,10); saved.todayCount=0; }

function renderCards(){
  $('#trainingCards').innerHTML = trainings.map(t=>`<button class="training-card ${t.id===state.current?'active':''}" data-id="${t.id}"><b>${t.title}</b><small>${t.sub}</small></button>`).join('');
  document.querySelectorAll('.training-card').forEach(b=>b.onclick=()=>selectTraining(b.dataset.id));
}

function selectTraining(id){
  state.current=id; const t=trainings.find(x=>x.id===id); $('#currentTitle').textContent=t.title; $('#instruction').textContent=t.text; renderCards(); drawGuide(t.line);
  if(id==='reaction') $('#instruction').textContent='훈련 시작을 누르면 3·2·1 후 랜덤 기술이 나타납니다.';
}

function drawGuide(type){
  const line=$('#guideLine'), arc=$('#arcGuide'), dot=$('#targetDot'); arc.setAttribute('d',''); line.style.display='block'; dot.style.display='block';
  const level=$('#level').value; const widths={beginner:12,intermediate:8,advanced:5}; line.setAttribute('stroke-width',widths[level]);
  const set=(x1,y1,x2,y2)=>{ line.setAttribute('x1',x1);line.setAttribute('y1',y1);line.setAttribute('x2',x2);line.setAttribute('y2',y2);dot.setAttribute('cx',x2);dot.setAttribute('cy',y2); };
  if(type==='vertical') set(300,70,300,510);
  else if(type==='left15') set(340,70,220,510);
  else if(type==='right15') set(260,70,380,510);
  else if(type==='diagDown') set(165,95,430,500);
  else if(type==='diagUp') set(175,500,430,105);
  else if(type==='thrust') set(110,300,495,300);
  else if(type==='block'){ set(170,220,430,220); }
  else { line.style.display='none'; dot.style.display='none'; arc.setAttribute('d','M170 410 Q300 120 430 410'); }
}

function start(){
  if(!state.started){ state.started=true; state.startAt=Date.now(); $('#startBtn').textContent='훈련 종료'; state.timer=setInterval(updateTime,250); log('훈련 시작', trainings.find(x=>x.id===state.current).title); }
  else endSession();
  if(state.current==='reaction') runReaction();
}
function updateTime(){ const sec=Math.floor((Date.now()-state.startAt)/1000); $('#sessionTime').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; }
function success(){ if(!state.started) return; state.sessionCount++;state.hit++; state.score=Math.min(100,Math.round((state.hit/(state.hit+state.miss))*80 + Math.min(state.sessionCount,20))); if(state.reactionStart){ const r=((performance.now()-state.reactionStart)/1000).toFixed(2); state.bestReaction=state.bestReaction?Math.min(state.bestReaction,+r):+r; state.reactionStart=null; $('#reactionBest').textContent=state.bestReaction.toFixed(2)+'초'; }
  refresh(); if(state.current==='reaction') setTimeout(runReaction,500);
}
function miss(){ if(!state.started)return; state.sessionCount++;state.miss++; state.score=Math.round((state.hit/(state.hit+state.miss))*100); state.reactionStart=null; refresh(); if(state.current==='reaction') setTimeout(runReaction,500); }
function refresh(){ $('#sessionCount').textContent=state.sessionCount; const total=state.hit+state.miss; $('#sessionAccuracy').textContent=(total?Math.round(state.hit/total*100):0)+'%'; $('#score').textContent=state.score; }
function runReaction(){
  const cd=$('#countdown'); let n=3; cd.textContent=n; $('#instruction').textContent='준비하세요'; const iv=setInterval(()=>{ n--; if(n>0) cd.textContent=n; else { clearInterval(iv); cd.textContent='삐!'; const pool=['정면베기','좌베기 15°','우베기 15°','사선 내려베기','사선 올려베기','찌르기','얼굴막기','몸통막기','아래막기']; const pick=pool[Math.floor(Math.random()*pool.length)]; $('#instruction').textContent=pick; state.reactionStart=performance.now(); setTimeout(()=>cd.textContent='',350); } },700);
}
function endSession(){
  clearInterval(state.timer); const sec=state.startAt?Math.floor((Date.now()-state.startAt)/1000):0; const min=sec/60; saved.totalTime += min; saved.totalCount += state.sessionCount; saved.todayCount += state.sessionCount; saved.bestScore=Math.max(saved.bestScore,state.score); const t=trainings.find(x=>x.id===state.current); const entry={time:new Date().toLocaleString('ko-KR'),title:t.title,count:state.sessionCount,score:state.score,accuracy:state.hit+state.miss?Math.round(state.hit/(state.hit+state.miss)*100):0,minutes:+min.toFixed(1)}; saved.logs.unshift(entry); saved.logs=saved.logs.slice(0,50); persist(); log('훈련 완료',`${entry.title} · ${entry.count}회 · ${entry.score}점`); state.started=false; $('#startBtn').textContent='훈련 시작'; renderSaved(); }
function resetSession(){ clearInterval(state.timer); state={...state,started:false,startAt:null,timer:null,sessionCount:0,hit:0,miss:0,score:0,reactionStart:null,bestReaction:null}; $('#startBtn').textContent='훈련 시작'; $('#sessionTime').textContent='00:00'; $('#reactionBest').textContent='-'; refresh(); }
function persist(){ localStorage.setItem('taegeomTraining',JSON.stringify(saved)); }
function log(title,detail){ const box=$('#log'); const el=document.createElement('div'); el.className='log-item'; el.innerHTML=`<b>${title}</b><span>${detail}</span>`; box.prepend(el); }
function renderSaved(){ $('#totalTime').textContent=Math.round(saved.totalTime)+'분'; $('#totalCount').textContent=saved.totalCount+'회'; $('#bestScore').textContent=saved.bestScore+'점'; $('#streak').textContent=saved.todayCount; const pct=Math.min(100,saved.todayCount); $('#goalText').textContent=pct+'%'; $('#goalBar').style.width=pct+'%'; $('#log').innerHTML=saved.logs.map(l=>`<div class="log-item"><b>${l.title} · ${l.score}점</b><span>${l.time} · ${l.count}회 · 정확도 ${l.accuracy}% · ${l.minutes}분</span></div>`).join('') || '<div class="log-item"><b>아직 기록이 없습니다.</b><span>첫 수련을 시작해보세요.</span></div>'; }
function exportRecord(){ const blob=new Blob([JSON.stringify(saved,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='taegeom-training-record.json'; a.click(); URL.revokeObjectURL(a.href); }

$('#startBtn').onclick=start; $('#successBtn').onclick=success; $('#missBtn').onclick=miss; $('#resetBtn').onclick=resetSession; $('#exportBtn').onclick=exportRecord; $('#level').onchange=()=>drawGuide(trainings.find(x=>x.id===state.current).line);
renderCards(); selectTraining('front'); renderSaved();
