(()=>{'use strict';
const d=document,R=d.documentElement,$=(s,r=d)=>[...r.querySelectorAll(s)];
const mk=(t,c,p=d.body)=>{const e=d.createElement(t);e.className=c;p.append(e);return e};
const ac=(getComputedStyle(R).getPropertyValue('--accent')||'').trim()||'#111111';
R.style.setProperty('--al',ac);
const hx=ac.replace('#','').replace(/^(.)(.)(.)$/,'$1$1$2$2$3$3'),L=hx.length===6?(.299*parseInt(hx.slice(0,2),16)+.587*parseInt(hx.slice(2,4),16)+.114*parseInt(hx.slice(4),16))/255:.3;
R.style.setProperty('--alt',L>.6?'#111':'#fff');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
const bar=mk('div','al-prog'),nav=d.querySelector('nav'),nw=nav&&nav.parentElement;
if(nw)nw.classList.add('al-nw');
const sc=()=>{const h=R.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';nw&&nw.classList.toggle('al-st',scrollY>20)};
addEventListener('scroll',sc,{passive:true});sc();
const dot=fine&&!calm?mk('div','al-dot'):null;
function tag(x,y,a,b){const t=mk('div','al-tag'),s=d.createElement('span');s.textContent=a;t.append(s);if(b){const e=d.createElement('b');e.textContent=b;t.append(e)}t.style.left=Math.max(8,Math.min(x,innerWidth-270))+'px';t.style.top=Math.max(y,120)+'px';setTimeout(()=>t.remove(),2500)}
d.addEventListener('click',e=>{if(!calm){const r=mk('div','al-rip');r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';setTimeout(()=>r.remove(),650)}
const c=e.target.closest&&e.target.closest('.product');
if(c){const h=c.querySelector('h3'),p=c.querySelector('.price'),r0=c.getBoundingClientRect(),kx=e.clientX||r0.left+r0.width/2,ky=e.clientY||r0.top+r0.height/2;tag(kx,ky,h?h.textContent.trim():'',p?p.textContent.trim():'')}});
d.addEventListener('submit',e=>{const r=(e.submitter||e.target).getBoundingClientRect();tag(r.left,r.top,'Заявка отправлена','Спасибо')},true);
if(!calm)$('h1').forEach(h=>{let i=0;const w=d.createTreeWalker(h,NodeFilter.SHOW_TEXT),ns=[];while(w.nextNode())ns.push(w.currentNode);ns.forEach(n=>{const f=d.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.append(p);return}const s=d.createElement('span');s.className='al-w';s.style.setProperty('--i',i++);s.textContent=p;f.append(s)});n.replaceWith(f)})});
function count(el){const o=el.textContent,m=o.match(/\d[\d\s\u00a0]*/);if(!m)return;const n=+m[0].replace(/\D/g,''),t0=performance.now(),sp=/\s$/.test(m[0])?' ':'';(function f(t){const k=Math.min(1,(t-t0)/1100);el.textContent=k<1?o.replace(m[0],Math.round(n*(1-Math.pow(1-k,3))).toLocaleString('ru-RU')+sp):o;if(k<1)requestAnimationFrame(f)})(t0)}
if(!calm&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;io.unobserve(t);t.classList.add('in');$('.price,[data-n]',t).forEach(count);setTimeout(()=>t.classList.remove('al-r','in'),1500)}),{threshold:.1});
$('.section-header,.chips,.product,.benefit,.feature .tag,.feature h2,.contact>*,.row,.stats,footer').forEach(t=>{t.style.setProperty('--d',Math.min([...t.parentElement.children].indexOf(t),6)*.07+'s');t.classList.add('al-r');io.observe(t)})}
$('.product').forEach(p=>{p.tabIndex=0;p.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target===p)p.click()})});
const main=d.querySelector('main');if(main){main.id=main.id||'main';const sk=mk('a','al-skip');sk.href='#'+main.id;sk.textContent='К содержимому'}
const links=$('.links a[href^="#"]');
if(links.length&&'IntersectionObserver' in window){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});links.forEach(a=>{const s=d.getElementById(a.getAttribute('href').slice(1));s&&so.observe(s)})}
let cur=null;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(!fine)return;
const c=e.target.closest&&e.target.closest('.button,.navbtn');
if(cur&&cur!==c){cur.style.transform='';cur=null}
if(c){cur=c;const r=c.getBoundingClientRect();c.style.transform='translate('+((mx-r.left)/r.width-.5)*12+'px,'+((my-r.top)/r.height-.5)*8+'px)'}
if(dot)dot.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,.product,input,select')))},{passive:true});
const himg=d.querySelector('.hero-img');
(function loop(){rx+=(mx-rx)*.22;ry+=(my-ry)*.22;
if(dot)dot.style.transform='translate('+rx+'px,'+ry+'px)';
if(himg&&!calm)himg.style.transform='translate3d(0,'+scrollY*.05+'px,0)';
requestAnimationFrame(loop)})();
})();
