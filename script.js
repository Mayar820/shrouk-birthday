/* =====================================================================
   EDIT YOUR CONTENT HERE  (everything on the site comes from this block)
   ===================================================================== */
const CONFIG = {
  code: "1611",                       // lock-screen code (16 / 11 = her birthday, DDMM)

  reasons: [
    { t: "Your beautiful heart",      d: "You love with your whole heart, and everyone around you can feel it. Being loved by you is a gift." },
    { t: "Your smile",                d: "One smile from you can fix my worst day. I'd cross any distance just to see it in person." },
    { t: "Every single day together", d: "We used to see each other every day, and those days are some of my favorite memories ever." },
    { t: "You're my safe place",      d: "I can tell you anything, the silly stuff and the heavy stuff, and I always feel lighter after." },
    { t: "Your laugh",                d: "It's loud in the best way, it's contagious, and I miss hearing it right next to me." },
    { t: "Your strength",             d: "You carry so much with so much grace. You're stronger than you know, and I'm so proud of you." },
    { t: "Your advice",               d: "Honest, kind and always on my side. You somehow always know exactly what to say." },
    { t: "Your queen energy",         d: "Elegant, classy and a little dramatic (in the best way). You walk into a room and it gets brighter." },
    { t: "Distance can't change us",  d: "Different paths, same hearts. Distance means so little when someone means so much." },
    { t: "Our future together",       d: "Your own apartment, so much success, and next year's birthday celebrated side by side. I can't wait." }
  ],

  // photos live in media/photos/  (pos = which part of the photo to keep centred)
  photos: [
    { src: "media/photos/photo1.jpg", cap: "Main character energy ✨", pos: "50% 28%", r: -3 },
    { src: "media/photos/photo2.jpg", cap: "Bench buddies 💜",          pos: "35% 40%", r: 2.5 },
    { src: "media/photos/photo3.jpg", cap: "Thumbs up, always 👍",      pos: "50% 40%", r: -2 },
    { src: "media/photos/photo4.jpg", cap: "Night out with my girl 🌙", pos: "40% 40%", r: 3 },
    { src: "media/photos/photo5.jpg", cap: "Graduation day 🎓",         pos: "55% 35%", r: -2.5 },
    { src: "media/photos/photo6.jpg", cap: "Posing like queens 👑",     pos: "55% 40%", r: 2 },
    { src: "media/photos/photo7.jpg", cap: "Crown on, queen 👑",        pos: "50% 40%", r: -3 },
    { src: "media/photos/photo8.jpg", cap: "Hugs for days 🤍",          pos: "50% 45%", r: 2.5 }
  ],

  // songs / audio live in media/audio/  (add more by copying a line)
  tracks: [
    { title: "A little voice note",    artist: "From your bestie 💜", src: "media/audio/track1.m4a", cover: "media/photos/photo4.jpg", pos: "40% 40%", dur: "0:24" },
    { title: "Our memories, out loud", artist: "For my queen 👑",     src: "media/audio/track2.m4a", cover: "media/photos/photo7.jpg", pos: "50% 30%", dur: "0:14" }
  ],

  // the letter. Keep the salutation as it is; edit the paragraphs freely.
  letter: [
    "Happy birthday to my beautiful girl! 🎂 I really miss you.",
    "Last year, the year before, and the year before that, we were together. This year, all I can do is wish you a happy birthday from far away. We used to see each other every single day; now we've taken different paths that have separated us temporarily (hopefully). But distance means so little when someone means so much, my gorgeous queen.",
    { big: "I DON'T KNOW ABOUT YOU, BUT I'M FEELING 22! 🎉" },
    "Even though you're far away, you hold a very big place in my heart. I wish that next year we celebrate your birthday together.",
    "And baby, I hope all your days are filled with joy, happiness, success, a whole lot of money, and your very own apartment. 🏡💸",
    { sign: "Happy birthday, my queen. I love you. 👑💜" }
  ],

  finale: "Happy birthday, my queen. I love you to the moon and back."
};

