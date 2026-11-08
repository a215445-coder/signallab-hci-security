import * as THREE from 'three';
import { gsap } from 'gsap';

// Original procedural models: all geometry and textures are generated locally.
export function createDesk(host, { reduced = false, onNavigate } = {}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: true }); }
  catch { host.dataset.scene = 'fallback'; return () => {}; }
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'desk-webgl';
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 740 ? 1.25 : 1.5));
  renderer.shadowMap.enabled = innerWidth >= 740;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  host.prepend(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 80);
  camera.position.set(9, 9.5, 11.8);
  camera.lookAt(0, .2, 0);
  const world = new THREE.Group(); scene.add(world);
  const materials = new Set(), geometries = new Set(), textures = new Set();
  const color = { forest: 0x344c85, leaf: 0xa9bce8, pale: 0xe4eafa, paper: 0xfffaf0, amber: 0xe9ad53, edge: 0x6476a1, pink: 0xe89c89, dark: 0x18243a, teal: 0x369b9a, coral: 0xe98b77 };
  function mat(c, extra = {}) { const m = new THREE.MeshStandardMaterial({color:c, roughness:.7, metalness:.04, ...extra}); materials.add(m); return m; }
  const m = Object.fromEntries(Object.entries(color).map(([k,c]) => [k,mat(c)]));
  const clear = mat(0xd3ece0,{ transparent:true, opacity:.28, roughness:.15, metalness:.15, depthWrite:false });
  function geometry(g) {geometries.add(g);return g;}
  function box(w,h,d,material,parent,x=0,y=0,z=0,round=.05){
    const r=Math.min(round,w/3,h/3,d/3);
    const shape=new THREE.Shape(); const a=-w/2,b=-h/2;
    shape.moveTo(a+r,b);shape.lineTo(a+w-r,b);shape.quadraticCurveTo(a+w,b,a+w,b+r);shape.lineTo(a+w,b+h-r);shape.quadraticCurveTo(a+w,b+h,a+w-r,b+h);shape.lineTo(a+r,b+h);shape.quadraticCurveTo(a,b+h,a,b+h-r);shape.lineTo(a,b+r);shape.quadraticCurveTo(a,b,a+r,b);
    const g=geometry(new THREE.ExtrudeGeometry(shape,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r,bevelThickness:r,curveSegments:3}));g.translate(0,0,-(d-2*r)/2);
    const mesh=new THREE.Mesh(g,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  }
  function cyl(r1,r2,h,material,parent,x,y,z,n=32){const mesh=new THREE.Mesh(geometry(new THREE.CylinderGeometry(r1,r2,h,n)),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function group(x,y,z,route){const g=new THREE.Group();g.position.set(x,y,z);if(route)g.userData.route=route;world.add(g);return g;}
  const ambient=new THREE.HemisphereLight(0xffffff,0x727c9e,2.6);scene.add(ambient);
  const sun=new THREE.DirectionalLight(0xfff5da,4);sun.position.set(-4,9,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-7;sun.shadow.camera.right=7;sun.shadow.camera.top=7;sun.shadow.camera.bottom=-7;sun.shadow.normalBias=.04;scene.add(sun);
  const fill=new THREE.DirectionalLight(0xdce7ff,1.5);fill.position.set(6,4,-6);scene.add(fill);
  // Layered desk and a muted, circular floor shadow.
  box(8.1,.35,5.25,m.leaf,world,0,-.38,0,.14);
  box(8.25,.12,5.4,m.forest,world,0,-.6,0,.05);
  box(7.9,.03,5.05,m.pale,world,0,-.18,0,.01);
  const floor=new THREE.Mesh(geometry(new THREE.CircleGeometry(5.7,64)),new THREE.ShadowMaterial({opacity:.14}));materials.add(floor.material);floor.rotation.x=-Math.PI/2;floor.position.y=-.72;floor.receiveShadow=true;scene.add(floor);
  // Notebook computer: hinged screen, physical keys, and a generated inbox texture.
  const laptop=group(-.35,-.05,-.32,'experiments');
  box(3,.14,1.95,m.forest,laptop,0,0,0,.06);
  box(2.86,.04,1.8,m.leaf,laptop,0,.09,0,.016);
  box(.72,.025,.38,m.pale,laptop,0,.13,.59,.01);
  const keyG=geometry(new THREE.BoxGeometry(.19,.025,.12)),keys=new THREE.InstancedMesh(keyG,m.forest,40);const matrix=new THREE.Matrix4();
  for(let i=0;i<40;i++){matrix.makeTranslation((i%10-4.5)*.235,.13,Math.floor(i/10)*.19-.57);keys.setMatrixAt(i,matrix);}laptop.add(keys);
  const hinge=new THREE.Group();hinge.position.set(0,.05,-.92);hinge.rotation.x=-.12;laptop.add(hinge);
  box(3,1.92,.14,m.forest,hinge,0,1.03,0,.06);
  const screenCanvas=document.createElement('canvas');screenCanvas.width=768;screenCanvas.height=460;const ctx=screenCanvas.getContext('2d');
  ctx.fillStyle='#f7f9ff';ctx.fillRect(0,0,768,460);ctx.fillStyle='#344c85';ctx.fillRect(0,0,768,75);ctx.font='bold 24px sans-serif';ctx.fillStyle='#edf2ff';ctx.fillText('SignalLab / Campus inbox',30,47);
  ctx.fillStyle='#e7edfc';ctx.fillRect(20,96,150,340);ctx.font='17px sans-serif';ctx.fillStyle='#53678f';['Inbox','Case files','Evidence','Notebook'].forEach((s,i)=>ctx.fillText(s,37,140+i*49));
  ctx.fillStyle='#263b68';ctx.font='bold 26px sans-serif';ctx.fillText('A message worth a closer look.',195,139);ctx.font='18px sans-serif';ctx.fillStyle='#64718b';ctx.fillText('Campus notifications',195,176);ctx.fillStyle='#e2e8f7';[0,1,2].forEach(i=>ctx.fillRect(195,205+i*35,480-i*48,13));ctx.fillStyle='#c6e7e4';ctx.fillRect(195,335,198,47);ctx.fillStyle='#205c64';ctx.fillText('Inspect the evidence',211,366);
  const screenTexture=new THREE.CanvasTexture(screenCanvas);screenTexture.colorSpace=THREE.SRGBColorSpace;textures.add(screenTexture);const screenMat=new THREE.MeshBasicMaterial({map:screenTexture});materials.add(screenMat);
  const screen=new THREE.Mesh(geometry(new THREE.PlaneGeometry(2.78,1.66)),screenMat);screen.position.set(0,1.03,.078);hinge.add(screen);
  // Folder with a hinged cover and a paper insert.
  const folder=group(-2.5,-.06,1.03,'practice');folder.rotation.y=.13;
  box(2.06,.07,1.45,m.coral,folder,0,0,0,.025);box(.65,.06,.24,m.coral,folder,-.57,.01,-.78,.02);box(1.82,.025,1.21,m.paper,folder,.04,.07,.015,.01);
  for(let i=0;i<4;i++)box(1.05-i*.14,.006,.025,m.leaf,folder,-.15,.09,-.35+i*.16,.002);
  const cover=new THREE.Group();cover.position.set(0,.12,-.65);folder.add(cover);box(2.06,.045,1.4,m.coral,cover,0,0,.7,.015);cover.rotation.x=-.16;
  box(.9,.012,.34,m.paper,cover,.02,.035,.72,.006);
  // Evidence notebook, including binding rings and a green elastic strap.
  const notebook=group(2.56,-.04,-.45,'report');notebook.rotation.y=-.18;
  box(1.5,.18,2.05,m.teal,notebook,0,0,0,.055);box(1.36,.105,1.89,m.paper,notebook,.01,.04,0,.025);box(1.5,.035,2.05,m.teal,notebook,0,.12,0,.012);box(.08,.024,2.06,m.forest,notebook,.45,.15,0,.006);
  for(let i=0;i<5;i++){const ring=new THREE.Mesh(geometry(new THREE.TorusGeometry(.09,.023,6,14)),m.forest);ring.position.set(-.71,.16,-.7+i*.35);ring.rotation.y=Math.PI/2;notebook.add(ring);}
  box(.65,.015,.45,m.pale,notebook,-.06,.16,-.27,.005);
  // Magnifying glass with a translucent lens, brass rim and dark handle.
  const magnifier=group(1.35,.02,1.68);magnifier.rotation.y=-.52;
  const rim=new THREE.Mesh(geometry(new THREE.TorusGeometry(.51,.075,10,48)),m.amber);rim.rotation.x=-Math.PI/2;rim.position.y=.12;rim.castShadow=true;magnifier.add(rim);
  cyl(.46,.46,.025,clear,magnifier,0,.12,0,48);box(.17,.16,.86,m.forest,magnifier,0,.11,.88,.05);box(.21,.19,.12,m.amber,magnifier,0,.11,.48,.04);
  // Desk cup, pencils and campus architecture miniature.
  const cup=group(-2.95,-.02,-1.55);cyl(.31,.27,.66,m.paper,cup,0,.31,0);cyl(.255,.255,.013,m.dark,cup,0,.65,0);
  for(let i=0;i<3;i++){const pen=cyl(.028,.028,1.05,i===1?m.amber:m.forest,cup,(i-1)*.1,.74,0,6);pen.rotation.z=(i-1)*.16;}
  const campus=group(1.2,-.06,-1.95);box(.94,.36,.6,m.paper,campus,0,.2,0,.025);box(1.06,.1,.7,m.forest,campus,0,.43,0,.025);for(let i=0;i<4;i++)box(.09,.3,.07,m.leaf,campus,-.34+i*.23,.21,.34,.02);
  const roof=new THREE.Mesh(geometry(new THREE.ConeGeometry(.64,.3,4)),m.leaf);roof.position.set(0,.61,0);roof.rotation.y=Math.PI/4;roof.scale.z=.65;campus.add(roof);
  const note=group(.1,-.04,1.86);note.rotation.y=.18;box(.85,.02,.62,m.paper,note);for(let i=0;i<3;i++)box(.52-i*.09,.005,.02,m.leaf,note,-.03,.02,-.16+i*.12,.002);
  const props=[laptop,folder,notebook,magnifier,cup,campus,note];
  let visible=true,disposed=false,active=false,dirty=true;const tweens=new Set();let interactionTimer;
  const track=t=>{tweens.add(t);t.eventCallback('onComplete',()=>tweens.delete(t));t.eventCallback('onInterrupt',()=>tweens.delete(t));return t;};
  function draw(){if(disposed||!visible||document.hidden)return;renderer.render(scene,camera);dirty=false;}
  function wake(ms=1100){if(disposed)return;dirty=true;active=true;clearTimeout(interactionTimer);renderer.setAnimationLoop(()=>{if(visible&&!document.hidden&&(active||dirty))draw()});interactionTimer=setTimeout(()=>{active=false;renderer.setAnimationLoop(null);draw()},ms);}
  function resize(){if(disposed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);draw();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){resize();wake(100)}else renderer.setAnimationLoop(null)},{threshold:.05});observer.observe(host);
  function visibility(){if(document.hidden)renderer.setAnimationLoop(null);else if(visible)wake(100)}document.addEventListener('visibilitychange',visibility);
  // Interactive models are shortcuts; the same actions always have HTML controls.
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let hovered=null,down=null;
  function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);for(const hit of raycaster.intersectObjects(world.children,true)){let obj=hit.object;while(obj&&obj!==world){if(obj.userData.route)return obj;obj=obj.parent;}}return null;}
  function move(event){if(reduced)return;const r=canvas.getBoundingClientRect();const fine=matchMedia('(pointer:fine)').matches;if(fine){track(gsap.to(world.rotation,{y:((event.clientX-r.left)/r.width-.5)*.14,x:((event.clientY-r.top)/r.height-.5)*.035,duration:.65,overwrite:'auto',ease:'power2.out'}));wake();}
    const found=pick(event);if(found!==hovered){if(hovered){track(gsap.to(hovered.position,{y:hovered.userData.restY,duration:.25,overwrite:'auto'}));}hovered=found;canvas.style.cursor=found?'pointer':'default';host.dataset.hover=found?.userData.route||'';if(found){found.userData.restY??=found.position.y;track(gsap.to(found.position,{y:found.userData.restY+.12,duration:.3,overwrite:'auto'}));wake();}}}
  function leave(){if(reduced)return;if(hovered){track(gsap.to(hovered.position,{y:hovered.userData.restY,duration:.25,overwrite:'auto'}));hovered=null;}host.dataset.hover='';track(gsap.to(world.rotation,{x:0,y:0,duration:.6,overwrite:'auto'}));wake();}
  function pointerDown(e){down={x:e.clientX,y:e.clientY};}
  function click(e){if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>8)return;const selected=pick(e);down=null;if(selected)onNavigate?.(selected.userData.route);}
  canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointerup',click);
  function contextLost(e){e.preventDefault();host.dataset.scene='fallback';renderer.setAnimationLoop(null);canvas.hidden=true;}
  canvas.addEventListener('webglcontextlost',contextLost);
  host.dataset.scene='ready';resize();
  if(!reduced){const tl=gsap.timeline({defaults:{duration:.85,ease:'power3.out'}});props.forEach((p,i)=>tl.from(p.position,{y:p.position.y+1.1+i*.12},i*.065));tl.from(hinge.rotation,{x:-1.1,duration:1},0);tl.from(cover.rotation,{x:0,duration:.85},.15);track(tl);wake(1500);}else draw();
  host._desk={open(){if(reduced)return;track(gsap.to(cover.rotation,{x:-1.1,duration:.45,ease:'power2.out'}));track(gsap.to(camera.position,{x:8.1,z:10.5,duration:.5,onUpdate:()=>camera.lookAt(0,.2,0)}));wake(700)}};
  return ()=>{disposed=true;clearTimeout(interactionTimer);observer.disconnect();resizeObserver.disconnect();document.removeEventListener('visibilitychange',visibility);tweens.forEach(t=>t.kill());renderer.setAnimationLoop(null);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointerup',click);canvas.removeEventListener('webglcontextlost',contextLost);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.forceContextLoss();canvas.remove();delete host._desk;};
}
