import React from 'react';
import {Sequence,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
export const SoundDesign:React.FC=()=> <>
<Sequence name="note accent 1" from={18} durationInFrames={12}><Audio src={staticFile("sfx/note.wav")}/></Sequence>
<Sequence name="click accent 2" from={278} durationInFrames={3}><Audio src={staticFile("sfx/click.wav")}/></Sequence>
<Sequence name="click accent 3" from={535} durationInFrames={3}><Audio src={staticFile("sfx/click.wav")}/></Sequence>
<Sequence name="click accent 4" from={900} durationInFrames={3}><Audio src={staticFile("sfx/click.wav")}/></Sequence>
<Sequence name="note accent 5" from={1196} durationInFrames={12}><Audio src={staticFile("sfx/note.wav")}/></Sequence>
<Sequence name="note accent 6" from={1738} durationInFrames={12}><Audio src={staticFile("sfx/note.wav")}/></Sequence>
<Sequence name="sweep accent 7" from={1938} durationInFrames={14}><Audio src={staticFile("sfx/sweep.wav")}/></Sequence>
<Sequence name="note accent 8" from={2336} durationInFrames={12}><Audio src={staticFile("sfx/note.wav")}/></Sequence>
<Sequence name="click accent 9" from={2555} durationInFrames={3}><Audio src={staticFile("sfx/click.wav")}/></Sequence>
<Sequence name="sweep accent 10" from={2822} durationInFrames={14}><Audio src={staticFile("sfx/sweep.wav")}/></Sequence>
<Sequence name="click accent 11" from={2983} durationInFrames={3}><Audio src={staticFile("sfx/click.wav")}/></Sequence>
<Sequence name="sweep accent 12" from={3441} durationInFrames={14}><Audio src={staticFile("sfx/sweep.wav")}/></Sequence>
<Sequence name="sweep accent 13" from={3790} durationInFrames={14}><Audio src={staticFile("sfx/sweep.wav")}/></Sequence>
<Sequence name="power-off accent 14" from={4114} durationInFrames={30}><Audio src={staticFile("sfx/power-off.wav")}/></Sequence>
<Sequence name="click accent 15" from={4150} durationInFrames={3}><Audio src={staticFile("sfx/click.wav")}/></Sequence>
</>;