/* =====================================================================
   Everything below is the engine. You don't need to touch it.
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const small = () => innerWidth < 700;
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[(Math.random() * a.length) | 0];
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------------- FX: confetti, sparkles, little cakes, petals ---------------- */
const fx = (() => {
  const c = $("#fx"), ctx = c.getContext("2d");
  let W = 0, H = 0, dpr = 1, mode = "lock", last = performance.now(), parts = [];
  const COL = ["#e8c872", "#c9a24b", "#c9b3f0", "#9b7bd8", "#f6c6dc", "#ffffff", "#f4a6c8"];

  const svg = s => { const i = new Image(); i.src = "data:image/svg+xml;utf8," + encodeURIComponent(s); return i; };
  const cakeImgs = [
    svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="9" y="36" width="46" height="20" rx="5" fill="#b59be8"/><rect x="17" y="23" width="30" height="15" rx="4" fill="#f6c6dc"/><path d="M9 42q5.5 7 11.5 0t11.5 0 11.5 0 11.5 0" stroke="#fff" fill="none" stroke-width="3"/><rect x="30.5" y="11" width="3" height="12" fill="#e8c872"/><path d="M32 3c4 4 3 8 0 9-3-1-4-5 0-9z" fill="#ffc94d"/></svg>`),
    svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M14 34h36l-5 22H19z" fill="#c9a24b"/><path d="M16 36h32M18 42h28M20 48h24" stroke="#f4e0a0" stroke-width="1.5"/><path d="M12 34q-3-12 10-13 2-9 11-8t10 8q13 1 9 13z" fill="#f6c6dc"/><circle cx="32" cy="14" r="5" fill="#d9568a"/><path d="M32 9q3-5 7-5" stroke="#4d8a3c" fill="none" stroke-width="2"/></svg>`),
    svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M6 46 L58 46 L58 56 L6 56z" fill="#9a78dc"/><path d="M6 46 L58 46 L50 26 L12 26z" fill="#fde0ee"/><path d="M6 46 q6 6 12 0 t13 0 t13 0 t14 0" stroke="#fff" stroke-width="3.5" fill="none"/><circle cx="32" cy="22" r="5" fill="#d9568a"/><rect x="31" y="8" width="2.6" height="9" fill="#e8c872"/><path d="M32 3c3 3 2 6 0 7-2-1-3-4 0-7z" fill="#ffc94d"/></svg>`)
  ];

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener("resize", resize); resize();

  /* particle factories */
  const confetti = (x, y, burst) => ({
    t: "c", x, y, w: rnd(6, 11), h: rnd(9, 16), rot: rnd(0, 6.28), vr: rnd(-6, 6), col: pick(COL),
    vx: burst ? rnd(-1, 1) * burst : rnd(-14, 14), vy: burst ? rnd(-1.1, -0.2) * burst : rnd(30, 70),
    g: burst ? 700 : 0, drag: burst ? 0.985 : 1, sway: rnd(0, 6.28), life: burst ? 3.2 : 99, amb: !burst
  });
  const sparkle = () => ({ t: "s", x: rnd(0, W), y: rnd(0, H), r: rnd(3, 9), ph: rnd(0, 6.28), sp: rnd(1, 2.6), col: pick(["#e8c872", "#ffffff", "#c9b3f0", "#f4a6c8"]), rot: rnd(0, 1.5) });
  const cake = () => ({ t: "k", img: pick(cakeImgs), x: rnd(0, W), y: H + 60, s: rnd(34, 60), vy: -rnd(14, 30), sway: rnd(0, 6.28), rot: rnd(-.4, .4), a: rnd(.35, .6), amb: true });
  const petal = (x, y, burst) => ({
    t: "p", x: x ?? rnd(0, W), y: y ?? -20, s: rnd(10, 22), rot: rnd(0, 6.28), vr: rnd(-2, 2),
    vx: burst ? rnd(-1, 1) * burst : rnd(-10, 10), vy: burst ? rnd(-1, .1) * burst : rnd(25, 55), g: burst ? 500 : 0, drag: burst ? .985 : 1,
    sway: rnd(0, 6.28), col: pick(["#b39ddb", "#9575cd", "#d1b3f5", "#e3b6e8", "#f4a6c8"]), life: burst ? 3.4 : 99, amb: !burst
  });

  function counts() {
    const m = small();
    if (reduce) return { c: 0, s: 8, k: 0, p: 0 };
    if (mode === "lock") return { c: 0, s: m ? 14 : 24, k: 0, p: m ? 6 : 10 };
    return { c: m ? 16 : 32, s: m ? 22 : 38, k: m ? 4 : 7, p: 0 };
  }
  function maintain() {
    const want = counts(), have = { c: 0, s: 0, k: 0, p: 0 };
    parts.forEach(p => { if (p.t === "s") have.s++; else if (p.amb) have[p.t]++; });
    for (const t of ["c", "s", "k", "p"]) {
      for (let n = have[t]; n < want[t]; n++) {
        const p = t === "c" ? confetti(rnd(0, W), rnd(-H * .2, H)) : t === "s" ? sparkle() : t === "k" ? cake() : petal(rnd(0, W), rnd(-H * .2, H));
        if (t === "k") p.y = rnd(0, H + 60);
        parts.push(p);
      }
      // trim extras after a mode change
      let extra = have[t] - want[t];
      if (extra > 0) parts = parts.filter(p => { if (extra > 0 && ((t === "s" && p.t === "s") || (p.amb && p.t === t))) { extra--; return false; } return true; });
    }
  }

  function star(x, y, r, rot) {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) { const a = rot + i * Math.PI / 4, rr = i % 2 ? r * .22 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
    ctx.closePath(); ctx.fill();
  }
  function petalPath(s) {
    ctx.beginPath(); ctx.moveTo(0, -s); ctx.bezierCurveTo(s * .9, -s * .5, s * .7, s * .7, 0, s); ctx.bezierCurveTo(-s * .7, s * .7, -s * .9, -s * .5, 0, -s); ctx.fill();
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) { last = now; return; }
    const dt = Math.min((now - last) / 1000, .05); last = now;
    ctx.clearRect(0, 0, W, H);
    maintain();
    const tt = now / 1000;
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      if (p.t === "s") {
        const a = (Math.sin(tt * p.sp + p.ph) + 1) / 2;
        ctx.globalAlpha = .15 + a * .85; ctx.fillStyle = p.col; star(p.x, p.y, p.r * (.5 + a * .6), p.rot + tt * .2);
      } else if (p.t === "k") {
        p.y += p.vy * dt; p.x += Math.sin(tt * .6 + p.sway) * 10 * dt;
        if (p.y < -80) { parts.splice(i, 1); continue; }
        ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.rot + Math.sin(tt * .5 + p.sway) * .15);
        try { ctx.drawImage(p.img, -p.s / 2, -p.s / 2, p.s, p.s); } catch (e) {} ctx.restore();
      } else {
        p.vy += p.g * dt; p.vx *= p.drag; p.vy *= p.g ? p.drag : 1;
        p.x += (p.vx + (p.amb ? Math.sin(tt + p.sway) * 14 : 0)) * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
        if (!p.amb) { p.life -= dt; if (p.life <= 0 || p.y > H + 40) { parts.splice(i, 1); continue; } }
        else if (p.y > H + 30) { p.y = -20; p.x = rnd(0, W); }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = p.amb ? (p.t === "c" ? .7 : .55) : Math.min(1, p.life);
        ctx.fillStyle = p.col;
        if (p.t === "c") { ctx.scale(1, Math.cos(tt * 5 + p.sway)); ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
        else petalPath(p.s);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(frame);

  return {
    mode: m => { mode = m; },
    burst(x, y, n = 90, spread = 620) { if (reduce) n = Math.min(n, 24); for (let i = 0; i < n; i++) parts.push(confetti(x, y, spread * rnd(.35, 1))); },
    petals(x, y, n = 40, spread = 420) { for (let i = 0; i < n; i++) parts.push(petal(x, y, spread * rnd(.3, 1))); },
    cannons() {
      const y = H * .78; this.burst(0, y, small() ? 60 : 90, 900); this.burst(W, y, small() ? 60 : 90, 900);
      setTimeout(() => this.burst(W / 2, H * .4, 80, 700), 350);
    }
  };
})();

