"""Synthesize original quiet sound accents, then mix without re-encoding video."""
from pathlib import Path
import numpy as np,wave,subprocess,json
B=Path(__file__).resolve().parents[1];A=B/'remotion-studio/public/sfx';A.mkdir(parents=True,exist_ok=True);sr=48000
rng=np.random.default_rng(2233)
def save(name,sound):
 sound=np.clip(sound,-.95,.95);pcm=(sound*32767).astype('<i2')
 with wave.open(str(A/(name+'.wav')),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(pcm.tobytes())
t=np.arange(int(.11*sr))/sr;save('click',.030*(np.sin(2*np.pi*1150*t)*np.exp(-t*65)+rng.normal(0,.16,len(t))*np.exp(-t*95))*np.minimum(t/.002,1))
t=np.arange(int(.58*sr))/sr;noise=rng.normal(0,1,len(t));noise=np.convolve(noise,np.ones(12)/12,mode='same');env=np.sin(np.pi*t/.58)**2;save('sweep',noise*env*.065)
t=np.arange(int(.48*sr))/sr;save('note',.019*(np.sin(2*np.pi*880*t)+.35*np.sin(2*np.pi*1320*t))*np.exp(-t*10)*np.minimum(t/.008,1))
t=np.arange(int(1.25*sr))/sr;phase=2*np.pi*(1450*t-490*t*t);save('power-off',.030*np.sin(phase)*np.sin(np.pi*t/1.25)**2*np.exp(-t*1.5))
# Frame-synchronized editorial sound design, not added app notifications.
events=[('note',18),('click',278),('click',535),('click',900),('note',1196),('note',1738),('sweep',1938),('note',2336),('click',2555),('sweep',2822),('click',2983),('sweep',3441),('sweep',3790),('power-off',4114),('click',4150)]
(A/'events.json').write_text(json.dumps([{'sound':n,'frame':f} for n,f in events],indent=2))
cmd=['ffmpeg','-v','error','-y','-i',str(B/'dist/media/signallab-demo-v12.mp4')]
for n,f in events:cmd+=['-i',str(A/(n+'.wav'))]
filters=[]
for i,(n,f) in enumerate(events,1):filters.append(f'[{i}:a]adelay={round(f/24*1000)}:all=1[s{i}]')
filters.append('[0:a]'+''.join(f'[s{i}]' for i in range(1,len(events)+1))+f'amix=inputs={len(events)+1}:duration=first:normalize=0,alimiter=limit=0.89:level=false[mix]')
cmd+=['-filter_complex',';'.join(filters),'-map','0:v:0','-map','[mix]','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',str(B/'dist/media/signallab-demo-v13.mp4')]
subprocess.run(cmd,check=True);print('Mixed',len(events),'quiet accents; video stream copied unchanged')
