import React from 'react';
import {AbsoluteFill,CanvasImage,Sequence,useCurrentFrame,useVideoConfig,interpolate,spring,staticFile} from 'remotion';
import {Video,Audio} from '@remotion/media';
import captions from './captions.json';
import {Focus,Sweep,TradeOff} from './Motion';
const ink='#102b25',mint='#b9e88a',paper='#f2f3eb';
const enter=(f:number,d=0)=>spring({frame:f-d,fps:24,config:{damping:200}});
const Intro:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:ink,color:paper,padding:100,opacity:interpolate(f,[205,224],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><div style={{fontSize:24,letterSpacing:5,color:mint}}>SIGNALLAB / TK2233 CYBERSECURITY × HCI</div><div style={{fontSize:104,fontWeight:700,lineHeight:1.06,marginTop:110,translate:`0px ${40*(1-enter(f))}px`}}>One warning.<br/><span style={{color:mint}}>Two consequences.</span></div><div style={{fontSize:30,marginTop:50,color:'#b6c8bc'}}>Explore how interface design shapes a safer decision.</div><svg style={{position:'absolute',right:110,top:280}} width="620" height="450" viewBox="0 0 620 450"><path d="M50 225H230C330 225 300 80 400 80H570M230 225C330 225 300 370 400 370H570" stroke="#486753" strokeWidth="3" fill="none"/><rect x="10" y="175" width="130" height="100" rx="18" fill={mint}/><path d="M30 198l45 38 45-38" stroke={ink} strokeWidth="5" fill="none"/><circle cx={50+520*((f%80)/80)} cy={225} r="8" fill={paper} opacity=".5"/><text x="385" y="65" fill={mint} fontSize="27">Catch an attack</text><text x="350" y="412" fill="#f3bd89" fontSize="27">Interrupt a real task</text><circle cx="570" cy="80" r={18*enter(f,18)} fill={mint}/><circle cx="570" cy="370" r={18*enter(f,35)} fill="#f3bd89"/></svg></AbsoluteFill>};
const Outro:React.FC=()=>{
 const f=useCurrentFrame();
 const sy=interpolate(f,[324,346],[1,.003],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const sx=interpolate(f,[346,360],[1,.003],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const opacity=interpolate(f,[360,372],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:f>=324?'#000':'transparent'}}><AbsoluteFill style={{background:paper,color:ink,padding:'72px 95px',scale:`${sx} ${sy}`,transformOrigin:'center',opacity:Math.min(1,f/12)*opacity,filter:f>=324?'brightness(1.12)':'none',boxShadow:f>=324?'0 0 35px #d9ffe0':'none'}}>
 <div style={{fontSize:23,letterSpacing:4}}>SIGNALLAB / TK2233 CYBERSECURITY × HCI</div>
 <div style={{fontSize:76,fontWeight:700,marginTop:45,lineHeight:1.08}}>A safer click starts with<br/><span style={{color:'#51813d'}}>a clearer interface.</span></div>
 <div style={{display:'flex',gap:24,marginTop:48,width:1200}}>{[
 ['01 / EXPLORE','Make evidence visible','Inspect the sender, destination and task context.'],
 ['02 / EXPLAIN','Change the warning rule','Trace the trade-off between missed threats and false alarms.'],
 ['03 / APPLY','Give an action + a reason','Try fresh cases, then retrieve the idea without hints.']
 ].map(([n,title,detail],i)=><div key={n} style={{width:384,borderTop:'3px solid #98b97f',paddingTop:22,opacity:enter(f,16+i*17),translate:`0px ${24*(1-enter(f,16+i*17))}px`}}><div style={{fontSize:18,letterSpacing:2,color:'#527346'}}>{n}</div><div style={{fontSize:27,fontWeight:700,marginTop:17}}>{title}</div><div style={{fontSize:22,lineHeight:1.45,marginTop:16,color:'#5c6b61'}}>{detail}</div></div>)}</div>
 <div style={{position:'absolute',right:96,top:324,width:335,textAlign:'center',opacity:enter(f,65)}}><CanvasImage src={staticFile('simulator-qr.png')} style={{width:280,height:280}}/><div style={{fontSize:23,fontWeight:700,marginTop:15}}>Scan to try SignalLab</div><div style={{fontSize:20,color:'#5c6b61',marginTop:10}}>Explore the source on GitHub</div></div>
 <div style={{marginTop:60,fontSize:25,fontWeight:600}}>Pause. Inspect. Decide.</div>
 <div style={{fontSize:24,marginTop:18}}>a215445-coder.github.io/signallab-hci-security</div>
 <div style={{position:'absolute',left:95,bottom:135,fontSize:20,color:'#65766b'}}>Peer trials and course review pending · Learning gains not yet measured</div>
 </AbsoluteFill>{f>=324&&f<372?<div style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width:1920*sx,height:Math.max(2,1080*sy),background:'#effff5',opacity:Math.min(.8,(f-324)/20)*opacity,boxShadow:'0 0 25px 7px #b0ffd0'}}/>:null}</AbsoluteFill>
};
const Captions:React.FC=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const c=captions.find(c=>c.startMs<=f/fps*1000&&c.endMs>f/fps*1000);return c?<div style={{position:'absolute',bottom:32,left:'50%',translate:'-50% 0',width:680,maxHeight:90,fontSize:34,lineHeight:1.3,textAlign:'center',color:'white',padding:'0 22px',fontWeight:500,textShadow:'0 2px 5px #000, 0 0 3px #000',WebkitTextStroke:'0.6px #20312a',paintOrder:'stroke fill'}}>{c.text}</div>:null};
export const Film:React.FC=()=> <AbsoluteFill style={{background:ink,fontFamily:'Arial,sans-serif'}}><div style={{position:'absolute',left:0,top:0,width:1920,height:906,overflow:'hidden',scale:'1 '+1080/906,transformOrigin:'center top'}}><Video muted src={staticFile('walkthrough.mp4')} style={{width:1920,height:1080}}/></div><Audio src={staticFile('narration.m4a')}/><Sequence name="Opening animation" from={0} durationInFrames={224}><Intro/></Sequence><Sequence name="Threshold spotlight" from={936} durationInFrames={71}><Focus box={[350,400,425,205]} label="Change one input"/></Sequence>
<Sequence name="Trade-off connection" from={1188} durationInFrames={71}><TradeOff/></Sequence>
<Sequence name="Visible calculation" from={1728} durationInFrames={71}><Focus box={[300,620,1350,200]} label="Cue score → rule → warning"/></Sequence>
<Sequence name="Design chapter transition" from={1938} durationInFrames={20}><Sweep/></Sequence>
<Sequence name="Actionable guidance focus" from={2328} durationInFrames={71}><Focus box={[35,550,1840,390]} label="Evidence + a safe next step"/></Sequence>
<Sequence name="Transfer chapter transition" from={2822} durationInFrames={20}><Sweep/></Sequence>
<Sequence name="Reasoning focus" from={2976} durationInFrames={71}><Focus box={[110,400,1460,555]} label="Action + reason"/></Sequence>
<Sequence name="Evidence chapter transition" from={3441} durationInFrames={20}><Sweep/></Sequence>
<Sequence name="Closing animation" from={3790} durationInFrames={396}><Outro/></Sequence><Captions/></AbsoluteFill>;
