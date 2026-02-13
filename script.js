function rand(a,b){return a+Math.random()*(b-a);}

/* ═══════════════════════════════════════════
   CŒURS FLOTTANTS EN ARRIÈRE-PLAN
═══════════════════════════════════════════ */
const bg=document.getElementById('heartsBg');
for(let i=0;i<24;i++){
  const h=document.createElement('span');
  h.className='heart-particle'; 
  h.textContent='♥';
  h.style.left=rand(2,97)+'%'; 
  h.style.top=rand(2,95)+'%';
  h.style.fontSize=rand(12,24)+'px';
  h.style.animationDuration=rand(3,7)+'s';
  h.style.animationDelay='-'+rand(0,6)+'s';
  h.style.opacity=rand(0.3,0.7);
  bg.appendChild(h);
}

/* ═══════════════════════════════════════════
   CHATS CHANTEURS
═══════════════════════════════════════════ */
const catEmojis=['😺','😸','😹','😻','🐱','😽','🙀','😼'];
const noteEmojis=['♪','♫','♬','🎵','🎶'];
const catPos=[
  {x:5,y:12},{x:18,y:72},{x:82,y:8},{x:90,y:65},{x:48,y:5},
  {x:6,y:45},{x:75,y:82},{x:35,y:88},{x:65,y:15},{x:92,y:38},
  {x:22,y:20},{x:55,y:78}
];

const catEls=[];
catPos.forEach((pos,i)=>{
  const cat=document.createElement('span');
  cat.className='cat-singer';
  cat.textContent=catEmojis[i%catEmojis.length];
  cat.style.left=pos.x+'%'; 
  cat.style.top=pos.y+'%';
  cat.style.animationDuration=rand(2.5,5)+'s';
  cat.style.animationDelay='-'+rand(0,4)+'s';
  cat.style.fontSize=rand(1.8,2.8)+'rem';
  document.body.appendChild(cat);
  catEls.push({el:cat,x:pos.x,y:pos.y});
  
  // Notes de musique qui sortent de chaque chat
  setInterval(()=>{
    const note=document.createElement('span');
    note.className='music-note';
    note.textContent=noteEmojis[Math.floor(Math.random()*noteEmojis.length)];
    note.style.left=(pos.x+rand(-3,3))+'%'; 
    note.style.top=pos.y+'%';
    note.style.setProperty('--nx',rand(-20,20)+'px');
    note.style.animationDuration=rand(1.5,3)+'s';
    note.style.animationDelay=rand(0,0.5)+'s';
    document.body.appendChild(note);
    setTimeout(()=>note.remove(),3500);
  },rand(800,2000));
});

/* ═══════════════════════════════════════════
   BOUTON NON QUI FUIT
═══════════════════════════════════════════ */
const messages=[
  {text:'💌 Tu comptes énormément pour moi !',      s:1.15},
  {text:'Tu es sûr(e) ? 😅',                        s:1.05},
  {text:'Vraiment vraiment sûr(e) ? 🥺',            s:0.90},
  {text:'Réfléchis bien… 😓',                       s:0.78},
  {text:'Je promets de te rendre heureux(se) ! ✨', s:0.64},
  {text:"S'il te plaît dis oui 🙏",                 s:0.50},
  {text:'Ne me fais pas ça 😭',                      s:0.38},
  {text:"On est faits l'un pour l'autre ! 🦋",      s:0.26},
  {text:'Dernière chance… 🤏',                       s:0.14},
  {text:'OK tu m\'as eu 😂',                         s:0.00},
];

let step=0, visible=true;
const btnNon=document.getElementById('btnNon');
const subtitle=document.getElementById('subtitle');

function updateNon(){
  const sc=messages[Math.min(step,messages.length-1)].s;
  if(sc<=0.001){
    btnNon.style.opacity='0';
    btnNon.style.pointerEvents='none';
    visible=false;
    return;
  }
  btnNon.style.padding=`${Math.max(4,16*sc)}px ${Math.max(10,44*sc)}px`;
  btnNon.style.fontSize=`${Math.max(0.5,1.15*sc)}rem`;
  btnNon.style.opacity='1';
}

function onNonHover(){
  if(!visible)return;
  step=Math.min(step+1,messages.length-1);
  
  // Animation du sous-titre
  subtitle.style.animation='none'; 
  subtitle.offsetHeight;
  subtitle.style.animation='fadeIn 0.35s ease both';
  subtitle.textContent=messages[step].text;
  
  updateNon();
  
  // Téléportation du bouton
  const vw=window.innerWidth, vh=window.innerHeight;
  const nw=btnNon.offsetWidth||80, nh=btnNon.offsetHeight||50;
  btnNon.style.left=rand(40,vw-nw-40)+'px';
  btnNon.style.top=rand(40,vh-nh-40)+'px';
  btnNon.style.position='fixed';
}

function initNon(){
  const r=document.getElementById('btnOui').getBoundingClientRect();
  btnNon.style.position='fixed';
  btnNon.style.left=(r.right+22)+'px';
  btnNon.style.top=r.top+'px';
  btnNon.style.padding='16px 44px';
  btnNon.style.fontSize='1.15rem';
}

window.addEventListener('load',initNon);
window.addEventListener('resize',()=>{if(visible)initNon();});

/* ═══════════════════════════════════════════
   BOUTON OUI → SUCCÈS
═══════════════════════════════════════════ */
function onOui(){
  spawnConfetti(); 
  spawnSparkles(window.innerWidth/2,window.innerHeight/2);
  
  document.getElementById('mainContent').style.display='none';
  document.getElementById('successScreen').classList.add('show');
  btnNon.style.display='none';
  
  // Les chats chantent encore plus fort 🎉
  catEls.forEach(c=>{
    c.el.style.animationDuration='1s';
    c.el.style.fontSize='3rem';
  });
  
  setTimeout(spawnConfetti,400); 
  setTimeout(spawnConfetti,900); 
  setTimeout(spawnConfetti,1500);
}

function spawnConfetti(){
  const em=['❤️','💕','💖','💗','💝','🌸','✨','💓','😻','🐱','♥'];
  for(let i=0;i<22;i++){
    const el=document.createElement('div');
    el.className='confetti-heart';
    el.textContent=em[Math.floor(Math.random()*em.length)];
    el.style.left=rand(2,98)+'%'; 
    el.style.top='-40px';
    el.style.fontSize=rand(16,34)+'px';
    el.style.animationDuration=rand(2,5)+'s';
    el.style.animationDelay=rand(0,1.2)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),7000);
  }
}

function spawnSparkles(cx,cy){
  const em=['✨','💫','⭐','🌟','💥'];
  for(let i=0;i<14;i++){
    const el=document.createElement('div');
    el.className='sparkle';
    el.textContent=em[Math.floor(Math.random()*em.length)];
    const angle=(i/14)*360, dist=rand(60,150);
    el.style.left=cx+'px'; 
    el.style.top=cy+'px';
    el.style.setProperty('--tx',Math.cos(angle*Math.PI/180)*dist+'px');
    el.style.setProperty('--ty',Math.sin(angle*Math.PI/180)*dist+'px');
    el.style.animationDelay=rand(0,0.2)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1500);
  }
}