/* ---------------- Flower wall transition ---------------- */
function makeFlowers() {
  const palette = [["#6f45c0", "#b39ddb"], ["#8a63d2", "#d1b3f5"], ["#a98be0", "#ece0fb"], ["#5b34a8", "#a78bdb"], ["#c69bea", "#f3dcf8"], ["#9575cd", "#e8d9f9"]];
  return palette.map(([a, b], k) => {
    const s = 220, cv = document.createElement("canvas"); cv.width = cv.height = s;
    const x = cv.getContext("2d"), n = 7 + (k % 3) * 2;
    x.translate(s / 2, s / 2);
    for (let layer = 0; layer < 2; layer++) {
      const len = layer ? s * .3 : s * .46, wid = layer ? s * .13 : s * .2;
      for (let i = 0; i < n; i++) {
        x.save(); x.rotate((i / n) * Math.PI * 2 + layer * .35);
        const g = x.createRadialGradient(0, -len * .55, 2, 0, -len * .55, len * .75);
        g.addColorStop(0, layer ? b : a); g.addColorStop(1, layer ? a : b);
        x.fillStyle = g; x.shadowColor = "rgba(40,10,90,.35)"; x.shadowBlur = 8;
        x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(wid, -len * .35, wid * .8, -len * .95, 0, -len); x.bezierCurveTo(-wid * .8, -len * .95, -wid, -len * .35, 0, 0); x.fill(); x.restore();
      }
    }
    const g2 = x.createRadialGradient(0, 0, 1, 0, 0, s * .09);
    g2.addColorStop(0, "#fff3b8"); g2.addColorStop(1, "#c9a24b");
    x.fillStyle = g2; x.beginPath(); x.arc(0, 0, s * .075, 0, 7); x.fill();
    return cv;
  });
}
function bloomWall() {
  return new Promise(res => {
    const c = $("#bloom"), ctx = c.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sprites = makeFlowers(), step = Math.max(70, Math.min(W, H) / 5.2), list = [];
    for (let y = -step / 2; y < H + step; y += step * .78)
      for (let x = -step / 2; x < W + step; x += step * .78)
        list.push({ x: x + rnd(-.3, .3) * step, y: y + rnd(-.3, .3) * step, s: step * rnd(1.3, 1.9), sp: pick(sprites), rot: rnd(0, 6.28), d: 0 });
    const cx = W / 2, cy = H / 2, maxd = Math.hypot(cx, cy);
    list.forEach(f => f.d = (Math.hypot(f.x - cx, f.y - cy) / maxd) * .9 + rnd(0, .25));
    list.sort((a, b) => b.d - a.d);
    const T0 = performance.now(), DUR = 1.0, TOTAL = reduce ? 300 : 2100;
    c.classList.add("on");
    (function draw(now) {
      const t = (now - T0) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#cdb4ee"; ctx.globalAlpha = Math.min(1, t * 2); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      for (const f of list) {
        const k = Math.max(0, Math.min(1, (t - f.d * .7) / DUR));
        if (!k) continue;
        const e = 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2); // easeOutBack
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot + (1 - k) * 1.2); ctx.scale(e, e);
        ctx.drawImage(f.sp, -f.s / 2, -f.s / 2, f.s, f.s); ctx.restore();
      }
      if (now - T0 < TOTAL) requestAnimationFrame(draw);
    })(T0);
    setTimeout(() => res(c), reduce ? 300 : 1700);
  });
}

