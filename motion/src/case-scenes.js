import * as THREE from 'three';
import { gsap } from 'gsap';
const posterCache=new Map();

// Six original topic dioramas, rendered with one reusable WebGL context per view.
// The generator accepts only a topic ID, never an answer, grade or inspected cue.
function makeModel(id){
 const scene=new THREE.Scene(),root=new THREE.Group();scene.add(root);
 const resources={geometries:new Set(),materials:new Set(),textures:new Set()},motions=[];
 const palette={dark:0x244d3d,leaf:0xa8bd7e,pale:0xdbe7ba,paper:0xfffbe8,amber:0xe2be78,ink:0x78915e,blue:0xa9beb0};
 const mat={};for(const [key,color] of Object.entries(palette)){mat[key]=new THREE.MeshStandardMaterial({color,roughness:.76,metalness:.015});resources.materials.add(mat[key]);}
 const geo=g=>{resources.geometries.add(g);return g};
 function group(parent=root,x=0,y=0,z=0){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);return g;}
 function box(w,h,d,m,parent=root,x=0,y=0,z=0){
  const r=Math.min(.065,w/4,h/4,d/4),s=new THREE.Shape(),a=-w/2,b=-h/2;
  s.moveTo(a+r,b);s.lineTo(a+w-r,b);s.quadraticCurveTo(a+w,b,a+w,b+r);s.lineTo(a+w,b+h-r);s.quadraticCurveTo(a+w,b+h,a+w-r,b+h);s.lineTo(a+r,b+h);s.quadraticCurveTo(a,b+h,a,b+h-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);
  const g=geo(new THREE.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,bevelSize:r,bevelThickness:r,steps:1,curveSegments:3}));g.translate(0,0,-(d-2*r)/2);
  const mesh=new THREE.Mesh(g,m);mesh.position.set(x,y,z);parent.add(mesh);return mesh;
 }
 function sphere(radius,m,parent,x,y,z){const mesh=new THREE.Mesh(geo(new THREE.SphereGeometry(radius,16,10)),m);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 function texture(title,kind='lines'){
  const c=document.createElement('canvas');c.width=512;c.height=320;const ctx=c.getContext('2d');ctx.fillStyle='#fffbe8';ctx.fillRect(0,0,512,320);ctx.fillStyle='#244d3d';ctx.font='bold 25px sans-serif';ctx.fillText(title,28,47);ctx.fillStyle='#dbe7ba';ctx.fillRect(28,66,456,3);
  if(kind==='grid'){for(let r=0;r<4;r++)for(let col=0;col<5;col++){ctx.fillStyle=(r+col)%4===0?'#e2be78':(r+col)%3===0?'#a9beb0':'#dbe7ba';ctx.fillRect(28+col*91,94+r*48,78,35);}}
  else if(kind==='account'){ctx.fillStyle='#dbe7ba';ctx.fillRect(30,96,112,158);ctx.fillStyle='#88a166';ctx.beginPath();ctx.arc(86,136,21,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(86,193,37,27,0,Math.PI,0);ctx.fill();ctx.fillStyle='#c5d4aa';[0,1,2].forEach(i=>ctx.fillRect(168,108+i*49,266-i*30,19));}
  else if(kind==='browser'){ctx.fillStyle='#dbe7ba';ctx.fillRect(28,92,456,35);ctx.fillStyle='#70855e';ctx.font='19px monospace';ctx.fillText('https:// ...',41,116);ctx.fillStyle='#dbe7ba';[0,1,2].forEach(i=>ctx.fillRect(28,156+i*43,400-i*55,16));}
  else {ctx.fillStyle='#cad8b0';[0,1,2,3].forEach(i=>ctx.fillRect(28,100+i*43,420-i*38,12));ctx.fillStyle='#dbe7ba';ctx.fillRect(28,279,115,13);}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;resources.textures.add(t);const m=new THREE.MeshBasicMaterial({map:t});resources.materials.add(m);return m;
 }
 function face(w,h,m,parent,x,y,z,flat=false){const mesh=new THREE.Mesh(geo(new THREE.PlaneGeometry(w,h)),m);mesh.position.set(x,y,z);if(flat)mesh.rotation.x=-Math.PI/2;parent.add(mesh);return mesh;}
 function lines(parent,x,y,z,count=3,width=1){for(let i=0;i<count;i++)box(width-i*.11,.008,.025,mat.ink,parent,x,y,z+i*.15);}
 function card(parent,x,y,z,title='STUDENT',rotation=0){const c=group(parent,x,y,z);c.rotation.y=rotation;box(1.6,.065,.96,mat.paper,c);face(1.45,.83,texture(title,title==='STUDENT ID'?'account':'lines'),c,0,.036,0,true);return c;}
 function calendar(parent,x,y,z){const c=group(parent,x,y,z);box(1.18,1.35,.12,mat.paper,c,0,.67,0);face(1.04,1.18,texture('LIBRARY','grid'),c,0,.67,.067);for(let i=0;i<2;i++){const ring=new THREE.Mesh(geo(new THREE.TorusGeometry(.09,.023,6,14)),mat.dark);ring.position.set((i-.5)*.62,1.32,0);ring.rotation.y=Math.PI/2;c.add(ring);}return c;}
 function folder(parent,x,y,z){const f=group(parent,x,y,z);box(2.48,.1,1.84,mat.leaf,f);box(.65,.08,.24,mat.leaf,f,-.65,.015,-.98);box(2.25,.035,1.64,mat.paper,f,0,.09,0);face(2.12,1.5,texture('STUDENT FUNDING'),f,0,.112,0,true);const hinge=group(f,0,.15,-.86);box(2.48,.055,1.8,mat.amber,hinge,0,0,.9);box(.9,.015,.36,mat.paper,hinge,0,.045,.9);hinge.rotation.x=-.13;motions.push({object:hinge.rotation,property:'x',from:-.13,to:-.57});return f;}
 function book(parent,x,y,z,w=2.1,d=1.52,color=mat.dark){const b=group(parent,x,y,z);box(w,.1,d,color,b,0,0,0);box(w-.12,.22,d-.1,mat.paper,b,0,.13,0);box(w,.06,d,color,b,0,.28,0);return b;}
 function pencil(parent,x,y,z,angle=.2){const p=group(parent,x,y,z);p.rotation.y=angle;box(.1,.1,1.65,mat.amber,p);const tip=new THREE.Mesh(geo(new THREE.ConeGeometry(.065,.2,6)),mat.dark);tip.rotation.x=Math.PI/2;tip.position.z=.92;p.add(tip);return p;}
 // Common studio base and lights, with a consistent neutral palette.
 box(4.8,.14,3.25,mat.pale,root,0,-.14,0);box(4.86,.05,3.31,mat.leaf,root,0,-.24,0);
 scene.add(new THREE.HemisphereLight(0xfffbe8,0x718965,2.6));const key=new THREE.DirectionalLight(0xfff4dc,2.8);key.position.set(-3,7,5);scene.add(key);const fill=new THREE.DirectionalLight(0xdbe9d2,1.5);fill.position.set(5,4,-4);scene.add(fill);
 if(id==='account'){
  const monitor=group(root,-.55,0,-.45);box(.25,.8,.22,mat.ink,monitor,0,.55,0);box(1.12,.1,.6,mat.dark,monitor,0,.09,.08);box(2.5,1.65,.17,mat.dark,monitor,0,1.3,0);face(2.29,1.43,texture('CAMPUS ACCOUNT','account'),monitor,0,1.3,.092);
  const student=card(root,1.18,.18,.72,'STUDENT ID',-.23);motions.push({object:student.position,property:'y',from:.18,to:.47});motions.push({object:monitor.position,property:'y',from:0,to:.08});
  const keyboard=group(root,-.73,.05,1.06);keyboard.rotation.y=-.08;box(1.95,.07,.64,mat.leaf,keyboard);for(let r=0;r<3;r++)for(let c=0;c<8;c++)box(.15,.015,.1,mat.dark,keyboard,-.78+c*.22,.05,-.19+r*.17);
 }else if(id==='library'){
  const lower=book(root,-.7,.02,.1,2.25,1.6,mat.amber);lower.rotation.y=.08;const upper=book(root,-.83,.39,-.03,2.1,1.5,mat.dark);upper.rotation.y=-.16;
  const lid=group(upper,-1.05,.34,0);box(2.1,.055,1.5,mat.leaf,lid,1.05,0,0);lid.rotation.z=.025;motions.push({object:lid.rotation,property:'z',from:.025,to:.34});
  calendar(root,1.35,.02,-.6);const receipt=card(root,1.05,.05,1.02,'LOAN RECORD',.22);receipt.scale.set(.6,1,1.3);motions.push({object:receipt.position,property:'z',from:1.02,to:1.26});
 }else if(id==='grant'){
  const f=folder(root,-.55,.02,.15);f.rotation.y=-.2;const application=group(root,1.28,.08,-.54);application.rotation.x=-.14;application.rotation.y=.17;box(1.28,1.8,.06,mat.paper,application,0,.9,0);face(1.15,1.65,texture('APPLICATION'),application,0,.9,.038);box(.5,.1,.22,mat.amber,application,0,1.83,0);motions.push({object:application.position,property:'y',from:.08,to:.3});
  pencil(root,1.54,.06,1,.4);
 }else if(id==='timetable'){
  const board=group(root,-.75,.02,-.7);board.rotation.x=-.12;box(2.5,1.9,.13,mat.ink,board,0,1,0);face(2.28,1.68,texture('WEEKLY TIMETABLE','grid'),board,0,1,.074);box(2.6,.1,.45,mat.leaf,root,-.75,.02,-.6);
  const printer=group(root,1.35,.02,.55);box(1.4,.65,1.2,mat.leaf,printer,0,.32,0);box(1.32,.14,1.06,mat.dark,printer,0,.7,0);box(.92,.08,.12,mat.dark,printer,0,.32,.62);box(.18,.025,.12,mat.amber,printer,.45,.79,.22);
  const output=group(printer,0,.3,.95);box(.85,.025,1.1,mat.paper,output);face(.77,1,texture('EXPORT','grid'),output,0,.016,0,true);motions.push({object:output.position,property:'z',from:.95,to:1.26});
  card(root,-.87,.05,1.08,'COURSES',-.08).scale.set(.87,1,.65);
 }else if(id==='research'){
  const notes=group(root,-.66,.06,.23);notes.rotation.y=-.15;box(2.55,.16,1.9,mat.dark,notes);box(2.4,.06,1.8,mat.paper,notes,0,.12,0);face(2.22,1.65,texture('RESEARCH NOTES'),notes,0,.156,0,true);
  const page=group(notes,-1.18,.17,0);box(1.14,.02,1.7,mat.paper,page,.57,0,0);lines(page,.56,.02,-.4,4,.72);page.rotation.z=.05;motions.push({object:page.rotation,property:'z',from:.05,to:.31});
  for(let i=0;i<6;i++){const ring=new THREE.Mesh(geo(new THREE.TorusGeometry(.085,.022,6,12)),mat.leaf);ring.position.set(-1.27,.22,-.72+i*.28);ring.rotation.y=Math.PI/2;notes.add(ring);}
  const invitation=group(root,1.34,.04,-.54);invitation.rotation.y=.13;box(1.26,1.68,.09,mat.leaf,invitation,0,.9,0);face(1.12,1.48,texture('INVITATION'),invitation,0,.9,.052);motions.push({object:invitation.position,property:'y',from:.04,to:.25});pencil(root,1.29,.03,1.05,.7);
 }else if(id==='subdomain'){
  const browser=group(root,-.54,.02,-.62);box(2.94,1.95,.18,mat.dark,browser,0,1.09,0);face(2.72,1.72,texture('ASSESSMENT PORTAL','browser'),browser,0,1.09,.098);box(1.26,.12,.58,mat.leaf,root,-.55,.06,-.5);
  card(root,-1.04,.07,1.06,'EXAM ENTRY',-.17);
  const lens=group(root,1.24,.65,.87);lens.rotation.x=-.8;lens.rotation.z=-.43;const ring=new THREE.Mesh(geo(new THREE.TorusGeometry(.49,.065,10,40)),mat.amber);lens.add(ring);box(.14,.78,.14,mat.dark,lens,0,-.84,0);const glass=new THREE.Mesh(geo(new THREE.CircleGeometry(.43,36)),new THREE.MeshBasicMaterial({color:0xdcead1,transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide}));resources.materials.add(glass.material);lens.add(glass);
  motions.push({object:lens.position,property:'x',from:1.24,to:.8},{object:lens.position,property:'y',from:.65,to:1.25},{object:lens.rotation,property:'x',from:-.8,to:-.12});
 }
 const camera=new THREE.OrthographicCamera(-3.5,3.5,2.25,-2.25,.1,40);camera.position.set(6,5.5,8);camera.lookAt(0,.55,0);
 return {scene,root,camera,motions,dispose(){resources.geometries.forEach(g=>g.dispose());resources.materials.forEach(m=>m.dispose());resources.textures.forEach(t=>t.dispose());}};
}

export function mountCaseScenes(root,{reduced=false,playIntro=true}={}){
 const hosts=[...root.querySelectorAll('[data-case-scene]')];if(!hosts.length)return()=>{};
 let renderer,active=null,raf=0,disposed=false,observer,resizeObserver;
 const models=new Map(),tweens=new Set(),handlers=new AbortController();
 function model(id){if(!models.has(id))models.set(id,makeModel(id));return models.get(id);}
 function ensureRenderer(){if(renderer)return true;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});renderer.setClearColor(0,0);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.domElement.className='case-webgl';renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.addEventListener('webglcontextlost',lost,{signal:handlers.signal});return true;}catch{return false;}}
 function lost(event){event.preventDefault();stop();hosts.forEach(h=>{h.dataset.visual='fallback';h.querySelector('canvas')?.remove();});}
 function fit(host){if(!active||!renderer||!host.clientWidth||!host.clientHeight)return;const aspect=host.clientWidth/host.clientHeight;const m=model(host.dataset.caseScene),height=4.5;m.camera.left=-height*aspect/2;m.camera.right=height*aspect/2;m.camera.top=height/2;m.camera.bottom=-height/2;m.camera.updateProjectionMatrix();const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);if(renderer.domElement.width!==w||renderer.domElement.height!==h)renderer.setSize(w,h,false);renderer.render(m.scene,m.camera);}
 function tick(){if(disposed||!active||document.hidden)return;fit(active);raf=requestAnimationFrame(tick);}
 function stop(){cancelAnimationFrame(raf);raf=0;tweens.forEach(t=>t.kill());tweens.clear();if(active){const m=models.get(active.dataset.caseScene);m?.motions.forEach(({object,property,from})=>object[property]=from);m?.root.rotation.set(0,0,0);active.dataset.live='false';active=null;}renderer?.domElement.remove();}
 function start(host){if(disposed||reduced||!host.isConnected||!ensureRenderer())return;stop();active=host;host.append(renderer.domElement);host.dataset.live='true';const m=model(host.dataset.caseScene);m.motions.forEach(({object,property,from,to})=>{object[property]=from;tweens.add(gsap.to(object,{[property]:to,duration:.65,ease:'power2.out'}));});fit(host);tick();
  // No idle loop: keep the posed final frame after the short animation.
  const timer=gsap.delayedCall(.9,()=>{cancelAnimationFrame(raf);raf=0;fit(host)});tweens.add(timer);
 }
 function poster(host){const id=host.dataset.caseScene;if(!posterCache.has(id)){
   if(!ensureRenderer())return;const m=model(id);renderer.setSize(640,414,false);m.camera.left=-3.5;m.camera.right=3.5;m.camera.top=2.25;m.camera.bottom=-2.25;m.camera.updateProjectionMatrix();renderer.render(m.scene,m.camera);try{posterCache.set(id,renderer.domElement.toDataURL('image/png'));}catch{return;}
  }
  const img=document.createElement('img');img.src=posterCache.get(id);img.alt='';img.className='case-poster';img.width=640;img.height=414;img.draggable=false;host.querySelector('.case-poster')?.remove();host.append(img);host.dataset.visual='ready';
 }
 hosts.forEach(host=>{
  try{poster(host)}catch{host.dataset.visual='fallback'}
  const trigger=host.closest('.case-file')||host;
  trigger.addEventListener('pointerenter',()=>start(host),{signal:handlers.signal});trigger.addEventListener('pointerleave',()=>{if(active===host)stop()},{signal:handlers.signal});
  trigger.addEventListener('focusin',()=>start(host),{signal:handlers.signal});trigger.addEventListener('focusout',()=>{if(active===host)stop()},{signal:handlers.signal});
 });
 // Case/detail pages display their own short topic animation once upon entry.
 const detail=hosts.find(h=>!h.closest('.case-file'));if(detail&&playIntro)start(detail);
 observer=new IntersectionObserver(entries=>{if(active&&entries.some(e=>e.target===active&&!e.isIntersecting))stop()});hosts.forEach(h=>observer.observe(h));
 resizeObserver=new ResizeObserver(()=>{if(active)fit(active)});hosts.forEach(h=>resizeObserver.observe(h));
 function visibility(){if(document.hidden)stop()}document.addEventListener('visibilitychange',visibility,{signal:handlers.signal});
 return()=>{disposed=true;stop();handlers.abort();observer?.disconnect();resizeObserver?.disconnect();models.forEach(m=>m.dispose());renderer?.dispose();renderer?.forceContextLoss();hosts.forEach(h=>h.querySelector('.case-poster')?.remove());};
}
