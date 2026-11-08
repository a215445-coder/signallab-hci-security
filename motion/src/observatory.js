import * as THREE from 'three';
import { gsap } from 'gsap';

export function exhibitFallback(){return `<svg class="desk-illustration" viewBox="0 0 600 500" aria-hidden="true"><ellipse cx="310" cy="424" rx="219" ry="29" fill="#0b1937"/><path d="m99 367 315-29 122 63-314 38Z" fill="#294994"/><g transform="rotate(-7 285 255)"><rect x="128" y="155" width="299" height="231" rx="12" fill="#7694f5"/><rect x="146" y="84" width="263" height="261" rx="8" fill="#f5f6f8"/><circle cx="182" cy="124" r="14" fill="#dce6fa"/><g stroke="#a8b6ce" stroke-width="7" stroke-linecap="round"><path d="M215 119h147m-192 61h190m-190 26h165m-165 26h176"/></g><rect x="169" y="258" width="135" height="32" rx="4" fill="#c6e1e5"/><path d="m128 174 149 115 150-115v212H128Z" fill="#3e5fac"/><path d="m130 378 147-117 147 117" fill="none" stroke="#9eb8f6" stroke-width="2"/></g><g transform="rotate(-24 439 270)"><circle cx="439" cy="231" r="66" fill="#9bcee1" fill-opacity=".22" stroke="#d3e3ff" stroke-width="12"/><rect x="429" y="297" width="20" height="104" rx="9" fill="#a9bfed"/><rect x="425" y="291" width="28" height="18" rx="4" fill="#edbd63"/></g><g transform="rotate(13 449 364)"><rect x="400" y="347" width="87" height="62" rx="5" fill="#3e9ba5"/><rect x="416" y="364" width="40" height="11" rx="2" fill="#e4f3f4"/></g></svg>`;}

