"""Build a narrated, captioned demo from actual UI captures; requires edge-tts, Pillow and ffmpeg."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import asyncio, subprocess, textwrap, json
import edge_tts
BASE=Path(__file__).resolve().parents[1];W=BASE/'.research-local/demo-v3';OLD=BASE/'assets/demo-v2';OUT=BASE/'dist/media';W.mkdir(parents=True,exist_ok=True)
S=[('ONE THRESHOLD. TWO MISTAKES.', 'SignalLab', 'A warning can catch an attack, or interrupt a genuine task. SignalLab lets you explore both outcomes, then connect them to human centred security design.', 'hero', None), ('PREDICT BEFORE REVEAL', 'What changes when the threshold falls?', 'Before the results appear, choose a prediction. The distractors expose two misconceptions: that both errors must decrease, or that a different warning rule makes the messages themselves more dangerous.', 'screen', ('01', (210, 80, 1120, 540))), ('02 / RUN THE RULE', 'Start at threshold 4', 'At threshold four, three threats trigger warnings. One threat is missed. One genuine task is interrupted. These counts come from eight disclosed teaching messages, split evenly between phishing and legitimate examples.', 'metrics4', None), ('CHANGE ONE INPUT', 'Lower the threshold to 2', 'Now lower the threshold to two. All four authored threats trigger warnings, but two genuine tasks are interrupted. Changing the threshold changes the decision rule; the message evidence stays fixed.', 'metrics2', None), ('COMPARE THE OUTCOMES', 'More sensitive means more interruptions', 'Compare the two runs. Missed threats fall from one to zero, while false alarms rise from one to two. This is the central trade-off: catching more attacks may consume more attention.', 'compare', None), ('03 / OPEN THE BLACK BOX', 'Follow one message through the calculation', 'Open a message trace. The selected example has three points for an unfamiliar service, zero for a sensitive request, one for urgency, and zero for an unexpected task. The total is four.', 'screen', ('04', (500, 0, 1125, 355))), ('THE PROCESS IS VISIBLE', '4 ≥ 4 → show a warning', 'The score equals the threshold, so the interface warns. The authored ground truth then determines whether that warning is useful or unnecessary. A cue score by itself does not establish whether a message is legitimate.', 'equation', None), ('04 / DESIGN THE INTERFACE', 'A generic warning leaves work to the learner', 'Next, hold the message fixed and change only the interface. A minimal notice offers little explanation. It asks the learner to work out which evidence matters and what action to take.', 'screen', ('minimal', (500, 180, 1120, 540))), ('SPECIFIC EVIDENCE + NEXT STEP', 'Make the safer action understandable', 'Actionable guidance names the relevant evidence and gives a practical next step. The fictional destination differs from the known campus service. The warning explains that difference instead of relying on visual alarm alone.', 'screen', ('actionable', (520, 265, 1120, 530))), ('INSPECT BEFORE DECIDING', 'Expose the actual destination', 'The destination inspector reveals the full address without opening it. This supports recognition and inspection. It also makes an important distinction visible: a familiar display name does not authenticate the sender or the linked service.', 'screen', ('actionable', (530, 240, 1100, 375))), ('05 / APPLY IT TO A NEW CASE', 'Choose an action AND a reason', 'The fresh-case check records an action, a reason and confidence. Explanations wait until all three cases are completed. Requiring a reason helps reveal the learner’s thinking, rather than treating a lucky choice as understanding.', 'screen', ('transfer', (210, 0, 1120, 540))), ('RETRIEVE, THEN REFLECT', 'Recall without the inbox', 'The report separates first attempts from repeated practice. Recall hides the inbox, and previously missed ideas return when the learner reopens the app. Progress stays locally in the browser and can be exported.', 'screen', ('recall', (210, 0, 1120, 540))), ('RESEARCH → CRITIQUE → REVISION', 'Evidence informs the design', 'The research log records actual Scopus AI and NotebookLM use, source checks and corrections. Machine classification accuracy was not treated as proof of student learning. Software checks and real human review are recorded separately.', 'research', None), ('TK2233 CYBERSECURITY × HCI', 'Explore. Explain. Apply.', 'SignalLab makes a security decision visible, lets learners change it, and asks them to explain the result. Try the public simulator and inspect the source. Peer trials and course review remain pending; learning gains have not been measured.', 'outro', None)]
FONT='/System/Library/Fonts/Supplemental/Arial.ttf'
def ft(n):return ImageFont.truetype(FONT,n)
BG='#10271f';FG='#f5f8ee';MINT='#c6e79b';MUTED='#b2c7b9'
def label(d,xy,t,n=22,fill=FG):d.text(xy,t,font=ft(n),fill=fill)
def wrapped(d,xy,t,width=87,n=23,fill=FG):
 for i,line in enumerate(textwrap.wrap(t,width)):label(d,(xy[0],xy[1]+i*(n+7)),line,n,fill)
def card(d,box):d.rounded_rectangle(box,18,fill='#203d30',outline='#46654e',width=2)
def render(i,scene):
 kicker,title,voice,kind,src=scene;im=Image.new('RGB',(1280,720),BG);d=ImageDraw.Draw(im)
 label(d,(40,22),'SignalLab.',25,MINT);label(d,(1045,28),f'{i+1:02} / {len(S):02}',20,MUTED)
 label(d,(40,77),kicker,17,MINT);label(d,(40,109),title,40)
 if kind=='screen':
  name,box=src;file=OLD/(name+'.png')
  pic=Image.open(file).convert('RGB').crop(box);pic.thumbnail((1180,355));im.paste(pic,((1280-pic.width)//2,180+(355-pic.height)//2));d=ImageDraw.Draw(im)
 elif kind in ('metrics4','metrics2'):
  vals=[3,1,1,3] if kind=='metrics4' else [4,0,2,2]
  for k,(v,t) in enumerate(zip(vals,['Threats warned','Threats missed','False alarms','Routine allowed'])):
   x=40+k*306;card(d,(x,205,x+286,480));label(d,(x+26,230),str(v),115,MINT if k in [0,3] else '#ffd29b');label(d,(x+26,390),t,23);label(d,(x+26,435),'of 4 in this class',17,MUTED)
 elif kind in ('compare','extremes'):
  rows=[('Threshold 4','1 missed','1 false alarm'),('Threshold 2','0 missed','2 false alarms')] if kind=='compare' else [('Threshold 0','0 missed','4 false alarms'),('Threshold 10','4 missed','0 false alarms')]
  for j,row in enumerate(rows):
   y=210+j*145;card(d,(40,y,1240,y+120));label(d,(70,y+35),row[0],32,MINT);label(d,(470,y+35),row[1],32);label(d,(840,y+35),row[2],32)
 elif kind=='equation':
  label(d,(135,210),'3 + 0 + 1 + 0 = 4',72,MINT);label(d,(135,330),'4 ≥ 4  →  WARNING',60);label(d,(140,445),'Score → comparison → displayed result',25,MUTED)
 elif kind=='dda':
  for j,(a,b) in enumerate([('2 preferred decisions','Suggest more challenge'),('2 risky decisions','Show a hint + easier level'),('Cautious verification','A safe alternative')]):
   y=192+j*110;card(d,(40,y,1240,y+90));label(d,(70,y+24),a,29,MINT);label(d,(650,y+24),b,26)
 elif kind=='research':
  for j,(a,b) in enumerate([('SEARCH','UKM Library → Scopus AI'),('EXTRACT','Full-text source → NotebookLM'),('CHECK','Read, critique, revise, test')]):
   y=192+j*110;card(d,(40,y,1240,y+90));label(d,(70,y+25),a,22,MINT);label(d,(365,y+24),b,31)
 else:
  label(d,(50,210),'WHEN SHOULD AN',57);label(d,(50,282),'INTERFACE INTERRUPT?',67,MINT)
  if kind=='outro':
   d.rectangle((40,185,1240,525),fill=BG);label(d,(55,220),'A working simulator.',61,MINT);label(d,(55,310),'A visible learning process.',52);label(d,(55,425),'a215445-coder.github.io/signallab-hci-security',24,MUTED)
  else:label(d,(55,440),'Input  →  Rule  →  Consequence',36,MUTED)
 d.rectangle((0,552,1280,720),fill='#071b14');wrapped(d,(40,574),voice,94,22)
 d.rectangle((0,714,int(1280*(i+1)/len(S)),720),fill=MINT)
 im.save(W/f'frame-{i:02}.png')
async def voices():
 sem=asyncio.Semaphore(3)
 async def one(i,s):
  async with sem:
   p=W/f'voice-{i:02}.mp3'
   if not p.exists():await edge_tts.Communicate(s[2],'en-US-AndrewNeural',rate='+12%').save(str(p))
 await asyncio.gather(*(one(i,s) for i,s in enumerate(S)))
asyncio.run(voices());durations=[]
for i,s in enumerate(S):
 render(i,s);audio=W/f'voice-{i:02}.mp3';ad=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(audio)]));dur=max(7.0,ad+0.6);durations.append(dur)
 subprocess.run(['ffmpeg','-v','error','-y','-loop','1','-framerate','24','-i',str(W/f'frame-{i:02}.png'),'-i',str(audio),'-vf',"zoompan=z='min(zoom+0.000014,1.012)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1280x720:fps=24",'-af','apad,loudnorm=I=-16:TP=-1.5:LRA=9','-t',str(dur),'-c:v','libx264','-preset','veryfast','-crf','22','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k',str(W/f'clip-{i:02}.mp4')],check=True)
 print('Scene',i+1,round(dur,2),flush=True)
assert 120<=sum(durations)<=180,sum(durations)
(W/'concat.txt').write_text('\n'.join(f"file '{W/f'clip-{i:02}.mp4'}'" for i in range(len(S))))
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',str(W/'concat.txt'),'-c','copy','-movflags','+faststart',str(OUT/'signallab-demo-v3.mp4')],check=True)
(OUT/'demo-transcript-v3.md').write_text('# SignalLab — revised demonstration\n\nActual UI captures and illustrative motion graphics. Neural English narration at +12% generation rate, with the previous 1.32× tempo acceleration removed. Repeated sections removed and pauses added between shots. No peer-study footage.\n\n'+'\n\n'.join(f'## {int(sum(durations[:i]))//60}:{int(sum(durations[:i]))%60:02} — {s[1]}\n\n{s[2]}' for i,s in enumerate(S)))
(W/'timing.json').write_text(json.dumps(durations));print('TOTAL',sum(durations))
