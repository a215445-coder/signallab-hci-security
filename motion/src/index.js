import { gsap } from 'gsap';
import { createObservatory as createDesk, exhibitFallback } from './observatory.js';
import { caseVisual } from './case-fallbacks.js';

const preferenceKey='signallab.motion';
let preference=true;try{preference=localStorage.getItem(preferenceKey)!=='off'}catch{}
const media=matchMedia('(prefers-reduced-motion: reduce)');
let context=null,disposeDesk=null,revision=0,pending=null,lastView=null,listeners=null;
const transient=new Set();
const reduced=()=>media.matches||!preference;
const find=s=>document.querySelector(s);
const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2 6 6 3-6 2-2 7-2-7-6-2 6-3Z"/></svg>';
function tween(target,vars){if(!target||reduced()||((Array.isArray(target)||target instanceof NodeList)&&!target.length))return;return gsap.to(target,{duration:.28,ease:'power2.out',overwrite:'auto',...vars});}
function enter(target,vars={}){if(!target||reduced())return;return gsap.fromTo(target,{y:12,opacity:.72,...vars},{y:0,x:0,opacity:1,rotationX:0,rotationY:0,scale:1,duration:.35,ease:'power3.out',clearProps:'transform,opacity'});}
function clean(){listeners?.abort();listeners=null;revision++;disposeDesk?.();disposeDesk=null;context?.revert();context=null;}
function refreshControl(){const b=find('#motionToggle');if(!b)return;b.setAttribute('aria-pressed',String(!reduced()));b.disabled=media.matches;b.setAttribute('aria-label',media.matches?'Animation reduced by system settings':reduced()?'Turn on animation':'Pause animation');b.innerHTML=icon+`<span>Motion ${reduced()?'off':'on'}</span>`;b.title=media.matches?'Your system preference reduces animation':'Toggle decorative animation';}
function setupControl(){if(find('#motionToggle'))return;const b=document.createElement('button');b.id='motionToggle';b.className='motion-toggle';b.type='button';document.querySelector('.header-guide')?.before(b);b.addEventListener('click',()=>{preference=media.matches?false:!preference;try{localStorage.setItem(preferenceKey,preference?'on':'off')}catch{}mount({view:lastView,force:true})});refreshControl();}
function flyClue(action){const target=find(`[data-clue="${action.clue}"]`);if(!target)return;enter(target,{y:10,opacity:.65});const source=find(`[data-evidence-source="${action.clue}"]`);if(!source)return;const from=source.getBoundingClientRect(),to=target.getBoundingClientRect();if(to.top>innerHeight||to.bottom<0)return;
 const chip=document.createElement('span');chip.className='clue-flight';chip.textContent=action.clue==='sender'?'01':'02';chip.setAttribute('aria-hidden','true');chip.style.left=`${Math.min(innerWidth-40,from.right-20)}px`;chip.style.top=`${Math.max(10,Math.min(innerHeight-40,from.top))}px`;document.body.append(chip);transient.add(chip);gsap.to(chip,{x:to.left+15-parseFloat(chip.style.left),y:to.top+14-parseFloat(chip.style.top),scale:.75,rotation:8,opacity:0,duration:.48,ease:'power2.inOut',onComplete:()=>{chip.remove();transient.delete(chip)}});
 tween(source,{boxShadow:'0 0 0 3px #43b7bd',duration:.12,onComplete:()=>gsap.to(source,{boxShadow:'0 0 0 0px transparent',duration:.35,clearProps:'boxShadow'})});
}
function carryDesk(){const host=find('#deskScene');if(!host||!disposeDesk)return;const rect=host.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const dispose=disposeDesk;disposeDesk=null;host._desk?.open();Object.assign(host.style,{position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',margin:0,zIndex:18,pointerEvents:'none'});host.inert=true;host.setAttribute('aria-hidden','true');host.removeAttribute('id');document.body.append(host);transient.add(host);host._dispose=dispose;gsap.to(host,{opacity:0,scale:1.03,duration:.5,ease:'power2.inOut',onComplete:()=>{dispose();host.remove();transient.delete(host)}});}
function ghostFile(button){const source=button.closest('.case-file')?.querySelector('.case-generated');if(!source)return;const rect=source.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const clone=source.cloneNode();clone.setAttribute('aria-hidden','true');clone.alt='';clone.className='case-image-flight';Object.assign(clone.style,{position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',margin:0,zIndex:20,pointerEvents:'none',borderRadius:'8px',objectFit:'cover',transformOrigin:'top left'});document.body.append(clone);transient.add(clone);queueMicrotask(()=>{const target=find('.case-mail .case-visual'),to=target?.getBoundingClientRect();gsap.to(clone,{x:to?to.left-rect.left:0,y:to?to.top-rect.top:-20,scaleX:to?to.width/rect.width:1,scaleY:to?to.height/rect.height:1,opacity:0,duration:.42,ease:'power3.inOut',onComplete:()=>{clone.remove();transient.delete(clone)}});});}
function bindDetails(root){root.querySelectorAll('details').forEach(d=>{const summary=d.querySelector(':scope > summary');summary?.addEventListener('click',()=>{if(reduced())return;const opening=!d.open;if(opening)queueMicrotask(()=>{const children=[...d.children].filter(e=>e!==summary);if(children.length)enter(children,{y:-5,opacity:.65});if(d.id==='miraOptions'){const avatar=d.querySelector('.mira-guide > svg');if(avatar)gsap.fromTo(avatar,{rotation:-4},{rotation:0,duration:.4,transformOrigin:'bottom center',ease:'power2.out',clearProps:'transform'})}});else{tween(summary,{x:2,duration:.1,onComplete:()=>tween(summary,{x:0,clearProps:'transform'})})}},{signal:listeners.signal})});}
function bindCards(root){if(reduced()||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;root.querySelectorAll('.case-file').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();tween(card,{rotationX:-(e.clientY-r.top-r.height/2)/r.height*5,rotationY:(e.clientX-r.left-r.width/2)/r.width*6,y:-5,transformPerspective:900,duration:.3});tween(card.querySelector('.file-art'),{y:-5,z:14,duration:.3});tween(card.querySelector('.case-generated'),{scale:1.035,duration:.4})},{signal:listeners.signal});card.addEventListener('pointerleave',()=>{tween(card,{rotationX:0,rotationY:0,y:0,clearProps:'transform'});tween(card.querySelector('.file-art'),{y:0,z:0,clearProps:'transform'});tween(card.querySelector('.case-generated'),{scale:1,clearProps:'transform'})},{signal:listeners.signal})});}
function mount({view='home'}={}){
 clean();lastView=view;const ticket=revision,action=pending;
 queueMicrotask(()=>{if(ticket!==revision)return;setupControl();refreshControl();const root=find('#main');if(!root)return;
  root.dataset.view=view;
  listeners=new AbortController();
  context=gsap.context(()=>{
   bindDetails(root);bindCards(root);
   if(!reduced()){
    if(view==='home'){const tl=gsap.timeline({defaults:{ease:'power3.out'}});tl.fromTo('.hero-copy > *',{y:20,opacity:.4},{y:0,opacity:1,duration:.65,stagger:.055,clearProps:'transform,opacity'},0);tl.fromTo('.scene-caption',{opacity:0},{opacity:1,duration:.4,clearProps:'opacity'},.6);}
    else if(action?.kind==='inspect'&&!action.closing)flyClue(action);
    else if(action?.kind==='inspect')enter(find('#evidenceEntries'),{y:-4,opacity:.85});
    else if(action?.kind==='decide')enter(find('.decision'),{y:18,opacity:.7});
    else if(action?.kind==='answer'){const result=find('.result-card');enter(result,{rotationY:-5,y:15,opacity:.7});enter(result?.querySelector('.result-symbol'),{y:-4,scale:.75});}
    else if(action?.kind==='retry'||action?.kind==='case')enter(find('.case-mail'),{x:18,y:0,rotationY:-3,opacity:.75});
    else if(action?.kind==='recall')enter(find('.recall-feedback, .recall-question'));
    else if(action?.kind==='route'||action?.kind==='next')enter(root.querySelector(view==='transfer'?'.transfer-layout, .metrics':view==='report'?'.notebook-summary':'.intro, .case-mail, .card'));
   }
  },root);
  const host=find('#deskScene');if(host){try{disposeDesk=createDesk(host,{reduced:reduced(),onNavigate:route=>{if(route==='practice')find('.hero-start')?.click();else document.querySelector(`[data-view="${route==='report'?'report':'experiments'}"]`)?.click()}})}catch(e){host.dataset.scene='fallback';host.querySelector('canvas')?.remove();console.warn('SignalLab: static illustration retained.',e.message)}}
 });
}
function capture(event){const button=event.target.closest('button');if(!button||button.disabled||button.id==='motionToggle')return;
 const rect=button.getBoundingClientRect();let kind='button',clue=null,closing=false;const id=button.id;
 if(button.dataset.inspect){kind='inspect';clue=button.dataset.inspect;closing=button.getAttribute('aria-expanded')==='true';}
 else if(button.dataset.answer)kind='answer';else if(button.dataset.openCase!==undefined||button.dataset.jump!==undefined||button.dataset.reviewOne!==undefined)kind='case';else if(id==='readyDecision'||id==='backInspect')kind='decide';else if(id==='retryScenario')kind='retry';else if(id==='next'||id==='previous'||id==='openTransfer'||id==='confirmReset'||button.closest('#transferForm'))kind='next';else if(button.dataset.recall!==undefined||id==='resetRecall')kind='recall';else if(button.dataset.openview||button.dataset.view)kind='route';
 pending={kind,clue,closing};
 if(!reduced()){
  if(kind==='case'){if(button.classList.contains('hero-start'))carryDesk();else ghostFile(button);}
  tween(button,{scale:.965,duration:.08,onComplete:()=>tween(button,{scale:1,duration:.17,clearProps:'transform'})});
 }
 queueMicrotask(()=>{
  // These actions update a local part of the DOM without a full app render.
  if(reduced()){pending=null;return;}
  if(button.dataset.profile||id==='compareWarnings')enter(find('#designWarning'),{y:5,opacity:.7});
  if(id==='policyRun'){enter(find('.policy-trace'),{y:14,opacity:.7});const cards=document.querySelectorAll('[data-policy-message]');if(cards.length)gsap.fromTo(cards,{y:15,opacity:.65},{y:0,opacity:1,duration:.42,stagger:.035,clearProps:'transform,opacity'});}
  if(id==='policyPin'||id==='policyCompareExample')enter(find('.policy-comparison'),{y:-8,opacity:.65});
  if(button.dataset.policyMessage)enter(find('#policyTraceDetail'),{x:8,y:0,opacity:.7});
  if(button.dataset.locateClue){const source=find(`[data-evidence-source="${button.dataset.locateClue}"]`);tween(source,{boxShadow:'0 0 0 3px #9bbd77',onComplete:()=>tween(source,{boxShadow:'0 0 0 0px transparent',clearProps:'boxShadow'})});}
  if(id==='openGuide'||id==='resetProgress')enter(find(id==='openGuide'?'#guide':'#resetDialog'),{y:12,scale:.97,opacity:.7});
  if(id==='exportReport'||id==='transferExport')enter(find('#toast'),{y:6,opacity:.65});
  pending=null;
 });
}
// Capture precedes app handlers; app state never waits for a tween to finish.
document.addEventListener('click',capture,true);
document.addEventListener('change',e=>{if(e.target.id==='compareWarnings')enter(find('#designWarning'),{y:7,opacity:.75})});
media.addEventListener('change',()=>{for(const el of transient){gsap.killTweensOf(el);el._dispose?.();el.remove();}transient.clear();mount({view:lastView})});
window.SignalMotion={mount,clean,reduced,gsap,exhibitFallback,caseArt:caseVisual,policyMove(button,dx,dy){if(!reduced())gsap.fromTo(button,{x:dx,y:dy},{x:0,y:0,duration:.38,ease:'power2.out',clearProps:'transform',overwrite:true})}};