// A single procedural exhibit. No case evidence or answers enter this scene.
export function createObservatory(host,{reduced=false,onNavigate}={}){
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});}
 catch{host.dataset.scene='fallback';return()=>{};}
 const canvas=renderer.domElement;canvas.className='desk-webgl';canvas.setAttribute('aria-hidden','true');
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<740?1.25:1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.shadowMap.enabled=innerWidth>=740;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.setClearColor(0,0);host.prepend(canvas);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,70);
 camera.position.set(7,5.3,10.8);camera.lookAt(0,.65,0);
 const world=new THREE.Group();world.rotation.y=-.12;scene.add(world);
 const geometries=new Set(),materials=new Set(),textures=new Set(),animations=new Set();
 const material=(color,extra={})=>{const m=new THREE.MeshStandardMaterial({color,roughness:.4,metalness:.12,...extra});materials.add(m);return m;};
 const navy=material(0x294994),blue=material(0x7694f5),edge=material(0x162b62),paper=material(0xf5f6f8),teal=material(0x3e9ba5),gold=material(0xedbd63,{metalness:.65,roughness:.23}),chrome=material(0xcbdafa,{metalness:.75,roughness:.22});
 const mesh=(g,m,parent=world)=>{geometries.add(g);const o=new THREE.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
 function box(w,h,d,m,parent=world,x=0,y=0,z=0,r=.08){
  r=Math.min(r,w/3,h/3,d/3);const s=new THREE.Shape(),a=-w/2,b=-h/2;
  s.moveTo(a+r,b);s.lineTo(a+w-r,b);s.quadraticCurveTo(a+w,b,a+w,b+r);s.lineTo(a+w,b+h-r);s.quadraticCurveTo(a+w,b+h,a+w-r,b+h);s.lineTo(a+r,b+h);s.quadraticCurveTo(a,b+h,a,b+h-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);
  const g=new THREE.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:r,bevelThickness:r,curveSegments:5});g.translate(0,0,-(d-2*r)/2);
  const o=mesh(g,m,parent);o.position.set(x,y,z);return o;
 }
 scene.add(new THREE.HemisphereLight(0xeaf0ff,0x354164,3));
 const key=new THREE.DirectionalLight(0xffffff,4.2);key.position.set(-4,7,8);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6});key.shadow.normalBias=.035;scene.add(key);
 const fill=new THREE.DirectionalLight(0x90b9ff,3);fill.position.set(6,3,-3);scene.add(fill);
 box(6.8,.2,4.8,edge,world,0,-1.15,0,.07);box(6.6,.05,4.6,navy,world,0,-1.02,0,.015);
 const mail=new THREE.Group();mail.position.set(-.35,.3,0);mail.rotation.set(-.1,-.08,.03);mail.userData.route='practice';world.add(mail);
 // Large layered envelope and a textured letter, all physically modeled.
 box(4.15,2.75,.2,blue,mail,0,0,0,.065);
 box(3.85,3.1,.07,paper,mail,0,.72,-.14,.02);
 const textureCanvas=document.createElement('canvas');textureCanvas.width=1024;textureCanvas.height=820;const c=textureCanvas.getContext('2d');
 c.fillStyle='#f5f6f8';c.fillRect(0,0,1024,820);c.fillStyle='#dce6fa';c.beginPath();c.arc(120,100,39,0,Math.PI*2);c.fill();
 c.fillStyle='#2d4c83';c.font='600 40px sans-serif';c.fillText('Campus inbox',188,113);c.fillStyle='#6a7890';c.font='27px sans-serif';c.fillText('A message worth a second look',70,216);
 c.fillStyle='#d4ddeb';for(let i=0;i<4;i++)c.fillRect(70,267+i*58,850-i*70,15);c.fillStyle='#d7e9ea';c.fillRect(70,537,360,75);c.fillStyle='#246471';c.font='28px sans-serif';c.fillText('Explore the evidence',93,584);
 const texture=new THREE.CanvasTexture(textureCanvas);texture.colorSpace=THREE.SRGBColorSpace;textures.add(texture);const tm=new THREE.MeshBasicMaterial({map:texture});materials.add(tm);
 const letter=mesh(new THREE.PlaneGeometry(3.62,2.9),tm,mail);letter.position.set(0,.74,-.095);
 const shape=new THREE.Shape();shape.moveTo(-2.03,-1.33);shape.lineTo(2.03,-1.33);shape.lineTo(2.03,1.28);shape.lineTo(0,-.12);shape.lineTo(-2.03,1.28);shape.closePath();
 const front=mesh(new THREE.ShapeGeometry(shape),navy,mail);front.position.z=.12;
 const lineM=new THREE.LineBasicMaterial({color:0xa3b9ff});materials.add(lineM);
 for(const side of [-1,1]){const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(side*2,-1.25,.13),new THREE.Vector3(0,.05,.13)]);geometries.add(g);mail.add(new THREE.Line(g,lineM));}
 const lens=new THREE.Group();lens.position.set(1.95,1.15,1.15);lens.rotation.set(-.12,-.2,-.25);lens.userData.route='experiments';world.add(lens);
 mesh(new THREE.TorusGeometry(.83,.1,12,56),chrome,lens);
 const glass=material(0xa0d9eb,{transparent:true,opacity:.2,roughness:.05,metalness:.05,depthWrite:false});mesh(new THREE.CircleGeometry(.74,48),glass,lens);
 box(.21,1.5,.25,edge,lens,0,-1.47,0,.07);box(.26,.19,.29,gold,lens,0,-.86,0,.05);
 const notebook=new THREE.Group();notebook.position.set(1.95,-.76,-1.05);notebook.rotation.set(-Math.PI/2,0,-.22);notebook.userData.route='report';world.add(notebook);
 box(1.28,1.7,.18,teal,notebook);box(.85,.26,.018,paper,notebook,0,.2,.11,.006);box(.06,1.67,.02,edge,notebook,.37,0,.11,.005);
 const identity=new THREE.Group();identity.position.set(-2.4,-.79,1.2);identity.rotation.set(-Math.PI/2,0,.18);identity.userData.route='practice';world.add(identity);box(1.35,.87,.055,paper,identity);box(.35,.46,.014,blue,identity,-.33,0,.04,.004);box(.45,.055,.016,navy,identity,.2,.12,.04,.003);box(.34,.04,.016,teal,identity,.15,-.05,.04,.003);
 const floorM=new THREE.ShadowMaterial({opacity:.25});materials.add(floorM);const floor=mesh(new THREE.CircleGeometry(5,64),floorM,scene);floor.rotation.x=-Math.PI/2;floor.position.y=-1.3;
 let disposed=false,visible=true,dirty=true,timer,hovered=null,down=null;
 const track=t=>{animations.add(t);t.eventCallback('onComplete',()=>animations.delete(t));t.eventCallback('onInterrupt',()=>animations.delete(t));return t;};
 const draw=()=>{if(!disposed&&visible&&!document.hidden){renderer.render(scene,camera);dirty=false;}};
 function wake(ms=1000){if(disposed)return;dirty=true;clearTimeout(timer);renderer.setAnimationLoop(()=>{if(visible&&!document.hidden)draw();});timer=setTimeout(()=>{renderer.setAnimationLoop(null);draw();},ms);}
 function resize(){if(disposed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;const distance=Math.max(1,Math.sqrt(1.18/camera.aspect));camera.position.set(7*distance,5.3*distance,10.8*distance);camera.lookAt(0,.65,0);camera.updateProjectionMatrix();renderer.setSize(w,h,false);draw();}
 const ro=new ResizeObserver(resize);ro.observe(host);const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible){resize();wake(100);}else renderer.setAnimationLoop(null);},{threshold:.01});io.observe(host);
 const visibility=()=>{if(document.hidden)renderer.setAnimationLoop(null);else if(visible)wake(100);};document.addEventListener('visibilitychange',visibility);
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
 function pick(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);for(const hit of ray.intersectObjects(world.children,true)){let o=hit.object;while(o&&o!==world){if(o.userData.route)return o;o=o.parent;}}return null;}
 function move(e){if(reduced)return;const r=canvas.getBoundingClientRect();if(matchMedia('(pointer:fine)').matches){track(gsap.to(world.rotation,{y:-.12+((e.clientX-r.left)/r.width-.5)*.15,x:((e.clientY-r.top)/r.height-.5)*.05,duration:.5,overwrite:'auto'}));wake();}const selected=pick(e);if(selected!==hovered){if(hovered)track(gsap.to(hovered.position,{y:hovered.userData.restY,duration:.2,overwrite:'auto'}));hovered=selected;host.dataset.hover=selected?.userData.route||'';canvas.style.cursor=selected?'pointer':'default';if(selected){selected.userData.restY??=selected.position.y;track(gsap.to(selected.position,{y:selected.userData.restY+.1,duration:.25,overwrite:'auto'}));wake();}}}
 function leave(){if(reduced)return;if(hovered)track(gsap.to(hovered.position,{y:hovered.userData.restY,duration:.25,overwrite:'auto'}));hovered=null;host.dataset.hover='';track(gsap.to(world.rotation,{x:0,y:-.12,duration:.5,overwrite:'auto'}));wake();}
 const press=e=>{down={x:e.clientX,y:e.clientY};},release=e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<8){const o=pick(e);if(o)onNavigate?.(o.userData.route);}down=null;};
 function lost(e){e.preventDefault();host.dataset.scene='fallback';canvas.hidden=true;renderer.setAnimationLoop(null);}
 canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointerdown',press);canvas.addEventListener('pointerup',release);canvas.addEventListener('webglcontextlost',lost);
 host.dataset.scene='ready';resize();
 if(!reduced){const tl=gsap.timeline();tl.from(mail.position,{y:-.2,duration:.8,ease:'power3.out'},0).from(mail.rotation,{z:-.09,duration:.8},0).from(lens.position,{y:1.65,duration:.9,ease:'power3.out'},.1).from(world.rotation,{y:.2,duration:1,ease:'power3.out'},0);track(tl);wake(1300);}else draw();
 host._desk={open(){if(reduced)return;track(gsap.to(mail.position,{y:.6,z:.45,duration:.4}));track(gsap.to(lens.position,{x:1.15,duration:.4}));wake(600);}};
 return()=>{disposed=true;clearTimeout(timer);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);animations.forEach(t=>t.kill());renderer.setAnimationLoop(null);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointerdown',press);canvas.removeEventListener('pointerup',release);canvas.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.forceContextLoss();canvas.remove();delete host._desk;};
}
