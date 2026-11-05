"""SignalLab motion interface edit. Original v3 narration, unmodified.
Actual app captures are labelled; all other panels are explanatory animation.
Requires build-demo-v4.py, Pillow, ffmpeg and the configured macOS fonts.
"""
from pathlib import Path
import math, subprocess, sys
# Reuse source data, typography, verified UI assets and caption layout only.
exec((Path(__file__).parent/'build-demo-v4.py').read_text().split("if '--preview' in sys.argv:")[0])
W=B/'.research-local/demo-v5';W.mkdir(parents=True,exist_ok=True)
NIGHT='#0b101b'; PANEL='#141e30'; BORDER='#2c3b54'; TEXT='#f2f4fc'; DIM='#acb9d0'; CYAN='#83e9dc'; VIOLET='#b7a4ff'; GOLD='#ffbc83'
def text(d,x,y,s,n=24,c=TEXT,b=False):txt(d,x,y,s,n,c,b)
def panel(d,r,c=PANEL):box(d,r,c,BORDER,22)
def lines(d,x,y,s,n=24,w=38,c=DIM):wrap(d,x,y,s,n,w,c)
def tag(d,x,y,s,c=CYAN):
 width=d.textlength(s,font=font(13,True))+24;box(d,(x,y,x+width,y+28),'#1c2b3b',r=8);text(d,x+12,y+7,s,13,c,True)
def path(d,points,c=BORDER,width=2):d.line(points,fill=c,width=width)
def token(d,x,y,r=8,c=CYAN):
 d.ellipse((x-r-5,y-r-5,x+r+5,y+r+5),outline=c,width=1);d.ellipse((x-r,y-r,x+r,y+r),fill=c)
def curve(d,start,end,t,c=CYAN):
 x,y=start;xx,yy=end;points=[]
 for j in range(41):
  u=j/40;points.append((x+(xx-x)*u,y+(yy-y)*(u*u*(3-2*u))))
 path(d,points,BORDER,2);u=t%1;px=x+(xx-x)*u;py=y+(yy-y)*(u*u*(3-2*u));token(d,px,py,4,c)
def browser(im,name,rect,crop=None,label='ACTUAL SIMULATOR'):
 d=ImageDraw.Draw(im);x,y,xx,yy=rect;panel(d,rect,'#1a2436')
 for j,c in enumerate(['#ffbc83','#b7a4ff','#83e9dc']):d.ellipse((x+17+j*17,y+15,x+24+j*17,y+22),fill=c)
 text(d,x+88,y+11,label,12,DIM,True);ui(im,name,(x+9,y+38,xx-9,yy-9),crop)
def headline(d,kicker,title,subtitle=None):
 text(d,48,85,kicker,13,CYAN,True);text(d,48,112,title,39,TEXT,True)
 if subtitle:text(d,49,164,subtitle,18,DIM)
