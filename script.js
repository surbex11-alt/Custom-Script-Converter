const romanInput = document.getElementById("romanInput");
const scriptOutput = document.getElementById("scriptOutput");
const scriptInput = document.getElementById("scriptInput");
const romanOutput = document.getElementById("romanOutput");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const toCustom = {};
const toRoman = {};

[...alphabet].forEach((ch, i) => {
  const custom = String.fromCodePoint(0xE000 + i);
  toCustom[ch] = custom;
  toRoman[custom] = ch;
});

function encode(text) {
  return [...text].map(ch => {
    const upper = ch.toUpperCase();
    return toCustom[upper] || ch;
  }).join("");
}

function decode(text) {
  return [...text].map(ch => toRoman[ch] || ch).join("");
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
