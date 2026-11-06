import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const mint = '#c0ed91';
const amber = '#ffc58b';

const Outcome: React.FC<{y: number; color: string; index: string; title: string; detail: string; progress: number}> = ({y, color, index, title, detail, progress}) => (
  <g opacity={progress} transform={`translate(${(1 - progress) * 22} ${y})`}>
    <rect x="400" width="366" height="126" rx="24" fill="#1a3930" stroke="#466659"/>
    <circle cx="432" cy="39" r="6" fill={color}/>
    <text x="454" y="45" fontSize="17" letterSpacing="2.3" fill={color}>{index}</text>
    <text x="426" y="82" fontSize="29" fontWeight="700" fill="#f4f7ee">{title}</text>
    <text x="426" y="107" fontSize="18" fill="#c2d2c7">{detail}</text>
  </g>
);

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  const reveal = (start: number, end: number) => interpolate(time, [start, end], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const title = reveal(0, .65);
  const incoming = reveal(.3, 1.05);
  const caught = reveal(1.05, 1.85);
  const interrupted = reveal(2.25, 3.05);
  const fade = 1 - reveal(8.5, 9.3);

  return (
    <AbsoluteFill style={{opacity: fade, color: '#f3f6ee', overflow: 'hidden', background: 'radial-gradient(ellipse at 76% 52%, #214638, #102b25 62%, #0b221e)'}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(#c0ed91 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: .08}}/>
      <div style={{position: 'absolute', left: 96, top: 82, display: 'flex', alignItems: 'center', gap: 18}}>
        <svg width="45" height="45" viewBox="0 0 45 45" aria-hidden="true"><rect width="45" height="45" rx="13" fill={mint}/><path d="M11 23h7l4-9 5 17 4-8h4" stroke="#102b25" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{fontSize: 29, fontWeight: 700}}>SignalLab</span>
      </div>
      <div style={{position: 'absolute', right: 96, top: 98, color: '#bad0bf', fontSize: 20, letterSpacing: 2.5}}>TK2233 · CYBERSECURITY × HCI</div>
      <div style={{position: 'absolute', top: 292, left: 96, width: 900, opacity: title, translate: `0 ${28 * (1 - title)}px`}}>
        <div style={{fontSize: 20, letterSpacing: 4, fontWeight: 700, color: mint, marginBottom: 24}}>THE WARNING DESIGNER’S DILEMMA</div>
        <div style={{fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3}}>One warning.<br/><span style={{color: mint}}>Two consequences.</span></div>
        <div style={{fontSize: 29, lineHeight: 1.4, color: '#c4d4ca', width: 695, marginTop: 37}}>A warning can protect someone from an attack or interrupt a task they need to finish.</div>
      </div>
      <svg style={{position: 'absolute', right: 88, top: 234}} width="790" height="530" viewBox="0 0 790 530" aria-hidden="true">
        <path d="M135 263H257M257 263C330 263 309 131 400 131M257 263C330 263 309 389 400 389" stroke="#466659" strokeWidth="3" fill="none"/>
        <path d="M135 263H257" pathLength="1" stroke={mint} strokeWidth="3" strokeDasharray="1" strokeDashoffset={1 - incoming} fill="none"/>
        <path d="M257 263C330 263 309 131 400 131" pathLength="1" stroke={mint} strokeWidth="3" strokeDasharray="1" strokeDashoffset={1 - caught} fill="none"/>
        <path d="M257 263C330 263 309 389 400 389" pathLength="1" stroke={amber} strokeWidth="3" strokeDasharray="1" strokeDashoffset={1 - interrupted} fill="none"/>
        <g opacity={reveal(.1, .6)}><rect x="15" y="212" width="120" height="102" rx="25" fill="#294c3f" stroke="#6b957b"/><rect x="42" y="243" width="66" height="40" rx="7" stroke={mint} strokeWidth="3" fill="none"/><path d="M43 246l32 22 32-22" stroke={mint} strokeWidth="3" fill="none" strokeLinejoin="round"/><text x="75" y="350" fill="#bbd0c1" fontSize="17" textAnchor="middle">INCOMING MAIL</text></g>
        <circle cx="257" cy="263" r="25" fill="#193a2f" stroke={mint} strokeWidth="2"/>
        <circle cx="257" cy="263" r={5 + 4 * incoming} fill={mint}/>
        <Outcome y={68} color={mint} index="PROTECTION" title="Catch an attack" detail="Flag a phishing message" progress={caught}/>
        <Outcome y={326} color={amber} index="INTERRUPTION" title="Interrupt a real task" detail="Flag a legitimate message" progress={interrupted}/>
      </svg>
      <div style={{position: 'absolute', left: 96, top: 813, color: '#c3d5c7', fontSize: 21, letterSpacing: 2, opacity: reveal(3.3, 4)}}>PREDICT <span style={{color: mint}}>→</span> TEST <span style={{color: mint}}>→</span> EXPLAIN</div>
    </AbsoluteFill>
  );
};