def body(i,t):
 im=Image.new('RGB',(1280,720),NIGHT);d=ImageDraw.Draw(im)
 # Architectural grid: restrained, always behind content.
 for x in range(32,1280,48):
  for y in range(88,615,48):d.point((x,y),fill='#233047')
 if i==0:
  tag(d,48,105,'HUMAN-CENTRED CYBERSECURITY',VIOLET)
  text(d,48,173,'Trust is a',64,TEXT,True);text(d,48,245,'design decision.',64,CYAN,True)
  lines(d,50,345,'One warning. Two possible costs.',27,32)
  tag(d,50,428,'EXPLORE');tag(d,180,428,'EXPLAIN',VIOLET);tag(d,310,428,'APPLY',GOLD)
  panel(d,(700,111,1205,290));tag(d,726,134,'INCOMING MESSAGE');envelope(d,735,195,66,CYAN);text(d,831,199,'Campus account',28,TEXT,True);text(d,831,243,'Does this need a warning?',19,DIM)
  for j,(a,b,c) in enumerate([('ATTACK CAUGHT','Protect the learner',CYAN),('REAL TASK BLOCKED','Interrupt their work',GOLD)]):
   y=360+j*129;curve(d,(950,292),(865,y),t*.18+j*.5,c);panel(d,(731,y,1205,y+101));text(d,752,y+19,a,16,c,True);text(d,752,y+52,b,26)
 elif i==1:
  headline(d,'01 / COMMIT','A prediction makes the result meaningful.','Lower the threshold. What do you expect to happen?')
  browser(im,'01',(48,220,570,582),(220,150,1120,540));d=ImageDraw.Draw(im)
  for j,(a,b) in enumerate([('A','Both kinds of error decrease'),('B','Catch more · interrupt more'),('C','The messages become riskier')]):
   y=232+j*103;panel(d,(615,y,1231,y+82));active=t>4 and j==1
   if active:d.rounded_rectangle((615,y,1231,y+82),22,outline=CYAN,width=3)
   text(d,640,y+22,a,28,CYAN if active else DIM,True);text(d,702,y+28,b,23)
  tag(d,619,557,'PREDICT → TEST → EXPLAIN',VIOLET)
 elif i in (2,3):
  threshold=4 if i==2 or t<2 else 2
  headline(d,'02 / EXPERIMENT',f'Threshold {threshold}  /  same eight messages','The rule sees a cue score. The authored label stays fixed.')
  entries=[('P1',9,1),('P2',7,1),('P3',4,1),('P4',2,1),('L1',0,0),('L2',1,0),('L3',3,0),('L4',5,0)]
  panel(d,(48,215,295,586));text(d,69,240,'WARNING RULE',15,CYAN,True);text(d,69,281,'score ≥',33);text(d,75,331,str(threshold),90,CYAN,True)
  path(d,[(78,462),(258,462)],BORDER,8);th=4 if i==2 else 4-2*ease((t-2)/1.3);token(d,78+18*th,462,10)
  text(d,71,504,'Orange: phishing',17,GOLD);text(d,71,534,'Mint: legitimate',17,CYAN)
  for k,(x,label) in enumerate([(332,'WARN'),(791,'ALLOW WITHOUT WARNING')]):
   panel(d,(x,215,x+440,586));text(d,x+20,238,label,15,CYAN if k==0 else DIM,True)
  for j,(name,score,phish) in enumerate(entries):
   warned=score>=threshold;dest=352 if warned else 811
   if i==3:
    old=352 if score>=4 else 811;x=old+(dest-old)*ease((t-2)/1.25)
   else:x=352+(dest-352)*ease((t-j*.2)/1.2)
   x+=0 if phish else 202;y=281+(j%4)*70;panel(d,(x,y,x+181,y+55),'#1e2c43');text(d,x+16,y+16,name,20,GOLD if phish else CYAN,True);text(d,x+92,y+16,f'{score} pts',19,DIM)
 elif i==4:
  headline(d,'03 / READ THE TRADE-OFF','One gain. One cost.','Only the threshold changes: 4 → 2.')
  for j,(title,first,last,col,detail) in enumerate([('MISSED THREATS',1,0,CYAN,'One more attack caught'),('FALSE ALARMS',1,2,GOLD,'One more genuine task interrupted')]):
   x=48+j*603;panel(d,(x,215,x+580,580));text(d,x+27,244,title,17,col,True)
   text(d,x+30,296,str(first),91,DIM,True);text(d,x+160,326,'→',55,col);text(d,x+285,296,str(last),91,col,True)
   for k,v in enumerate([first,last]):
    y=426+k*48;text(d,x+28,y,'T4' if k==0 else 'T2',16,DIM);box(d,(x+92,y,x+92+max(5,v*166*ease((t-k)/1.4)),y+23),col if k else '#596b83',r=6)
   text(d,x+27,535,detail,20)
 elif i==5:
  headline(d,'04 / TRACE THE EVIDENCE','Open the calculation.','P3 · Deadline on an unfamiliar service')
  browser(im,'04',(48,216,538,584),(505,0,1120,354));d=ImageDraw.Draw(im)
  total=0
  for j,(name,value) in enumerate([('Unfamiliar service',3),('Sensitive request',0),('Urgent deadline',1),('Unexpected task',0)]):
   on=t>j*1.6;total+=value if on else 0;y=218+j*72;panel(d,(581,y,1080,y+60));text(d,600,y+20,name,22,DIM if not on else TEXT);text(d,1017,y+12,str(value) if on else '·',32,CYAN,True)
   if on:curve(d,(1081,y+30),(1151,521),t*.2+j*.25)
  panel(d,(1085,477,1231,583),'#203a3c');text(d,1107,490,'SCORE',13,CYAN,True);text(d,1124,512,str(total),48,TEXT,True)
 elif i==6:
  headline(d,'04 / APPLY THE RULE','The boundary is part of the explanation.','A score equal to the threshold still triggers a warning.')
  for j,(a,b) in enumerate([('CUE SCORE','4'),('THRESHOLD','4'),('RESULT','WARN')]):
   x=48+j*405;panel(d,(x,242,x+373,470),'#203a3c' if j==2 else PANEL);text(d,x+24,269,a,16,CYAN,True);
   if j!=0 or t>=1.1:text(d,x+24,326,b,73,TEXT,True)
   if j<2:text(d,x+374,335,'≥' if j==0 else '→',29,VIOLET,True)
  tag(d,48,514,'SCORE ≠ GROUND TRUTH',GOLD);text(d,48,560,'The label determines whether the warning was useful.',25,DIM)
 elif i in (7,8):
  headline(d,'05 / DESIGN FOR THE HUMAN','Same message. Two decision experiences.','Change the guidance, while holding the message evidence fixed.')
  browser(im,'minimal',(48,215,628,407),(522,290,1100,405),'ACTUAL UI / MINIMAL');browser(im,'actionable',(652,215,1232,407),(522,401,1100,520),'ACTUAL UI / ACTIONABLE');d=ImageDraw.Draw(im)
  for j,(title,detail,col) in enumerate([('“Be careful.”','The learner must find the evidence.',DIM),('Evidence + a next step','Make the safer action understandable.',CYAN)]):
   x=48+604*j;panel(d,(x,431,x+580,581));text(d,x+24,452,title,28,col,True);lines(d,x+24,505,detail,21,42)
  if i==8:
   # Sequential focus on evidence and action in the actual warning.
   y=297 if t<6 else 329;d.rounded_rectangle((666,y,1215,y+34),7,outline=GOLD if t<6 else CYAN,width=3)
 elif i==9:
  headline(d,'06 / INSPECT THE DESTINATION','Make the hidden difference visible.','Recognition is easier when the evidence is on screen.')
  browser(im,'actionable',(48,215,530,581),(536,246,1083,372));d=ImageDraw.Draw(im)
  for j,(title,domain) in enumerate([('KNOWN CAMPUS SERVICE','campus.example'),('MESSAGE DESTINATION','campus-help.example')]):
   y=221+j*150;panel(d,(566,y,1232,y+128));text(d,590,y+19,title,14,DIM,True)
   if j and t>3:
    start=590+d.textlength('campus',font=font(36,True));box(d,(start-2,y+53,start+100,y+101),'#714d31',r=6)
   text(d,590,y+55,domain,36,TEXT,True)
  tag(d,568,541,'PREVIEW ONLY · LINK NEVER OPENED',CYAN)
 elif i==10:
  headline(d,'07 / TRANSFER','A correct click is only half the story.','A fresh case asks for an action, a reason and confidence.')
  browser(im,'07',(48,215,750,584),(220,0,1120,540));d=ImageDraw.Draw(im)
  for j,(a,b) in enumerate([('01','CHOOSE'),('02','EXPLAIN'),('03','REFLECT')]):
   y=217+j*104;active=min(2,int(t/3))==j;panel(d,(787,y,1232,y+86),'#203a3c' if active else PANEL);text(d,809,y+27,a,24,CYAN,True);text(d,877,y+25,b,27,TEXT,True)
  text(d,795,556,'Feedback after all 3 cases.',19,DIM)
 elif i==11:
  headline(d,'08 / CLOSE THE LEARNING LOOP','Retrieve it. Return to it.','First attempts stay separate from repeated practice.')
  k=min(2,int(t/4));browser(im,'08' if k==0 else 'recall',(48,215,822,586),(213,0,1120,540));d=ImageDraw.Draw(im)
  for j,(a,b) in enumerate([('PRACTICE','Record the first attempt'),('RECALL','Hide the original inbox'),('RETURN','Revisit a missed idea')]):
   y=220+j*115;panel(d,(854,y,1232,y+94),'#203a3c' if j==k else PANEL);text(d,875,y+17,a,20,CYAN if j==k else DIM,True);text(d,875,y+55,b,18)
 elif i==12:
  headline(d,'09 / KEEP CLAIMS ACCOUNTABLE','Research → critique → revision','Evidence informs the design. Testing checks the implementation.')
  for j,(a,b,c) in enumerate([('FIND','UKM Library','Scopus AI'),('READ','Full-text source','NotebookLM'),('CHECK','Question the claim','Revise & test')]):
   x=48+j*405;y=231;panel(d,(x,y,x+373,484));tag(d,x+24,y+23,f'0{j+1} / {a}',[CYAN,VIOLET,GOLD][j]);text(d,x+24,y+92,b,27,TEXT,True);text(d,x+24,y+146,c,24,DIM)
   if j<2:curve(d,(x+375,365),(x+401,365),t*.25)
  text(d,49,528,'No measured learning gains claimed.',27,GOLD,True);text(d,49,573,'Peer trials and course review remain pending.',21,DIM)
 else:
  tag(d,48,109,'SIGNALLAB / TK2233',VIOLET)
  text(d,48,172,'Make the',65,TEXT,True);text(d,48,248,'decision visible.',65,CYAN,True)
  text(d,49,348,'Explore. Explain. Apply.',30,DIM)
  browser(im,'05',(731,119,1231,438));d=ImageDraw.Draw(im)
  path(d,[(48,452),(1231,452)],BORDER)
  text(d,49,487,'TRY THE SIMULATOR · INSPECT THE SOURCE',17,CYAN,True)
  text(d,49,531,'a215445-coder.github.io/signallab-hci-security',28,TEXT,True)
 return im