/* ---------------- Lock screen ---------------- */
(() => {
  const dots = $$("#dots i"), box = $("#dots"), lock = $("#lock");
  let val = "", busy = false;
  const render = () => dots.forEach((d, i) => d.classList.toggle("on", i < val.length));
  async function check() {
    busy = true;
    if (val === CONFIG.code) {
      const r = $("#keypad").getBoundingClientRect();
      fx.petals(r.left + r.width / 2, r.top + r.height / 2, 70, 520);
      await sleep(350);
      const wall = await bloomWall();
      document.body.classList.remove("locked");
      $("#site").hidden = false; window.scrollTo(0, 0);
      lock.classList.add("gone"); fx.mode("party");
      initReveal();
      wall.classList.remove("on");
      await sleep(900); lock.hidden = true;
      fx.cannons();
    } else {
      box.classList.add("bad", "shake"); navigator.vibrate?.(120);
      $("#hint").textContent = "Not quite, my queen. Try again 💜";
      await sleep(600); box.classList.remove("bad", "shake"); val = ""; render(); busy = false;
    }
  }
  function press(k) {
    if (busy || document.body.classList.contains("locked") === false) return;
    if (k === "del") val = val.slice(0, -1);
    else if (val.length < 4) { val += k; }
    render();
    if (k !== "del") bgm.prime();
    if (val.length === 4 && val === CONFIG.code) bgm.start();
    if (k !== "del") { const r = $(`.key[data-k="${k}"]`)?.getBoundingClientRect(); if (r) fx.petals(r.left + r.width / 2, r.top + r.height / 2, 5, 160); }
    if (val.length === 4) setTimeout(check, 180);
  }
  $("#keypad").addEventListener("click", e => { const b = e.target.closest(".key"); if (b) press(b.dataset.k); });
  addEventListener("keydown", e => {
    if (!document.body.classList.contains("locked")) return;
    if (/^\d$/.test(e.key)) press(e.key); else if (e.key === "Backspace") press("del");
  });
})();

