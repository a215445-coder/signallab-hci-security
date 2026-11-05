from pathlib import Path
import ast,json,shutil,subprocess,textwrap
B=Path(__file__).resolve().parents[1];P=B/'video-studio';A=P/'assets';A.mkdir(exist_ok=True)
def values(file,names):
 m=ast.parse(file.read_text());return {t.id:ast.literal_eval(n.value) for n in m.body if isinstance(n,ast.Assign) for t in n.targets if isinstance(t,ast.Name) and t.id in names}
v=values(B/'scripts/build-demo-v6.py',['D','SCENES','PARTS']);s=values(B/'scripts/build-demo-v3.py',['S'])['S']
for f in (B/'assets/demo-v6').glob('*.mp4'):shutil.copy2(f,A/f.name)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(B/'dist/media/signallab-demo-v3.mp4'),'-map','0:a','-c','copy',str(A/'narration.m4a')],check=True)
shared='''
const v=document.querySelector('video'),label=document.querySelector('#label');
const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
const ready=new Promise((resolve,reject)=>{v.addEventListener('loadedmetadata',resolve,{once:true});v.addEventListener('error',reject,{once:true});if(v.readyState>=1)resolve()});
window.film={duration:C.length,width:1920,height:1080,ready,async frame(t){
 await ready;
 const time=Math.max(0,Math.min(v.duration-.001,t-C.lead+(C.intro?2:0)));
 if(Math.abs(v.currentTime-time)>.012){await new Promise(resolve=>{v.addEventListener('seeked',resolve,{once:true});v.currentTime=time})}
 let z=C.rect?smooth((t-Math.max(C.lead+1.25,2))/1.2)*(1-smooth((t-(C.length-1.4))/1.2)):0;
 let r=C.rect||[0,0,1147,541],cw=Math.max(r[2]-r[0],(r[3]-r[1])*1147/541),ch=cw*541/1147;
 let x=Math.max(0,Math.min(1147-cw,(r[0]+r[2]-cw)/2)),y=Math.max(0,Math.min(541-ch,(r[1]+r[3]-ch)/2));
 let w=1147+(cw-1147)*z,h=541+(ch-541)*z,xx=x*z,yy=y*z;
 let scale=1147/w;v.style.transform=`translate(${-xx*1920/w}px,${-yy*906/h}px) scale(${scale})`;
 label.textContent=C.title;
}};
'''
(P/'shot.js').write_text(shared)
css='''html,body{margin:0;width:1920px;height:1080px;background:#101a17;overflow:hidden;font-family:Arial,sans-serif}#viewport{width:1920px;height:906px;overflow:hidden;position:relative;background:#f5f7ef}video{position:absolute;left:0;top:0;width:1920px;height:906px;transform-origin:0 0;object-fit:fill}#label{position:absolute;left:35px;top:922px;font-size:25px;color:#bfe3b3}'''
(P/'shot.css').write_text(css)
titles=['SignalLab · Live walkthrough','Predict before running','Threshold 4 · baseline','Adjust the threshold','Compare the two policies','Inspect a message','Read the calculation','Change the warning design','Evidence + a safe next step','Inspect the real address','Choose an action and a reason','Recall without the inbox','Research and validation','Explore SignalLab']
clips=[];at=0;idx=0
for i,(shots,lengths) in enumerate(zip(v['SCENES'],v['PARTS'])):
 for (name,lead,rect),length in zip(shots,lengths):
  idx+=1;cfg={'length':length,'lead':lead,'rect':rect,'intro':i==0,'title':titles[i]}
  page=f'shot-{idx:02}.html'
  (P/page).write_text('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="shot.css"></head><body><div id="viewport"><video muted preload="auto" src="assets/'+name+'.mp4"></video></div><div id="label"></div><script>const C='+json.dumps(cfg)+';</script><script src="shot.js"></script></body></html>')
  clips.append(f'<iframe id="shot-{idx:02}" src="{page}#t=0,{length:.6f}" at="{at:.6f}"></iframe>');at+=length
# Read existing film before replacing the scaffold; refuse to discard authored tracks.
film=P/'film.html';old=film.read_text()
if '<iframe' in old or '<audio' in old:raise SystemExit('Existing authored film found; preserve user edits before regenerating')
film.write_text('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=1920, height=1080"></head><body><section>\n'+'\n'.join(clips)+'\n</section><section><audio id="approved-narration" src="assets/narration.m4a"></audio></section></body></html>')
def stamp(t):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02}.{ms%1000:03}'
vtt=['WEBVTT',''];at=0
for i,scene in enumerate(s):
 chunks=textwrap.wrap(scene[2],88);duration=v['D'][i];words=sum(len(c.split()) for c in chunks);offset=0
 for chunk in chunks:
  end=offset+duration*len(chunk.split())/words
  vtt.extend([f'{stamp(at+offset)} --> {stamp(at+end)}',chunk,'']);offset=end
 at+=duration
(A/'narration.vtt').write_text('\n'.join(vtt))
(P/'README.md').write_text('# SignalLab OpenFilm editing project\n\nOpen with `npx -y openfilm@latest open video-studio` from the repository root. Each actual browser take has its own editable shot on the timeline. The original source recordings are retained unchanged. The approved narration is an audio stream copy from v3; its VTT uses approximate sentence-line timing. Focus movements, reading pauses and chapter labels are editorial. Fresh-case/recall source takes use a local demonstration copy of the same app. No learning-study results are claimed.\n')
print('Prepared',idx,'editable recording shots;',round(at,3),'seconds')
