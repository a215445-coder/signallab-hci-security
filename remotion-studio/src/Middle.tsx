import React from 'react';
import {AbsoluteFill, Easing, Freeze, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Video} from '@remotion/media';

const ink = '#102b25';
const green = '#39724c';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Prompt: React.FC<{
  title: string;
  question: string;
  left: number;
  top: number;
  width: number;
  seconds: number;
}> = ({title, question, left, top, width, seconds}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 7, seconds * 24 - 7, seconds * 24], [0, 1, 1, 0], clamp);
  return <div style={{
    position: 'absolute', left, top, width, opacity, padding: '26px 30px',
    boxSizing: 'border-box', background: '#f8faf1', color: ink, borderRadius: 18,
    boxShadow: '0 8px 26px #102b2529', border: '1px solid #aec7a9',
  }}>
    <div style={{fontSize: 18, fontWeight: 700, letterSpacing: 3, color: green}}>{title}</div>
    <div style={{fontSize: 31, fontWeight: 700, lineHeight: 1.25, marginTop: 12}}>{question}</div>
    <div style={{height: 4, background: '#dce9d7', marginTop: 20}}>
      <div style={{height: '100%', width: `${100 * (1 - Math.min(1, frame / (seconds * 24)))}%`, background: '#699a60'}}/>
    </div>
  </div>;
};

export const ThresholdPrediction = () => <Prompt
  title="YOUR PREDICTION"
  question="Threshold 4 → 2. What happens to misses and false alarms?"
  left={875} top={280} width={890} seconds={2.75}
/>;

export const FreshCasePrompt = () => <Prompt
  title="YOUR TURN"
  question="What would you do, and which clue supports it?"
  left={1380} top={365} width={480} seconds={2.5}
/>;

const MatchedEmail: React.FC<{take: string}> = ({take}) => (
  <AbsoluteFill style={{overflow: 'hidden', background: '#f2f3eb'}}>
    {/* All three recordings share the same message position. Only the outer navigation is cropped. */}
    <Video muted src={staticFile(`middle/${take}.mp4`)}
      style={{position: 'absolute', left: -374, top: 0, width: 2294, height: 1082}}/>
  </AbsoluteFill>
);

const Shot: React.FC<{take: string; holdFrame: number; length: number; lead?: number}> = ({take, holdFrame, length, lead = 0}) => {
  const frame = useCurrentFrame();
  if (frame < lead) return <Freeze frame={0}><MatchedEmail take={take}/></Freeze>;
  if (frame >= lead + holdFrame) return <Freeze frame={holdFrame}><MatchedEmail take={take}/></Freeze>;
  return <Sequence from={lead} durationInFrames={length - lead}><MatchedEmail take={take}/></Sequence>;
};

const EvidenceOutline: React.FC<{label: string; y: number; height: number}> = ({label, y, height}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 24], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{pointerEvents: 'none'}}>
    <svg width="1920" height="1080" aria-hidden="true">
      <rect x="666" y={y} width="1161" height={height} rx="13" fill="none"
        stroke="#3c8256" strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress}/>
    </svg>
    <div style={{position: 'absolute', left: 684, top: y - 32, color: ink,
      background: '#edf5e7', borderRadius: 6, padding: '4px 12px', fontSize: 19, fontWeight: 700, opacity: progress}}>
      {label}
    </div>
  </AbsoluteFill>;
};

const DomainCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 34, top: 320, width: 595, opacity, color: ink,
    boxSizing: 'border-box', background: '#f8faf1', border: '1px solid #b4cbb0',
    borderRadius: 18, padding: 27, boxShadow: '0 6px 24px #102b2520'}}>
    <div style={{fontSize: 19, fontWeight: 700, color: green, letterSpacing: 2}}>COMPARE THE DOMAINS</div>
    <div style={{fontSize: 19, marginTop: 22}}>Known campus service</div>
    <div style={{fontSize: 29, fontFamily: 'monospace', fontWeight: 700}}>campus.example</div>
    <div style={{fontSize: 19, marginTop: 20}}>Destination revealed in the recording</div>
    <div style={{fontSize: 29, fontFamily: 'monospace', fontWeight: 700}}>
      campus<span style={{background: '#f8dfab', color: '#684819', borderRadius: 4}}>-help</span>.example
    </div>
    <div style={{fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginTop: 24,
      opacity: interpolate(frame, [83, 99], [0, 1], clamp)}}>
      Use a known campus channel to verify or report the message.
    </div>
  </div>;
};

// Source changes match the original narration beats at 1:32 and 1:44.
export const WarningComparison: React.FC = () => <>
  <Sequence name="Minimal notice · same message" durationInFrames={196}>
    <Freeze frame={18}><MatchedEmail take="13-minimal-detail"/></Freeze>
    <Sequence from={24} durationInFrames={100}>
      <Prompt title="SAME EMAIL · MINIMAL NOTICE" question="What would you check before clicking?"
        left={35} top={325} width={585} seconds={4.16}/>
    </Sequence>
    <Sequence from={117} durationInFrames={79}>
      <EvidenceOutline label="A generic warning" y={785} height={99}/>
    </Sequence>
  </Sequence>
  <Sequence name="Switch to actionable guidance" from={196} durationInFrames={296}>
    <Shot take="14-actionable" holdFrame={16} length={296} lead={12}/>
    <Sequence from={40} durationInFrames={256}>
      <EvidenceOutline label="Specific evidence and a next step" y={790} height={224}/>
    </Sequence>
  </Sequence>
  <Sequence name="Inspect destination in the same email" from={492} durationInFrames={326}>
    <Shot take="15-destination" holdFrame={16} length={326} lead={22}/>
    <Sequence from={47} durationInFrames={279}>
      <EvidenceOutline label="Actual link destination" y={727} height={158}/>
      <DomainCompare/>
    </Sequence>
  </Sequence>
</>;

export const FreshCaseAnswer: React.FC = () => {
  const frame = useCurrentFrame();
  const reason = interpolate(frame, [24, 37], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 1390, top: 455, width: 475, color: ink,
    padding: '24px 26px', boxSizing: 'border-box', background: '#f8faf1',
    border: '1px solid #b4cbb0', borderRadius: 16,
    opacity: interpolate(frame, [0, 9, 64, 76], [0, 1, 1, 0], clamp)}}>
    <div style={{fontSize: 18, letterSpacing: 2, color: green, fontWeight: 700}}>01 · ACTION</div>
    <div style={{fontSize: 27, fontWeight: 700, marginTop: 8}}>Report the message</div>
    <div style={{opacity: reason, marginTop: 19, paddingTop: 16, borderTop: '1px solid #d5e1d2'}}>
      <div style={{fontSize: 18, letterSpacing: 2, color: green, fontWeight: 700}}>02 · REASON</div>
      <div style={{fontSize: 23, lineHeight: 1.35, marginTop: 8}}>
        An unexpected password request points to a different service.
      </div>
    </div>
  </div>;
};