/* ---------------- Scroll reveal ---------------- */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  $$(".rv").forEach((el, i) => { if (el.closest(".hero")) el.style.setProperty("--rd", (i * .12) + "s"); io.observe(el); });
}

/* ---------------- Cake ---------------- */
(() => {
  const cake = $("#cake"), wish = $("#wish"), btn = $("#cakeBtn");
  const wishes = ["Make a wish, my queen ✨", "May every wish come true 💜", "22 and absolutely fabulous 👑"];
  btn.addEventListener("click", () => {
    const r = cake.getBoundingClientRect();
    if (!cake.classList.contains("out")) {
      cake.classList.add("out"); fx.burst(r.left + r.width / 2, r.top + r.height * .4, 120, 640);
      wish.textContent = pick(wishes); wish.classList.add("big");
    } else {
      cake.classList.remove("out"); wish.classList.remove("big"); wish.textContent = "Tap the cake to blow out the candles 🕯️";
    }
  });
})();

/* ---------------- 10 reasons ---------------- */
(() => {
  $("#reasonList").innerHTML = CONFIG.reasons.map((r, i) => `
    <div class="reason rv" style="--rd:${(i % 2) * .08}s">
      <button aria-expanded="false"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${r.t}</span><span class="p"></span></button>
      <div class="d"><div><p>${r.d}</p></div></div>
    </div>`).join("");
  $("#reasonList").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const card = b.parentElement, open = card.classList.toggle("open");
    b.setAttribute("aria-expanded", open);
    if (open) { const r = b.getBoundingClientRect(); fx.burst(r.right - 30, r.top + 20, 14, 260); }
  });
})();

/* ---------------- Polaroid wall + lightbox ---------------- */
(() => {
  const wrap = $("#polaroids"), P = CONFIG.photos;
  wrap.innerHTML = P.map((p, i) => `
    <figure class="pol" data-i="${i}" style="--r:${p.r}deg;--sd:${-i * .7}s">
      <img src="${p.src}" alt="${p.cap.replace(/"/g, "")}" loading="lazy" decoding="async" style="object-position:${p.pos}">
      <figcaption>${p.cap}</figcaption>
    </figure>`).join("");

  const step = () => Math.min(wrap.clientWidth * .8, 520);
  $("#wallPrev").onclick = () => wrap.scrollBy({ left: -step(), behavior: "smooth" });
  $("#wallNext").onclick = () => wrap.scrollBy({ left: step(), behavior: "smooth" });

  // mouse-drag scrolling for laptops
  let down = false, sx = 0, sl = 0, moved = 0;
  wrap.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = 0; sx = e.clientX; sl = wrap.scrollLeft; });
  addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); if (moved > 5) wrap.classList.add("drag"); wrap.scrollLeft = sl - dx; });
  addEventListener("pointerup", () => { down = false; wrap.classList.remove("drag"); });

  // lightbox
  const lb = $("#lb"), img = $("#lbImg"), cap = $("#lbCap"); let cur = 0;
  const show = i => { cur = (i + P.length) % P.length; img.src = P[cur].src; img.alt = P[cur].cap; cap.textContent = P[cur].cap; };
  const open = i => { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
  wrap.addEventListener("click", e => { const f = e.target.closest(".pol"); if (f && moved < 6) open(+f.dataset.i); });
  $("#lbX").onclick = close; $("#lbPrev").onclick = () => show(cur - 1); $("#lbNext").onclick = () => show(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
  let tx = 0; lb.addEventListener("touchstart", e => tx = e.touches[0].clientX, { passive: true });
  lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1)); }, { passive: true });
})();