STAGES=['QUESTION','EXPERIMENT','EXPLAIN','DESIGN','LEARN','EVIDENCE']
def render5(i,t,transition=True):
 im=body(i,t)
 # Shared-stage cuts preserve the spatial map. Chapter changes use a soft push.
 if transition and i>0 and t<.65 and i not in (3,8):
  u=ease(t/.65);prev=body(i-1,D[i-1]-.01);new=Image.new('RGB',(1280,720),NIGHT)
  # Slide only the content; persistent top navigation and captions stay anchored.
  a=prev.crop((0,76,1280,615));b=im.crop((0,76,1280,615));new.paste(a,(-int(52*u),76));incoming=Image.new('RGB',(1280,720),NIGHT);incoming.paste(b,(int(52*(1-u)),76));new=Image.blend(new,incoming,u)
  im=new
 # The computed score travels into the comparison stage, preserving object identity.
 if i==6 and t<1.1:
  u=ease(t/1.1);cx=1155+(90-1155)*u;cy=544+(356-544)*u
  dd=ImageDraw.Draw(im);panel(dd,(cx-55,cy-47,cx+55,cy+47),'#203a3c');text(dd,cx-18,cy-30,'4',50,CYAN,True)
 d=ImageDraw.Draw(im);d.rectangle((0,0,1280,74),fill=NIGHT);text(d,48,25,'SignalLab',26,TEXT,True);tag(d,201,27,'DECISION LAB',VIOLET)
 group=0 if i<2 else 1 if i<5 else 2 if i<7 else 3 if i<10 else 4 if i<12 else 5
 for j,name in enumerate(STAGES):
  x=475+j*123;text(d,x,32,name,12,CYAN if j==group else DIM,True)
  if j==group:d.rounded_rectangle((x,57,x+95,60),2,fill=CYAN)
 text(d,49,603,'ACTUAL UI CAPTURES + EXPLANATORY MOTION DESIGN',10,DIM)
 d.rectangle((0,623,1280,720),fill=NIGHT);subtitle(d,i,t)
 progress=(sum(D[:i])+t)/sum(D);d.rectangle((0,714,int(1280*progress),718),fill=CYAN)
 return im
if '--preview' in sys.argv:
 sheet=Image.new('RGB',(1280,240*5),NIGHT)
 for i in range(14):
  im=render5(i,D[i]*.65);im.save(W/f'preview-{i:02}.png');im.thumbnail((426,240));sheet.paste(im,((i%3)*426,(i//3)*240))
 sheet.save(W/'contact.jpg');print(W/'contact.jpg');sys.exit()
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s','1280x720','-r','24','-i','-','-i',str(O/'signallab-demo-v3.mp4'),'-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',str(O/'signallab-demo-v5.mp4')],stdin=subprocess.PIPE)
elapsed=0;last=0
for i,duration in enumerate(D):
 end=round((elapsed+duration)*24)
 for f in range(last,end):p.stdin.write(render5(i,f/24-elapsed).tobytes())
 elapsed+=duration;last=end;print(f'Scene {i+1}/14',flush=True)
p.stdin.close();assert p.wait()==0
render5(0,6).save(O/'demo-v5-poster.jpg',quality=94)
