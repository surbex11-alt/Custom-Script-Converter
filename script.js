const romanInput=document.getElementById("romanInput"),scriptOutput=document.getElementById("scriptOutput"),customInput=document.getElementById("customInput"),romanOutput=document.getElementById("romanOutput");
const letters=[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],digits=[..."0123456789"],chars=[...letters,...digits];
const glyphMap=Object.freeze(Object.fromEntries(chars.map((c,i)=>[c,String.fromCharCode(0xE000+i)])));
const reverseMap=Object.freeze(Object.fromEntries(Object.entries(glyphMap).map(([a,b])=>[b,a])));
function encode(text){return [...text].map(c=>glyphMap[c.toUpperCase()]||c).join("")}
function decode(text){return [...text].map(c=>reverseMap[c]||c).join("")}
function copyText(v){navigator.clipboard?.writeText(v);}

function updateConvert(){const out=encode(romanInput.value);scriptOutput.textContent=out;customInput.value=out;romanOutput.textContent=decode(customInput.value)}
romanInput.addEventListener("input",updateConvert);customInput.addEventListener("input",()=>romanOutput.textContent=decode(customInput.value));
document.getElementById("copyCustom").onclick=()=>copyText(scriptOutput.textContent);
document.getElementById("copyRoman").onclick=()=>copyText(romanOutput.textContent);
document.getElementById("clearRoman").onclick=()=>{romanInput.value="";updateConvert()};
document.getElementById("clearCustom").onclick=()=>{customInput.value="";romanOutput.textContent=""};

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.getElementById(b.dataset.tab).classList.add("active")});

const livePreview=document.getElementById("livePreview");
document.getElementById("fontSize").oninput=e=>livePreview.style.fontSize=e.target.value+"px";
document.getElementById("letterSpacing").oninput=e=>livePreview.style.letterSpacing=e.target.value+"px";
document.fonts?.ready.then(()=>document.getElementById("fontStatus").textContent="TTF ready").catch(()=>document.getElementById("fontStatus").textContent="Font check unavailable");

const keyboardOutput=document.getElementById("keyboardOutput");
document.getElementById("keyboardGrid").innerHTML=chars.map(c=>'<button type="button" data-key="'+c+'">'+c+'</button>').join("");
document.querySelectorAll("#keyboardGrid button").forEach(b=>b.onclick=()=>keyboardOutput.textContent+=glyphMap[b.dataset.key]);
document.getElementById("keyboardBackspace").onclick=()=>keyboardOutput.textContent=[...keyboardOutput.textContent].slice(0,-1).join("");
document.getElementById("keyboardSpace").onclick=()=>keyboardOutput.textContent+=" ";
document.getElementById("keyboardClear").onclick=()=>keyboardOutput.textContent="";
document.getElementById("copyKeyboard").onclick=()=>copyText(keyboardOutput.textContent);

const alphabetGrid=document.getElementById("alphabetGrid");
alphabetGrid.innerHTML=chars.map(c=>'<div class="alphabetItem"><div class="alphabetGlyph">'+glyphMap[c]+'</div><strong>'+c+'</strong><small>U+'+glyphMap[c].codePointAt(0).toString(16).toUpperCase().padStart(4,"0")+'</small></div>').join("");

const presets=JSON.parse(localStorage.getItem("asadGlyphPresets")||"{}");
let selected="A";
const selector=document.getElementById("glyphSelector");
selector.innerHTML=chars.map(c=>'<button type="button" data-glyph="'+c+'" title="'+c+'">'+glyphMap[c]+'</button>').join("");
const inputs={scaleX:document.getElementById("scaleX"),scaleY:document.getElementById("scaleY"),rotate:document.getElementById("glyphRotate"),x:document.getElementById("offsetX"),y:document.getElementById("offsetY")};
function applyPreset(){const p=presets[selected]||{sx:1,sy:1,r:0,x:0,y:0};inputs.scaleX.value=p.sx;inputs.scaleY.value=p.sy;inputs.rotate.value=p.r;inputs.x.value=p.x;inputs.y.value=p.y;renderGlyph()}
function renderGlyph(){const el=document.getElementById("glyphPreview");el.textContent=glyphMap[selected];el.style.transform='translate('+inputs.x.value+'px,'+inputs.y.value+'px) rotate('+inputs.rotate.value+'deg) scale('+inputs.scaleX.value+','+inputs.scaleY.value+')';document.getElementById("glyphInfo").textContent='Glyph: '+selected+'\nCodepoint: U+'+glyphMap[selected].codePointAt(0).toString(16).toUpperCase()+'\nTTF: assets/fonts/Asad_Custom_Script_Alphabet.ttf\nPreset: '+(presets[selected]?'saved':'default')}
selector.querySelectorAll("button").forEach(b=>b.onclick=()=>{selected=b.dataset.glyph;applyPreset()});
Object.values(inputs).forEach(i=>i.oninput=renderGlyph);
document.getElementById("saveGlyph").onclick=()=>{presets[selected]={sx:+inputs.scaleX.value,sy:+inputs.scaleY.value,r:+inputs.rotate.value,x:+inputs.x.value,y:+inputs.y.value};localStorage.setItem("asadGlyphPresets",JSON.stringify(presets));renderGlyph()};
document.getElementById("resetGlyph").onclick=()=>{delete presets[selected];localStorage.setItem("asadGlyphPresets",JSON.stringify(presets));applyPreset()};
document.getElementById("exportPresets").onclick=()=>{const blob=new Blob([JSON.stringify(presets,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="asad-custom-glyph-presets.json";a.click();URL.revokeObjectURL(a.href)};
document.getElementById("importPresets").onclick=()=>document.getElementById("presetFile").click();
document.getElementById("presetFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{Object.assign(presets,JSON.parse(r.result));localStorage.setItem("asadGlyphPresets",JSON.stringify(presets));applyPreset()}catch{} };r.readAsText(f)};
applyPreset();

const printInput=document.getElementById("printInput"),printCanvas=document.getElementById("printCanvas"),rotation=document.getElementById("rotation"),printSize=document.getElementById("printSize");
function updatePrint(){printCanvas.textContent=encode(printInput.value);printCanvas.style.transform='rotate('+rotation.value+'deg)';printCanvas.style.fontSize=printSize.value+'px'}
[printInput,rotation,printSize].forEach(x=>x.addEventListener("input",updatePrint));
document.getElementById("printButton").onclick=()=>window.print();
document.getElementById("resetRotation").onclick=()=>{rotation.value=0;updatePrint()};
updateConvert();updatePrint();