/* ---------------- Videos: smart behaviour ---------------- */
const media = { audio: $("#audio") };
(() => {
  // little cake clips play only while visible (saves battery)
  const auto = $$("video[data-autoplay]");
  const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: .25 });
  auto.forEach(v => io.observe(v));

  // real videos: only one at a time, and they pause the music (and the other way round)
  const vids = $$(".phone video");
  vids.forEach(v => {
    v.addEventListener("play", () => { vids.forEach(o => o !== v && o.pause()); if (!media.audio.paused) { media.audio.pause(); media.resumeAfter = true; } });
    v.addEventListener("ended", () => { if (media.resumeAfter) { media.resumeAfter = false; media.audio.play().catch(() => {}); } });
    v.addEventListener("pause", () => { if (!v.ended && media.resumeAfter && vids.every(o => o.paused)) { media.resumeAfter = false; media.audio.play().catch(() => {}); } });
  });
  media.pauseVideos = () => { vids.forEach(v => v.pause()); media.resumeAfter = false; };
})();

/* ---------------- Letter ---------------- */
(() => {
  const body = $("#letterBody"), paper = $("#paper");
  let html = `<p class="salute">To <bdi dir="rtl" lang="ar">روحي وعقلي وحياتي</bdi> ❤️‍🔥💗🩷😍🥰♥️💖✨</p>`;
  const words = t => t.split(" ").map(w => `<span class="lw">${w}</span>`).join(" ");
  CONFIG.letter.forEach(p => {
    if (typeof p === "string") html += `<p>${words(p)}</p>`;
    else if (p.big) html += `<p class="big">${words(p.big)}</p>`;
    else if (p.sign) html += `<p class="signoff">${words(p.sign)}</p>`;
  });
  body.innerHTML = html;
  let started = false;
  async function type() {
    if (started) return; started = true;
    if (reduce) return paper.classList.add("all");
    for (const w of $$(".lw", body)) { if (paper.classList.contains("all")) break; if (w.closest(".big")) bgm.play22(); w.classList.add("on"); await sleep(w.textContent.length > 7 ? 95 : 70); }
    fx.burst(innerWidth / 2, innerHeight * .5, 40, 420);
  }
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { type(); o.disconnect(); } }, { threshold: .3 }).observe(paper);
  const all = () => paper.classList.add("all");
  new IntersectionObserver(es => { if (es[0].isIntersecting && started && paper.classList.contains("all")) bgm.play22(); }, { threshold: .8 }).observe($(".big", body));
  paper.addEventListener("click", all); paper.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") all(); });
})();

/* ---------------- Songs + mini player ---------------- */
(() => {
  const T = CONFIG.tracks, audio = media.audio, list = $("#trackList"), pl = $("#player");
  const saved = new Set(); let cur = -1;
  list.innerHTML = T.map((t, i) => `
    <article class="track rv" data-i="${i}" style="--rd:${i * .1}s">
      <img class="cv" src="${t.cover}" alt="" loading="lazy" style="object-position:${t.pos || "50% 50%"}">
      <div class="meta">
        <h3>${t.title}</h3><p class="ar">${t.artist}</p>
        <div class="row"><span class="pill">PLAY</span><button class="save" data-save="${i}" aria-label="Save">♡ <small>Save</small></button><span class="eq"><i></i><i></i><i></i></span><small>${t.dur || ""}</small></div>
      </div>
      <button class="play" data-play="${i}" aria-label="Play ${t.title}">▶</button>
    </article>`).join("");

  function ui() {
    const playing = !audio.paused;
    $$(".track").forEach((el, i) => { el.classList.toggle("playing", i === cur && playing); $(".play", el).textContent = i === cur && playing ? "❚❚" : "▶"; });
    $("#pPlay").textContent = playing ? "❚❚" : "▶"; $("#pPlay").style.paddingLeft = playing ? "0" : "2px";
  }
  function load(i) {
    cur = (i + T.length) % T.length; const t = T[cur];
    audio.src = t.src; $("#pCover").src = t.cover; $("#pCover").style.objectPosition = t.pos || "center";
    $("#pTitle").textContent = t.title; $("#pArtist").textContent = t.artist; $("#pFill").style.width = "0%";
  }
  function play(i) {
    media.pauseVideos?.();
    if (i !== cur) load(i);
    pl.classList.add("show"); audio.play().catch(() => {}); ui();
  }
  list.addEventListener("click", e => {
    const p = e.target.closest("[data-play]"), s = e.target.closest("[data-save]");
    if (p) { const i = +p.dataset.play; if (i === cur && !audio.paused) audio.pause(); else play(i); }
    if (s) { const i = +s.dataset.save; saved.has(i) ? saved.delete(i) : saved.add(i); s.classList.toggle("on", saved.has(i)); s.firstChild.textContent = saved.has(i) ? "♥ " : "♡ "; if (saved.has(i)) { const r = s.getBoundingClientRect(); fx.petals(r.left, r.top, 10, 200); } }
  });
  $("#pPlay").onclick = () => { if (cur < 0) return play(0); audio.paused ? (media.pauseVideos(), audio.play()) : audio.pause(); };
  $("#pPrev").onclick = () => play(cur - 1); $("#pNext").onclick = () => play(cur + 1);
  $("#pClose").onclick = () => { audio.pause(); pl.classList.remove("show"); };
  ["play", "pause", "ended"].forEach(ev => audio.addEventListener(ev, ui));
  audio.addEventListener("ended", () => play(cur + 1));
  audio.addEventListener("timeupdate", () => { if (audio.duration) $("#pFill").style.width = (audio.currentTime / audio.duration * 100) + "%"; });
  const seek = e => { const r = $("#pBar").getBoundingClientRect(); if (audio.duration) audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration; };
  $("#pBar").addEventListener("pointerdown", e => { seek(e); const mv = ev => seek(ev), up = () => { removeEventListener("pointermove", mv); removeEventListener("pointerup", up); }; addEventListener("pointermove", mv); addEventListener("pointerup", up); });
})();

