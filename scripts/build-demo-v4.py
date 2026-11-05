"""Animated explanatory edit. Reuses v3 AAC audio unchanged; no speech synthesis.
Requires Pillow, ffmpeg, and macOS Arial. UI crops are actual captures;
message routing and callouts are explanatory graphics, not recorded interactions.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import ast, json, math, subprocess, textwrap, sys
B=Path(__file__).resolve().parents[1]; O=B/'dist/media'; A=B/'assets/demo-v2'; W=B/'.research-local/demo-v4'; W.mkdir(parents=True,exist_ok=True)
module=ast.parse((B/'scripts/build-demo-v3.py').read_text())
S=next(ast.literal_eval(n.value) for n in module.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='S' for t in n.targets))
# Fixed to the delivered v3 scene durations; the original audio is stream-copied.
D=[9.312,11.856,13.392,11.76,10.68,11.496,12.576,10.968,12.336,13.584,13.464,12.264,14.208,13.464]
FPS=24; BG='#f0f1e9'; INK='#173b36'; SUB='#5d716b'; TEAL='#167c6c'; LIME='#c5ed81'; ORANGE='#ef9d55'; WHITE='#ffffff'; LINE='#d8dfd4'
fonts={}; pics={}
def font(n,b=False):
 key=(n,b)
 if key not in fonts:fonts[key]=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial'+(' Bold' if b else '')+'.ttf',n)
 return fonts[key]
def txt(d,x,y,s,n=24,c=INK,b=False):d.text((int(x),int(y)),s,font=font(n,b),fill=c)
def box(d,rect,c=WHITE,outline=None,r=16):d.rounded_rectangle(tuple(map(int,rect)),r,fill=c,outline=outline,width=2)
def ease(x):x=max(0,min(1,x));return 1-(1-x)**3
def wrap(d,x,y,s,n=24,w=40,c=INK,b=False):
 for j,l in enumerate(textwrap.wrap(s,w)):txt(d,x,y+j*(n+8),l,n,c,b)
def ui(im,name,rect,crop=None):
 key=(name,tuple(rect),crop)
 if key not in pics:
  p=Image.open(A/(name+'.png')).convert('RGB')
  if crop:p=p.crop(crop)
  p.thumbnail((rect[2]-rect[0],rect[3]-rect[1]),Image.Resampling.LANCZOS);pics[key]=p
 p=pics[key];x=rect[0]+(rect[2]-rect[0]-p.width)//2;y=rect[1]+(rect[3]-rect[1]-p.height)//2
 im.paste(p,(x,y));return x,y,p.width,p.height
TITLES=['When should a warning interrupt?','First, commit to a prediction.','Eight messages. One decision rule.','Move the threshold. Watch what changes.','The trade-off is now visible.','Every point has an explanation.','At the boundary, the rule still applies.','Same message. Different guidance.','Show the evidence. Give a next step.','A familiar name is not an identity.','A new case tests the reasoning.','Practice → recall → reflect.','Research is a process, not a badge.','Make security decisions visible.']
CHAPTER=['THE QUESTION','PREDICT','EXPERIMENT','EXPERIMENT','COMPARE','EXPLAIN','EXPLAIN','DESIGN','DESIGN','INSPECT','TRANSFER','REFLECT','EVIDENCE','SIGNALLAB']
def envelope(d,x,y,w=72,c=TEAL):
 d.rounded_rectangle((x,y,x+w,y+w*.65),8,outline=c,width=3);d.line((x,y,x+w/2,y+w*.35,x+w,y),fill=c,width=3)
def subtitle(d,i,t):
 # Short reading units instead of a paragraph covering the screen.
 words=S[i][2].split(); chunks=[];cur=[]
 for word in words:
  cur.append(word)
  if len(cur)>=10 and (word.endswith(('.',',',';')) or len(cur)>=15):chunks.append(' '.join(cur));cur=[]
 if cur:chunks.append(' '.join(cur))
 k=min(len(chunks)-1,int(t/max(.1,D[i]-.6)*len(chunks)))
 lines=textwrap.wrap(chunks[k],86)
 for j,l in enumerate(lines):
  length=d.textlength(l,font=font(25));txt(d,(1280-length)/2,627+j*31,l,25,WHITE)
def render(i,t):
 im=Image.new('RGB',(1280,720),BG);d=ImageDraw.Draw(im);q=t/D[i]
 txt(d,42,24,'SignalLab',26,INK,True);txt(d,222,32,'/  TK2233 · CYBERSECURITY × HCI',15,SUB)
 txt(d,1040,31,f'{i+1:02}   /   {len(S):02}',16,SUB)
 txt(d,42,77,CHAPTER[i],14,TEAL,True);txt(d,42,104,TITLES[i],40,INK,True)
 if i==0:
  box(d,(42,177,780,575),INK);envelope(d,83,215,88,LIME)
  txt(d,83,296,'A message arrives.',39,WHITE,True);txt(d,83,353,'Should the interface stop you?',29,'#c8dad1')
  for j,(a,b,c) in enumerate([('CATCH AN ATTACK','Protect the learner',LIME),('INTERRUPT A REAL TASK','Spend their attention',ORANGE)]):
   y=int(187+j*190+40*(1-ease((t-j*1.8)/1.1)));box(d,(815,y,1238,y+164),WHITE);txt(d,839,y+25,a,18,TEAL,True);wrap(d,839,y+66,b,30,23)
  txt(d,83,515,'CHANGE A RULE. SEE ITS CONSEQUENCES.',18,LIME,True)
 elif i==1:
  box(d,(42,177,740,575));ui(im,'01',(57,193,725,555),(220,150,1120,540));d=ImageDraw.Draw(im)
  txt(d,790,196,'Before revealing results',19,TEAL,True)
  opts=['Both types of error decrease','Catch more; interrupt more','The messages become riskier']
  for j,s in enumerate(opts):
   y=242+j*88;active=t>4 and j==1;box(d,(780,y,1238,y+72),LIME if active else WHITE);txt(d,802,y+22,chr(65+j),22,TEAL,True);txt(d,842,y+24,s,20)
  txt(d,788,526,'Prediction → test → explanation',20,SUB)
 elif i in (2,3):
  threshold=4 if i==2 or t<2 else 2
  txt(d,43,176,'AUTHORED TEACHING FIXTURES',15,SUB,True)
  entries=[('P1',9,True),('P2',7,True),('P3',4,True),('P4',2,True),('L1',0,False),('L2',1,False),('L3',3,False),('L4',5,False)]
  txt(d,400,176,'WARNING',16,TEAL,True);txt(d,804,176,'NO WARNING',16,SUB,True)
  box(d,(388,208,775,481),'#dfebd8');box(d,(793,208,1238,481),'#e4e9e4')
  for j,(name,score,phish) in enumerate(entries):
   warned=score>=threshold
   if i==3:
    old=score>=4;ex=ease((t-2)/1.3);x=(416 if old else 820)+( (416 if warned else 820)-(416 if old else 820))*ex
   else:x=70+((416 if warned else 820)-70)*ease((t-j*.35)/1.2)
   # Four rows per class, two small columns in each outcome.
   x+=0 if phish else 175;y=224+(j%4)*59
   box(d,(x,y,x+158,y+46),WHITE);d.ellipse((x+12,y+15,x+26,y+29),fill=ORANGE if phish else TEAL);txt(d,x+38,y+11,f'{name}  ·  {score}',20,INK,True)
  txt(d,47,240,'4 phishing',19);txt(d,47,277,'4 legitimate',19);txt(d,47,344,'Label ≠ score',20,TEAL,True);wrap(d,47,380,'The rule sees cues, not the hidden label.',19,24,c=SUB)
  d.line((420,535,1080,535),fill=LINE,width=8);th=4 if i==2 else 4-2*ease((t-2)/1.3);xx=420+66*th;d.ellipse((xx-13,522,xx+13,548),fill=TEAL)
  txt(d,43,522,f'Threshold  {threshold}',27,INK,True);txt(d,1130,522,'0–10',20,SUB)
  txt(d,397,573,'Orange = phishing    Green = legitimate    Number = cue score',15,SUB)
 elif i==4:
  for j,(name,a,b) in enumerate([('Missed threats',1,0),('False alarms',1,2)]):
   x=42+j*610;box(d,(x,185,x+586,557));txt(d,x+28,213,name,29,INK,True)
   for k,(label,v,col) in enumerate([('Threshold 4',a,'#bacabd'),('Threshold 2',b,TEAL if j==0 else ORANGE)]):
    yy=290+k*116;txt(d,x+28,yy,label,21,SUB);width=v*175*ease((t-k*1.2)/1.3)
    box(d,(x+195,yy,x+195+max(8,width),yy+52),col,r=9);txt(d,min(x+214+width,x+523),yy+6,str(v),32,INK,True)
  txt(d,60,576,'Same messages. Same evidence. Only the warning threshold changes.',20,TEAL,True)
 elif i==5:
  box(d,(42,178,610,585));ui(im,'04',(55,190,597,574),(505,0,1120,354));d=ImageDraw.Draw(im)
  txt(d,653,183,'P3  /  Cue-by-cue trace',23,INK,True)
  cues=[('Unfamiliar service',3),('Sensitive request',0),('Urgent deadline',1),('Unexpected task',0)]
  for j,(s,v) in enumerate(cues):
   yy=232+j*66;on=t>j*1.6;box(d,(648,yy,1238,yy+54),('#deedce' if v else '#e4e9e4') if on else WHITE);txt(d,669,yy+15,s,22);txt(d,1160,yy+8,str(v) if on else '—',32,TEAL,True)
  if t>7:txt(d,668,522,'3 + 0 + 1 + 0  =  4',34,INK,True)
 elif i==6:
  for j,(a,b) in enumerate([('CUE SCORE','4'),('THRESHOLD','4'),('RESULT','WARN')]):
   x=42+j*410;y=208+int(30*(1-ease((t-j*.8)/1.0)));box(d,(x,y,x+384,y+244),INK if j==2 else WHITE);txt(d,x+28,y+27,a,18,LIME if j==2 else SUB,True);txt(d,x+28,y+82,b,72,WHITE if j==2 else INK,True)
  txt(d,433,302,'≥',52,TEAL,True)
  txt(d,61,491,'Equal to the threshold still triggers a warning.',27,INK,True)
  txt(d,61,546,'Whether it is useful depends on the authored ground truth.',22,SUB)
 elif i in (7,8):
  for j,(name,label,crop) in enumerate([('minimal','MINIMAL NOTICE',(522,290,1100,405)),('actionable','ACTIONABLE GUIDANCE',(522,401,1100,520))]):
   x=42+j*610;box(d,(x,181,x+586,575),WHITE);txt(d,x+24,206,label,18,TEAL,True)
   ui(im,name,(x+16,257,x+570,382),crop);d=ImageDraw.Draw(im)
   if j==0:wrap(d,x+26,423,'“Be careful” leaves the evidence and next action unexplained.',27,32,c=SUB)
   elif i==8 or t>5:
    txt(d,x+26,415,'01  Explain the domain mismatch',22,INK,True);txt(d,x+26,463,'02  Name a safe next action',22,INK,True);txt(d,x+26,517,'Same email · different interface',18,TEAL)
   else:txt(d,x+26,442,'What would make this useful?',25,SUB)
  if i==8:d.rounded_rectangle((652,181,1238,575),16,outline=TEAL,width=4)
 elif i==9:
  box(d,(42,181,1238,344));ui(im,'actionable',(60,194,1220,329),(536,246,1083,372));d=ImageDraw.Draw(im)
  for j,(a,b) in enumerate([('KNOWN CAMPUS SERVICE','campus.example'),('MESSAGE DESTINATION','campus-help.example')]):
   y=371+j*102;txt(d,65,y,a,16,SUB,True);box(d,(480,y-8,1215,y+65),WHITE)
   if j==1 and t>3:
    pos=480+24+d.textlength('campus',font=font(36,True));d.rectangle((pos,y-1,pos+d.textlength('-help',font=font(36,True)),y+48),fill='#ffd8a8')
   txt(d,504,y+2,b,36,INK,True)
  txt(d,65,581,'Preview only: the simulator never opens the fictional destination.',18,TEAL)
 elif i==10:
  box(d,(42,181,744,580));ui(im,'07',(56,198,730,561),(220,0,1120,540));d=ImageDraw.Draw(im)
  for j,(a,b) in enumerate([('01','Choose an action'),('02','Explain your reason'),('03','Record confidence')]):
   y=206+j*103;box(d,(779,y,1238,y+81),LIME if int(t/3)==j else WHITE);txt(d,799,y+23,a,25,TEAL,True);txt(d,854,y+27,b,23,INK,True)
  wrap(d,797,533,'Feedback after all three cases.',20,36,c=SUB)
 elif i==11:
  tabs=['FIRST ATTEMPTS','RECALL','RETURN TO MISSED IDEAS'];k=min(2,int(t/4))
  for j,name in enumerate(tabs):
   x=42+j*405;box(d,(x,178,x+389,226),INK if j==k else '#e1e6dc');txt(d,x+17,193,name,16,WHITE if j==k else SUB,True)
  box(d,(42,247,830,586));ui(im,'08' if k==0 else 'recall',(54,260,818,571),(213,0,1120,540));d=ImageDraw.Draw(im)
  txt(d,870,278,['Separate practice','Hide the inbox','Ask again'][k],28,INK,True)
  wrap(d,870,338,['First attempts stay distinct from repeated practice.','Retrieve the idea without copying the example.','Missed ideas return when the app reopens.'][k],26,23)
  txt(d,870,543,'Local save + export',20,TEAL,True)
 elif i==12:
  rows=[('01','FIND','UKM Library → Scopus AI'),('02','READ','Full text → NotebookLM'),('03','CHALLENGE','Check claims → revise design')]
  for j,(num,title,body) in enumerate(rows):
   y=187+j*100;box(d,(42,y,1238,y+85),INK if int(t/3.5)==j else WHITE);col=WHITE if int(t/3.5)==j else INK;txt(d,65,y+24,num,26,TEAL if col==INK else LIME,True);txt(d,140,y+28,title,21,col,True);txt(d,445,y+24,body,28,col)
  txt(d,60,520,'Software checks ≠ measured learning gains',28,INK,True);txt(d,60,564,'Peer trials and course review remain pending.',22,SUB)
 else:
  box(d,(42,178,1238,586),INK)
  txt(d,76,209,'EXPLORE.',58,LIME,True)
  if t>1.5:txt(d,76,278,'EXPLAIN.',58,WHITE,True)
  if t>3:txt(d,76,347,'APPLY.',58,WHITE,True)
  ui(im,'05',(654,212,1205,487));d=ImageDraw.Draw(im)
  txt(d,76,463,'Try the simulator. Inspect the source.',25,'#cee0d6')
  txt(d,76,531,'a215445-coder.github.io/signallab-hci-security',23,LIME)
 # Small editorial disclosure; all substantial graphics trace actual fixture values.
 txt(d,43,605,'UI CAPTURES + EXPLANATORY ANIMATION',10,SUB)
 d.rectangle((0,621,1280,720),fill=INK);subtitle(d,i,t)
 progress=(sum(D[:i])+t)/sum(D);d.rectangle((0,714,int(1280*progress),720),fill=LIME)
 return im
if '--preview' in sys.argv:
 ims=[]
 for i in range(len(S)):
  im=render(i,D[i]*.65);im.save(W/f'preview-{i:02}.png');im.thumbnail((426,240));ims.append(im)
 sheet=Image.new('RGB',(1278,240*5),'#ccc')
 for j,im in enumerate(ims):sheet.paste(im,((j%3)*426,(j//3)*240))
 sheet.save(W/'contact.jpg');print(W/'contact.jpg');sys.exit()
cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s','1280x720','-r',str(FPS),'-i','-','-i',str(O/'signallab-demo-v3.mp4'),'-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',str(O/'signallab-demo-v4.mp4')]
p=subprocess.Popen(cmd,stdin=subprocess.PIPE);elapsed=0;last=0
for i,duration in enumerate(D):
 end=round((elapsed+duration)*FPS)
 for frame in range(last,end):p.stdin.write(render(i,frame/FPS-elapsed).tobytes())
 elapsed+=duration;last=end;print(f'Scene {i+1}/14 rendered',flush=True)
p.stdin.close();assert p.wait()==0
render(0,6).save(O/'demo-v4-poster.jpg',quality=92)
print('Complete: v3 audio stream preserved unchanged.')
