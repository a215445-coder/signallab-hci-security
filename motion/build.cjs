const fs=require('node:fs');
const path=require('node:path');
const esbuild=require('esbuild');
const root=path.resolve(__dirname,'..');
const result=esbuild.buildSync({entryPoints:[path.join(__dirname,'src/index.js')],bundle:true,loader:{'.jpg':'dataurl'},minify:true,format:'iife',target:['es2020'],write:false,legalComments:'inline'});
const threeLicense=fs.readFileSync(path.join(__dirname,'node_modules/three/LICENSE'),'utf8');
// Shader template literals retain upstream indentation; normalize only insignificant
// trailing whitespace and spaces before tabs so generated diffs stay clean.
const script=('/* Three.js license\n'+threeLicense+'\n*/\n'+result.outputFiles[0].text)
  .replace(/[ \t]+$/gm,'').replace(/^ +(?=\t)/gm,'')
  .replace(/<\/script/gi,'<\\/script');
const css=['motion.css','palette.css','exhibition.css'].map(name=>fs.readFileSync(path.join(__dirname,'src',name),'utf8')).join('\n');
const file=path.join(root,'dist/index.html');let html=fs.readFileSync(file,'utf8');
const block='<!-- signallab-motion:start -->\n<style>'+css+'</style>\n<script data-motion-bundle>\n'+script+'\n</script>\n<!-- signallab-motion:end -->';
if(html.includes('<!-- signallab-motion:start -->'))html=html.replace(/<!-- signallab-motion:start -->[\s\S]*?<!-- signallab-motion:end -->/,()=>block);
else html=html.replace('<script>\n\'use strict\';',()=>block+'\n<script>\n\'use strict\';');
fs.writeFileSync(file,html);
console.log('Embedded self-contained motion bundle: '+Math.round(Buffer.byteLength(script)/1024)+' KB. No runtime downloads.');