/* ---------------- Finale ---------------- */
(() => {
  const el = $("#finaleText"), after = $("#finaleAfter"); let started = false;
  async function type() {
    if (started) return; started = true;
    if (reduce) el.textContent = CONFIG.finale;
    else for (const ch of CONFIG.finale) { el.textContent += ch; await sleep(ch === "," || ch === "." ? 280 : 62); }
    el.classList.add("done"); after.classList.add("show"); fx.cannons();
  }
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { type(); o.disconnect(); } }, { threshold: .5 }).observe($("#finale"));
  $("#celebrate").onclick = () => fx.cannons();
  $("#toTop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
})();

/* ---------------- Background music + "feeling 22" clip ---------------- */
const bgm = (() => {
  const m = $("#bgm"), s22 = $("#sfx22"), btn = $("#musicBtn"), main = media.audio, vids = $$(".phone video");
  const VOL = .32; let wanted = false, started = false, played22 = false, fade = null;
  m.volume = 0;
  const busy = () => !main.paused || vids.some(v => !v.paused) || !s22.paused;
  function ramp(to, ms = 900, done) {
    clearInterval(fade); const from = m.volume, t0 = performance.now();
    fade = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms); m.volume = from + (to - from) * k;
      if (k === 1) { clearInterval(fade); done && done(); }
    }, 50);
  }
  function sync() {
    const go = wanted && !busy();
    if (go) { if (m.paused) m.play().catch(() => {}); ramp(VOL); }
    else if (!m.paused) ramp(0, 500, () => { if (!(wanted && !busy())) m.pause(); });
    btn.classList.toggle("on", wanted); btn.setAttribute("aria-pressed", wanted);
  }
  [main, s22, ...vids].forEach(el => ["play", "pause", "ended"].forEach(ev => el.addEventListener(ev, sync)));
  btn.addEventListener("click", () => { wanted = !wanted; sync(); });
  return {
    // iOS only lets media start from a tap, so warm both files up on the very first key press
    prime() {
      if (started) return; started = true;
      s22.muted = true; s22.play().then(() => { s22.pause(); s22.currentTime = 0; s22.muted = false; }).catch(() => { s22.muted = false; });
    },
    start() { wanted = true; m.volume = 0; m.play().catch(() => {}); btn.hidden = false; setTimeout(sync, 1200); },
    play22() {
      if (played22) return; played22 = true;
      media.pauseVideos?.(); if (!main.paused) main.pause();
      s22.currentTime = 0; s22.volume = 1; s22.play().catch(() => {});
    }
  };
})();
