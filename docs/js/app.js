const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg';
const CASOS={vaciado_conPv:'Vaciado con Pv',vaciado_sinPv:'Vaciado sin Pv',llenado:'Llenado'};
const defs=[['v_m_s','v (m/s)','#2f5877'],['P_kPa_o_mca','P1','#d9590d'],['L_m','Le (m)','#1f9e52']];
const unit=k=>k=='llenado'?'m.c.a.':'kPa';
let caso='vaciado_conPv',D,idx=0,run=true;
const el=(p,t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e};
const mn=a=>Math.min(...a),mx=a=>Math.max(...a);
function count(n,to,dec,suf){const t0=performance.now(),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const f=t=>{const k=red?1:Math.min((t-t0)/1200,1),e=1-Math.pow(1-k,3);n.textContent=(to*e).toLocaleString('es',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function kpis(){const u=unit(caso),items=[[mx(D.v_m_s),3,' m/s','Velocidad máxima'],[mn(D.P_kPa_o_mca),caso=='vaciado_sinPv'?4:2,' '+u,'Presión mínima P1'],[D.L_m.at(-1),2,' m','Le final'],[D.t_s.length,0,'','Pasos registrados']];
 $('#kpi').innerHTML=items.map(i=>`<div class="kpi"><b>0</b><span>${i[3]}</span></div>`).join('');
 document.querySelectorAll('#kpi .kpi').forEach((k,i)=>count(k.firstChild,items[i][0],items[i][1],items[i][2]))}
function chart(host,c,y,col,u){const W=900,H=200,m={l:56,r:12,t:18,b:26},t=D.t_s,v=D[c];
 const x0=t[0],x1=t.at(-1),lo=mn(v),hi=mx(v),pad=(hi-lo||1)*.08,y0=lo-pad,y1=hi+pad;
 const X=a=>m.l+(a-x0)/(x1-x0)*(W-m.l-m.r),Y=a=>m.t+(1-(a-y0)/(y1-y0))*(H-m.t-m.b);
 const s=el(host,'svg',{viewBox:`0 0 ${W} ${H}`,width:'100%',class:'g',role:'img','aria-label':y});
 for(let i=0;i<=4;i++){const yy=y0+(y1-y0)*i/4;el(s,'line',{x1:m.l,x2:W-m.r,y1:Y(yy),y2:Y(yy),stroke:'#e1e7ec'});el(s,'text',{x:m.l-6,y:Y(yy)+4,'text-anchor':'end'}).textContent=yy.toPrecision(3)}
 for(let i=0;i<=5;i++){const xx=x0+(x1-x0)*i/5;el(s,'text',{x:X(xx),y:H-8,'text-anchor':'middle'}).textContent=xx.toFixed(0)}
 el(s,'text',{x:m.l,y:11}).textContent=(c=='P_kPa_o_mca'?'P1 ('+u+')':y)+'  ·  t (s)';
 const pa=el(s,'path',{d:t.map((a,i)=>(i?'L':'M')+X(a)+','+Y(v[i])).join(''),fill:'none',stroke:col,'stroke-width':2});
 const L=pa.getTotalLength();pa.style.strokeDasharray=L;pa.style.strokeDashoffset=L;pa.getBoundingClientRect();pa.style.transition='stroke-dashoffset 1.4s ease-out';pa.style.strokeDashoffset=0;
 const cur=el(s,'line',{y1:m.t,y2:H-m.b,stroke:col,opacity:0}),dot=el(s,'circle',{r:4,fill:col,opacity:0});
 s.onmousemove=e=>{const r=s.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W,tv=x0+(px-m.l)/(W-m.l-m.r)*(x1-x0);let i=0;while(i<t.length-1&&t[i]<tv)i++;
  cur.setAttribute('x1',X(t[i]));cur.setAttribute('x2',X(t[i]));cur.setAttribute('opacity',.4);dot.setAttribute('cx',X(t[i]));dot.setAttribute('cy',Y(v[i]));dot.setAttribute('opacity',1);
  const T=$('#tip');T.style.display='block';T.style.left=e.clientX+12+'px';T.style.top=e.clientY+12+'px';T.textContent=`t=${t[i].toFixed(2)} s · ${v[i].toPrecision(4)}`};
 s.onmouseleave=()=>{$('#tip').style.display='none';cur.setAttribute('opacity',0);dot.setAttribute('opacity',0)}}
function draw(){const s=$('#anim');s.innerHTML='';const Lm=mx(D.L_m),L=D.L_m[idx],v=D.v_m_s[idx],P=D.P_kPa_o_mca[idx],w=800,ph=(performance.now()/40)%32;
 el(s,'rect',{x:50,y:60,width:w,height:50,fill:'#fff',stroke:'#14283a','stroke-width':2});
 el(s,'rect',{x:50,y:60,width:w*L/Lm,height:50,fill:'#2f7fb8',opacity:.35});
 el(s,'line',{x1:50,x2:50+w*L/Lm,y1:85,y2:85,stroke:'#2f7fb8','stroke-width':5,'stroke-dasharray':'14 18','stroke-dashoffset':-ph*(v<0?-1:1)*Math.min(Math.abs(v)/5+.2,2)});
 el(s,'line',{x1:50+w*L/Lm,x2:50+w*L/Lm,y1:52,y2:118,stroke:'#d9590d','stroke-width':3});
 el(s,'text',{x:50,y:35}).textContent=`t = ${D.t_s[idx].toFixed(2)} s   ·   Le = ${L.toFixed(1)} m   ·   v = ${v.toFixed(2)} m/s   ·   P1 = ${P.toPrecision(4)} ${unit(caso)}`;
 el(s,'text',{x:50,y:150}).textContent='Azul: columna de agua Le(t) respecto a su máximo. Naranja: frente. El flujo punteado sigue a v(t).';
 $('#sl').value=idx;$('#tt').textContent=D.t_s[idx].toFixed(1)+' s'}
function build(){D=DATA[caso];idx=0;$('#sl').max=D.t_s.length-1;kpis();$('#charts').innerHTML='';defs.forEach(d=>chart($('#charts'),d[0],d[1],d[2],unit(caso)));
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.k==caso))}
$('.tabs').innerHTML=Object.entries(CASOS).map(([k,n])=>`<button data-k="${k}">${n}</button>`).join('');
$('.tabs').onclick=e=>{if(e.target.dataset.k){caso=e.target.dataset.k;build()}};
$('#play').onclick=()=>{run=!run;$('#play').textContent=run?'Pausar':'Reproducir'};
$('#sl').oninput=e=>{idx=+e.target.value;run=false;$('#play').textContent='Reproducir'};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.id=='resultados')kpis()}}),{threshold:.2});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
build();(function loop(){if(run)idx=(idx+1)%D.t_s.length;draw();setTimeout(loop,40)})();
