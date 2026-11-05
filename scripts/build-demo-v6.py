"""Real Chrome screen recordings with editorial zooms and unchanged v3 audio.
Source clips: assets/demo-v6/*.mp4 (real browser screencast frames/timing).
No synthetic app screens. Pauses are extended and navigation is edited.
"""
from pathlib import Path
import ast,json,subprocess,bisect,sys,math
from PIL import Image,ImageDraw,ImageFont
B=Path(__file__).resolve().parents[1];W=B/'.research-local/demo-v6';A=B/'assets/demo-v6';O=B/'dist/media';A.mkdir(parents=True,exist_ok=True)
D=[9.312,11.856,13.392,11.76,10.68,11.496,12.576,10.968,12.336,13.584,13.464,12.264,14.208,13.464]
m=ast.parse((B/'scripts/build-demo-v3.py').read_text());S=next(ast.literal_eval(n.value) for n in m.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='S' for t in n.targets))
# Source shot, point at which its action begins, zoom rectangle in 1147x541 coordinates.
SCENES=[
 [('25-overview',0,None)],
 [('02-select',2,(480,115,1125,485))],
 [('03-run',1,(480,200,1125,530))],
 [('06-slider-real',3,(215,150,1125,540))],
 [('07-comparison',1,(490,145,1120,310))],
 [('09-trace',1,(490,245,1120,540))],
 [('10-equation',1,(490,90,1120,450))],
 [('11-design',0,None),('12-minimal',2,None),('13-minimal-detail',1,(510,320,1110,470))],
 [('14-actionable',2,(510,390,1110,515))],
 [('15-destination',2,(530,310,1100,455)),('16-sender',1,(530,335,1100,535))],
 [('18-fresh-case',0,None),('19-reason',2,(210,260,760,535)),('20-save',.5,None)],
 [('21-report',0,None),('22-recall',2,(760,180,1125,490))],
 [('23-research',0,None),('24-research-detail',1,(760,70,1125,390))],
 [('27-outro',0,None)]]
# Take lengths in the narration scene. Each action remains at recorded speed.
PARTS=[[9.312],[11.856],[13.392],[11.76],[10.68],[11.496],[12.576],[2.8,3.2,4.968],[12.336],[7,6.584],[3,6.5,3.964],[4,8.264],[6,8.208],[13.464]]
used={v[0] for scene in SCENES for v in scene}
# Archive true source motion as silent clips. Build is reproducible from those clips alone.
if '--archive' in sys.argv:
 for name in sorted(used):
  f=json.loads((W/name/'frames.json').read_text());seq=[]
  for j,item in enumerate(f):
   duration=max(.016,(f[j+1]['time']-item['time']) if j+1<len(f) else 1.0)
   seq.extend([f"file '{W/name/(str(j)+'.jpg')}'",f'duration {duration}'])
  seq.append(f"file '{W/name/(str(len(f)-1)+'.jpg')}'")
  (W/name/'concat.txt').write_text('\n'.join(seq))
  subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',str(W/name/'concat.txt'),'-vf','fps=30','-c:v','libx264','-crf','16','-preset','fast','-pix_fmt','yuv420p',str(A/(name+'.mp4'))],check=True)
 print('Archived',len(used),'real screen recordings');sys.exit()
# Decode short action clips once. 2294x1082 source retains text detail for zooms.
cache={}
for name in sorted(used):
 dest=W/'decoded'/name;dest.mkdir(parents=True,exist_ok=True)
 if not (dest/'0001.jpg').exists():subprocess.run(['ffmpeg','-v','error','-y','-i',str(A/(name+'.mp4')),str(dest/'%04d.jpg')],check=True)
 cache[name]=sorted(dest.glob('*.jpg'))
F='/System/Library/Fonts/Supplemental/Arial.ttf';fonts={n:ImageFont.truetype(F,n) for n in [20,26,32,36]}
def smooth(x):x=max(0,min(1,x));return x*x*(3-2*x)
def crop_target(rect):
 x,y,xx,yy=rect;cw=max(xx-x,(yy-y)*1147/541);ch=cw*541/1147;cx=(x+xx)/2;cy=(y+yy)/2;x=max(0,min(1147-cw,cx-cw/2));y=max(0,min(541-ch,cy-ch/2));return [x,y,x+cw,y+ch]
