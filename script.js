const romanInput = document.getElementById("romanInput");
const scriptOutput = document.getElementById("scriptOutput");
const scriptInput = document.getElementById("scriptInput");
const romanOutput = document.getElementById("romanOutput");

/*
  Glyph map for Asad_Custom_Script_Alphabet.ttf.
  The font's vector glyphs are mapped directly to ASCII:
  A-Z => U+0041..U+005A
  0-9 => U+0030..U+0039
*/
const glyphMap = Object.freeze({
  A:"A", B:"B", C:"C", D:"D", E:"E", F:"F", G:"G",
  H:"H", I:"I", J:"J", K:"K", L:"L", M:"M", N:"N",
  O:"O", P:"P", Q:"Q", R:"R", S:"S", T:"T", U:"U",
  V:"V", W:"W", X:"X", Y:"Y", Z:"Z",
  0:"0", 1:"1", 2:"2", 3:"3", 4:"4",
  5:"5", 6:"6", 7:"7", 8:"8", 9:"9"
});

const reverseGlyphMap = Object.freeze(
  Object.fromEntries(Object.entries(glyphMap).map(([roman, custom]) => [custom, roman]))
);

function encode(text) {
  return [...text].map(ch => {
    const upper = ch.toUpperCase();
    return glyphMap[upper] || ch;
  }).join("");
}

function decode(text) {
  return [...text].map(ch => reverseGlyphMap[ch] || ch).join("");
}

function updateForward() {
  scriptOutput.textContent = encode(romanInput.value);
  scriptInput.value = scriptOutput.textContent;
  updateReverse();
}

function updateReverse() {
  romanOutput.textContent = decode(scriptInput.value);
}

romanInput.addEventListener("input", updateForward);
scriptInput.addEventListener("input", updateReverse);

document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const el = document.getElementById(btn.dataset.copy);
    const value = el.value !== undefined ? el.value : el.textContent;
    await navigator.clipboard.writeText(value);
    const old = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => btn.textContent = old, 1000);
  });
});

document.querySelectorAll("[data-clear]").forEach(btn => {
  btn.addEventListener("click", () => {
    const el = document.getElementById(btn.dataset.clear);
    el.value = "";
    if (el === romanInput) updateForward();
    if (el === scriptInput) updateReverse();
  });
});

updateForward();
