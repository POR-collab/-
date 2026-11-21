// Shared helpers for all Pixel Love pages
const THEMES = { pink:'#f5d0d0', sky:'#cfe3f5', grape:'#e0d0f5', mint:'#cff5e3', night:'#2a2340' };
const $ = id => document.getElementById(id);
const hasThai = s => /[฀-๿]/.test(s || '');
const setText = (el, s) => { el.textContent = s; el.classList.toggle('thai', hasThai(s)); };

function encode(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function decode(str) {
  try {
    const bin = atob(str.replace(/-/g,'+').replace(/_/g,'/'));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
  } catch { return null; }
}
function hashData() { return location.hash.length > 1 ? decode(location.hash.slice(1)) : null; }
function shareLink(obj) { return location.origin + location.pathname + '#' + encode(obj); }

function setTheme(t) { document.body.dataset.theme = THEMES[t] ? t : 'pink'; }
function themePicker(container, initial, onPick) {
  let cur = initial;
  Object.entries(THEMES).forEach(([name, color]) => {
    const s = document.createElement('div');
    s.className = 'swatch' + (name === cur ? ' on' : '');
    s.style.background = color; s.title = name;
    s.onclick = () => {
      cur = name; setTheme(name); onPick(name);
      container.querySelectorAll('.swatch').forEach(x => x.classList.toggle('on', x === s));
    };
    container.appendChild(s);
  });
}

function floatingHearts(n = 25) {
  const bg = document.createElement('div'); bg.className = 'heart-bg';
  const hearts = ['♥','❤','💕','💗','💖','💝','💘'];
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.textContent = hearts[i % hearts.length];
    s.style.left = Math.random()*100 + 'vw';
    s.style.animationDuration = (6 + Math.random()*8) + 's';
    s.style.animationDelay = (Math.random()*8) + 's';
    s.style.fontSize = (10 + Math.random()*14) + 'px';
    bg.appendChild(s);
  }
  document.body.prepend(bg);
}

function confetti() {
  const colors = ['#ff6b9d','#ffd700','#ff4444','#a0e4ff','#b5ead7','#ffb347'];
  for (let i = 0; i < 70; i++) setTimeout(() => {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random()*100 + 'vw';
    el.style.background = colors[i % colors.length];
    el.style.animationDuration = (1.5 + Math.random()*2) + 's';
    if (Math.random() > .5) el.style.borderRadius = '50%';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }, i*35);
}

let _ctx = null;
function blip(freq, dur = 0.12) {
  try {
    _ctx = _ctx || new (window.AudioContext || window.webkitAudioContext)();
    const o = _ctx.createOscillator(), g = _ctx.createGain();
    o.type = 'square'; o.frequency.value = freq; g.gain.value = 0.05;
    g.gain.exponentialRampToValueAtTime(0.001, _ctx.currentTime + dur);
    o.connect(g).connect(_ctx.destination); o.start(); o.stop(_ctx.currentTime + dur);
  } catch {}
}

async function copyText(text, toastEl, msg = 'คัดลอกแล้ว! ส่งให้คนพิเศษได้เลย 💕') {
  try { await navigator.clipboard.writeText(text); }
  catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
  if (toastEl) toastEl.textContent = msg;
}

// Wire a standard "make link" share box: #shareBox, #shareUrl, #copyBtn, #nativeShare, #toast
function wireShare(getData) {
  $('shareBox').style.display = 'flex';
  $('shareUrl').value = shareLink(getData());
  $('toast').textContent = '';
  $('copyBtn').onclick = () => copyText($('shareUrl').value, $('toast'));
  $('nativeShare').onclick = () => navigator.share
    ? navigator.share({ title: '💌', url: $('shareUrl').value }).catch(() => {})
    : $('copyBtn').click();
}
