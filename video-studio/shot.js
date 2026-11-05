
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