lastfile=None;lastimg=None
def raw(name,t,lead):
 global lastfile,lastimg
 files=cache[name];# Recorded motion starts after a reading pause, then holds its true final frame.
 ix=min(len(files)-1,max(0,int((t-lead)*30)))
 if files[ix]!=lastfile:lastfile=files[ix];lastimg=Image.open(lastfile).convert('RGB')
 return lastimg
# Short caption chunks retained; voice bytes remain identical to v3.
import textwrap
CHUNKS=[]
for s in S:
 chunks=[];cur=[]
 for w in s[2].split():
  cur.append(w)
  if len(cur)>=10 and (w.endswith(('.',',',';')) or len(cur)>=15):chunks.append(' '.join(cur));cur=[]
 if cur:chunks.append(' '.join(cur))
 CHUNKS.append(chunks)
def render(i,t):
 lengths=PARTS[i];j=0;lt=t
 while j<len(lengths)-1 and lt>=lengths[j]:lt-=lengths[j];j+=1
 name,lead,rect=SCENES[i][j];length=lengths[j];src=raw(name,lt+2 if i==0 else lt,lead)
 # Full page establishes context; smooth focus; full page returns before the next section.
 z=smooth((lt-max(lead+1.2,2))/1.1)*(1-smooth((lt-(length-1.3))/1.1)) if rect else 0
 target=crop_target(rect) if rect else [0,0,1147,541];base=[0,0,1147,541]
 box=[(base[k]+(target[k]-base[k])*z)*2 for k in range(4)]
 shot=src.crop(tuple(box)).resize((1920,906),Image.Resampling.LANCZOS)
 im=Image.new('RGB',(1920,1080),'#101a17');im.paste(shot,(0,0));d=ImageDraw.Draw(im)
 # Editorial click emphasis marks recorded actions; it does not invent UI changes.
 hits={'06-slider-real':(279,270),'14-actionable':(300,76),'15-destination':(705,342),'16-sender':(590,342)}
 age=lt-lead
 if name in hits and 0.15<age<1.1:
  hx,hy=hits[name];px=(hx*2-box[0])*1920/(box[2]-box[0]);py=(hy*2-box[1])*906/(box[3]-box[1]);r=13+age*20
  d.ellipse((px-r,py-r,px+r,py+r),outline='#438566',width=3)

 # Small on-video chapter label, no presentation-card frames.
 title=['SignalLab · Live walkthrough','Predict before running','Threshold 4 · baseline','Adjust the threshold','Compare the two policies','Inspect a message','Read the calculation','Change the warning design','Evidence + a safe next step','Inspect the real address','Choose an action and a reason','Recall without the inbox','Research and validation','Explore SignalLab'][i]
 d.text((35,924),title,font=fonts[26],fill='#bfe3b3')
 chunks=CHUNKS[i];k=min(len(chunks)-1,int(t/max(.1,D[i]-.6)*len(chunks)))
 for n,line in enumerate(textwrap.wrap(chunks[k],99)):
  tw=d.textlength(line,font=fonts[32]);d.text(((1920-tw)/2,967+n*40),line,font=fonts[32],fill='#f6f7ef')
 d.rectangle((0,1074,int(1920*(sum(D[:i])+t)/sum(D)),1080),fill='#bfe3b3')
 return im
if '--preview' in sys.argv:
 sheet=Image.new('RGB',(1440,270*5))
 for i in range(14):
  im=render(i,D[i]*.62);im.save(W/f'preview-{i:02}.jpg');im.thumbnail((480,270));sheet.paste(im,(i%3*480,i//3*270))
 sheet.save(W/'contact.jpg');sys.exit()
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1920x1080','-r','24','-i','-','-i',str(O/'signallab-demo-v3.mp4'),'-map','0:v','-map','1:a','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',str(O/'signallab-demo-v6.mp4')],stdin=subprocess.PIPE)
elapsed=0;frame=0
for i,dur in enumerate(D):
 end=round((elapsed+dur)*24)
 for n in range(frame,end):p.stdin.write(render(i,n/24-elapsed).tobytes())
 frame=end;elapsed+=dur;print('Scene',i+1,flush=True)
p.stdin.close();assert p.wait()==0
render(0,5).save(O/'demo-v6-poster.jpg',quality=92)
