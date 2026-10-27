/* =====================================================================
   मधु एवं अभिषेक — शुभ सगाई समारोह  |  Royal Digital Invitation
   script.js  (vanilla JavaScript + Three.js loaded from CDN)
   ===================================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------------------
     0. Small helpers
  ------------------------------------------------------------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const show = (el) => el && el.removeAttribute('hidden');
  const hide = (el) => el && el.setAttribute('hidden', '');

  /* -------------------------------------------------------------------
     1. Icons (inline Lucide-style SVG paths) + Ganesh / Diya / Divider
  ------------------------------------------------------------------- */
  const ICONS = {
    'sparkles': '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'menu': '<path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    'user-check': '<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    'navigation': '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    'share-2': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    'calendar-plus': '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="M16 19h6"/><path d="M19 16v6"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'zoom-in': '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
    'zoom-out': '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'music': '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    'volume-2': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    'volume-x': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
    'play': '<polygon points="6 3 20 12 6 21 6 3"/>',
    'pause': '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>'
  };

  function iconSVG(name, size, cls) {
    return (
      '<svg class="icon ' + (cls || '') + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + size +
      '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] + '</svg>'
    );
  }

  function ganeshSVG(size) {
    return (
      '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="50" cy="48" r="42" stroke="url(#goldGaneshGrad)" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.6"/>' +
      '<circle cx="50" cy="48" r="38" stroke="url(#goldGaneshGrad)" stroke-width="0.8" opacity="0.4"/>' +
      '<path d="M38 28 L50 14 L62 28 L56 31 L50 25 L44 31 Z" fill="url(#goldGaneshGrad)" stroke="#510712" stroke-width="0.5"/>' +
      '<circle cx="50" cy="18" r="1.5" fill="#FFF7E7"/>' +
      '<path d="M42 27 L58 27" stroke="url(#goldGaneshGrad)" stroke-width="1.5"/>' +
      '<path d="M35 34 C24 34 22 45 27 52 C31 58 37 56 37 56" stroke="url(#goldGaneshGrad)" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M65 34 C76 34 78 45 73 52 C69 58 63 56 63 56" stroke="url(#goldGaneshGrad)" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M40 33 C45 31 55 31 60 33 C64 39 64 48 59 52 C54 55 46 55 41 52 C36 48 36 39 40 33 Z" fill="url(#goldGaneshGrad)" opacity="0.25"/>' +
      '<path d="M47 33 Q50 37 50 42 Q50 37 53 33" stroke="url(#goldGaneshGrad)" stroke-width="1.8" stroke-linecap="round"/>' +
      '<circle cx="50" cy="35" r="1.2" fill="#E11D48"/>' +
      '<ellipse cx="43" cy="39" rx="1.8" ry="1" fill="#35030C"/>' +
      '<ellipse cx="57" cy="39" rx="1.8" ry="1" fill="#35030C"/>' +
      '<path d="M50 42 C49 48 46 56 46 63 C46 69 51 72 55 72 C58 72 61 70 61 67 C61 64 57 63 55 65" stroke="url(#goldGaneshGrad)" stroke-width="3.2" stroke-linecap="round"/>' +
      '<circle cx="68" cy="58" r="3" fill="url(#goldGaneshGrad)"/>' +
      '<path d="M68 55 L70 58 L66 58 Z" fill="#FFF7E7"/>' +
      '<path d="M32 50 C29 48 27 52 28 55 C29 57 32 57 34 54 Z" fill="url(#goldGaneshGrad)"/>' +
      '<path d="M45 49 L42 52" stroke="#FFF7E7" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M45 83 C45 80 48 78 51 80 C54 82 54 86 51 88 C48 90 44 88 44 85" stroke="url(#goldGaneshGrad)" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>' +
      '<path d="M51 84 C54 84 57 82 58 79" stroke="url(#goldGaneshGrad)" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>' +
      '<path d="M52 77 Q55 76 57 77" stroke="url(#goldGaneshGrad)" stroke-width="1" opacity="0.8"/>' +
      '<circle cx="56" cy="74" r="0.8" fill="url(#goldGaneshGrad)"/>' +
      '</svg>'
    );
  }

  function diyaSVG() {
    return (
      '<svg viewBox="0 0 40 40" fill="none">' +
      '<path class="diya-flame" d="M20 5 C20 5 15 13 15 17 C15 20 17.5 22 20 22 C22.5 22 25 20 25 17 C25 13 20 5 20 5 Z" fill="#F59E0B"/>' +
      '<path class="diya-flame" d="M20 9 C20 9 17 14 17 17 C17 19 18.5 20.5 20 20.5 C21.5 20.5 23 19 23 17 C23 14 20 9 20 9 Z" fill="#FEF08A"/>' +
      '<path d="M8 21 C12 28 28 28 32 21 C33 24 31 29 20 29 C9 29 7 24 8 21 Z" fill="url(#goldDiyaGrad)"/>' +
      '<ellipse cx="20" cy="21" rx="12" ry="2.5" fill="#78350F"/>' +
      '<path d="M17 29 L15 34 L25 34 L23 29 Z" fill="url(#goldDiyaGrad)"/>' +
      '</svg>'
    );
  }

  function dividerHTML(text) {
    return (
      '<div class="line l"></div><span class="dia">❖</span>' +
      (text ? '<span class="mid txt">' + text + '</span>' : '<span class="mid">✦ ॐ ✦</span>') +
      '<span class="dia">❖</span><div class="line r"></div>'
    );
  }

  function hydrate() {
    $$('[data-ganesh]').forEach((el) => { el.innerHTML = ganeshSVG(el.dataset.ganesh); });
    $$('[data-diya]').forEach((el) => { el.innerHTML = diyaSVG(); });
    $$('[data-divider]').forEach((el) => { el.innerHTML = dividerHTML(el.dataset.text); });
    $$('i[data-icon]').forEach((el) => {
      const tpl = document.createElement('template');
      tpl.innerHTML = iconSVG(el.dataset.icon, el.dataset.size || 16, el.className);
      el.replaceWith(tpl.content.firstChild);
    });
  }

  /* -------------------------------------------------------------------
     2. Fireworks (2D canvas)
  ------------------------------------------------------------------- */
  const Fireworks = (function () {
    const canvas = $('#fireworks');
    const ctx = canvas.getContext('2d');
    const COLORS = ['#F7E6B0', '#D6B56D', '#FFD700', '#FFA07A', '#FFF7E7', '#F59E0B', '#FB7185'];

    let rockets = [];
    let particles = [];
    let rafId = null;
    let timers = [];
    let stopTimer = null;
    let state = { active: false, intensity: 'high' };
    let lastLaunch = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function burst(x, y, color) {
      const n = state.intensity === 'high' ? 85 : state.intensity === 'medium' ? 50 : 30;
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 5 + 1.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          color: Math.random() > 0.3 ? color : COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 2.5 + 1.2,
          flicker: Math.random() > 0.5
        });
      }
    }

    function launch(startX) {
      const w = canvas.width, h = canvas.height;
      const x = startX !== undefined ? startX : (Math.random() > 0.5 ? Math.random() * (w * 0.35) : w * 0.65 + Math.random() * (w * 0.35));
      const targetY = h * (0.15 + Math.random() * 0.35);
      const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 3 + 11;
      rockets.push({
        x, y: h,
        vx: Math.cos(angle) * (speed * 0.3) * (x < w / 2 ? 1 : -1),
        vy: -Math.abs(Math.sin(angle) * speed),
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: []
      });
    }

    function frame() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      const now = Date.now();
      const interval = state.intensity === 'high' ? 850 : state.intensity === 'medium' ? 1400 : 2400;
      if (state.active && now - lastLaunch > interval) {
        launch();
        if (Math.random() > 0.6 && state.intensity === 'high') timers.push(setTimeout(() => launch(), 200));
        lastLaunch = now;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (t / r.trail.length) * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(254, 240, 138, ' + (t / r.trail.length) * 0.7 + ')';
          ctx.fill();
        }
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.08;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= -1) {
          burst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const a = p.flicker && Math.random() > 0.4 ? p.alpha * 0.6 : p.alpha;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, a);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(frame);
    }

    function configure(active, intensity) {
      // Re-initialise, like a fresh effect run
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      timers.forEach(clearTimeout);
      timers = [];
      clearTimeout(stopTimer);
      rockets = [];
      particles = [];
      state = { active: active, intensity: intensity || 'high' };
      canvas.style.opacity = active ? '1' : '0';
      lastLaunch = Date.now();

      if (active) {
        timers.push(setTimeout(() => launch(canvas.width * 0.2), 100));
        timers.push(setTimeout(() => launch(canvas.width * 0.8), 350));
        timers.push(setTimeout(() => launch(canvas.width * 0.5), 700));
        frame();
      } else {
        // let the canvas fade out, then stop drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    return { configure: configure };
  })();

  /* -------------------------------------------------------------------
     3. Floating balloons
  ------------------------------------------------------------------- */
  const Balloons = (function () {
    const box = $('#balloons');
    const COLORS = ['#D6B56D', '#F7E6B0', '#800020', '#A0153E', '#D4AF37', '#F59E0B'];
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      duration: 7 + Math.random() * 5,
      delay: Math.random() * 2.5,
      size: 38 + Math.random() * 24,
      color: COLORS[i % COLORS.length]
    }));

    function render() {
      box.innerHTML = items.map((b) =>
        '<div class="balloon" style="left:' + b.left + '%;animation:balloonFloatUp ' + b.duration + 's cubic-bezier(0.25,0.46,0.45,0.94) ' + b.delay + 's infinite">' +
          '<div class="balloon-inner" style="animation:balloonSway ' + (3 + (b.id % 3)) + 's ease-in-out infinite alternate">' +
            '<svg width="' + b.size + '" height="' + (b.size * 1.25) + '" viewBox="0 0 50 65" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<defs><radialGradient id="balloonGrad-' + b.id + '" cx="35%" cy="30%" r="65%">' +
                '<stop offset="0%" stop-color="#FFF" stop-opacity="0.8"/>' +
                '<stop offset="35%" stop-color="' + b.color + '"/>' +
                '<stop offset="100%" stop-color="#1E0206"/></radialGradient></defs>' +
              '<ellipse cx="25" cy="27" rx="22" ry="26" fill="url(#balloonGrad-' + b.id + ')"/>' +
              '<polygon points="25,53 21,58 29,58" fill="' + b.color + '"/>' +
              '<path d="M25,58 Q22,65 25,72 T27,82" stroke="rgba(247,230,176,0.6)" stroke-width="1.2" fill="none"/>' +
            '</svg>' +
          '</div>' +
        '</div>'
      ).join('');
    }

    return {
      set: function (active) {
        if (active) { render(); show(box); }
        else { hide(box); box.innerHTML = ''; }
      }
    };
  })();

  /* -------------------------------------------------------------------
     4. Music player (mp3 if present, otherwise procedural shehnai/tanpura)
  ------------------------------------------------------------------- */
  const Music = (function () {
    const audio = $('#bg-audio');
    const pill = $('#audio-pill');
    const playBtn = $('#audio-play');
    const playIc = $('#audio-play-ic');
    const extra = $('#audio-extra');
    const label = $('#audio-label');
    const labelText = $('#audio-label-text');
    const muteBtn = $('#audio-mute');
    const muteIc = $('#audio-mute-ic');
    const toggleBtn = $('#audio-toggle');

    let isPlaying = false;
    let isMuted = false;
    let usingSynth = false;
    let expanded = false;

    let ctx = null;
    let master = null;
    let synthBuilt = false;
    let melodyTimer = null;

    function paint() {
      playIc.innerHTML = iconSVG(isPlaying ? 'pause' : 'play', 18);
      playIc.className = 'ic ' + (isPlaying ? 'pause' : 'play');
      const t = isPlaying ? 'संगीत रोकें' : 'संगीत बजाएं';
      playBtn.setAttribute('aria-label', t);
      playBtn.title = t;
      muteIc.innerHTML = iconSVG(isMuted ? 'volume-x' : 'volume-2', 16);
      muteBtn.setAttribute('aria-label', isMuted ? 'ध्वनि चालू करें' : 'ध्वनि बंद करें');
      labelText.textContent = usingSynth ? 'शहनाई धुन' : 'शाही संगीत';
      label.classList.toggle('playing', isPlaying);
      pill.classList.toggle('expanded', expanded);
      expanded ? show(extra) : hide(extra);
      toggleBtn.textContent = expanded ? '✕' : '♪';
    }

    function ensureCtx() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!ctx) ctx = new AC();
      return ctx;
    }

    function buildSynth() {
      if (synthBuilt) return;
      const c = ensureCtx();
      if (!c) return;
      master = c.createGain();
      master.gain.setValueAtTime(isMuted ? 0 : 0.28, c.currentTime);
      master.connect(c.destination);

      // Tanpura drone: Sa – Pa – Sa
      const droneGain = c.createGain();
      droneGain.gain.setValueAtTime(0.18, c.currentTime);
      droneGain.connect(master);
      [138.59, 207.65, 277.18].forEach((freq) => {
        const osc = c.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, c.currentTime);
        const f = c.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.setValueAtTime(450, c.currentTime);
        osc.connect(f);
        f.connect(droneGain);
        osc.start();
      });

      synthBuilt = true;
    }

    // Raag Yaman / Kalyan notes
    const YAMAN = [277.18, 311.13, 349.23, 391.99, 415.3, 466.16, 523.25, 554.37];

    function playNote() {
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(YAMAN[Math.floor(Math.random() * YAMAN.length)], now);

      const vib = ctx.createOscillator();
      vib.frequency.setValueAtTime(5.2, now);
      const vibGain = ctx.createGain();
      vibGain.gain.setValueAtTime(6.0, now);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start(now);
      vib.stop(now + 2.5);

      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.066, now + 0.4);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + 2.3);
    }

    function startSynth() {
      try {
        buildSynth();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();
        clearInterval(melodyTimer);
        melodyTimer = setInterval(playNote, 1600);
        usingSynth = true;
        isPlaying = true;
      } catch (e) { /* audio blocked / unsupported */ }
      paint();
    }

    function stopSynth() {
      clearInterval(melodyTimer);
      if (ctx && ctx.state === 'running') ctx.suspend();
      isPlaying = false;
      paint();
    }

    function play() {
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => { isPlaying = true; usingSynth = false; paint(); })
         .catch(() => startSynth());   // mp3 missing / blocked → procedural music
      } else {
        startSynth();
      }
    }

    function pause() {
      if (!audio.paused) { audio.pause(); isPlaying = false; }
      if (usingSynth) stopSynth();
      paint();
    }

    function toggleMute() {
      isMuted = !isMuted;
      audio.muted = isMuted;
      if (master && ctx) master.gain.setValueAtTime(isMuted ? 0 : 0.28, ctx.currentTime);
      paint();
    }

    playBtn.addEventListener('click', () => (isPlaying ? pause() : play()));
    muteBtn.addEventListener('click', toggleMute);
    toggleBtn.addEventListener('click', () => { expanded = !expanded; paint(); });
    paint();

    return {
      // Call inside a user gesture so browsers allow audio later
      unlock: function () {
        const c = ensureCtx();
        if (c && c.state === 'suspended') c.resume();
      },
      autoPlay: function () { if (!isPlaying) play(); }
    };
  })();

  /* -------------------------------------------------------------------
     5. Scene controller:  envelope → gate → main
  ------------------------------------------------------------------- */
  const sceneEnvelope = $('#scene-envelope');
  const sceneGate = $('#scene-gate');
  const sceneMain = $('#scene-main');
  const envOpenBtn = $('#env-open');
  const envOpenText = $('#env-open-text');

  let currentScene = 'envelope';
  let isOpening = false;
  let envTimer = null;
  let gateTimers = [];
  let fwStopTimer = null;

  function clearGateTimers() { gateTimers.forEach(clearTimeout); gateTimers = []; }

  function setScene(name) {
    currentScene = name;
    name === 'envelope' ? show(sceneEnvelope) : hide(sceneEnvelope);
    name === 'gate' ? show(sceneGate) : hide(sceneGate);
    name === 'main' ? show(sceneMain) : hide(sceneMain);
  }

  function resetEnvelope() {
    isOpening = false;
    sceneEnvelope.classList.remove('is-opening');
    envOpenBtn.disabled = false;
    envOpenText.textContent = 'निमंत्रण खोलें ✨';
  }

  function handleOpenClick() {
    if (isOpening) return;
    isOpening = true;
    Music.unlock();
    sceneEnvelope.classList.add('is-opening');
    envOpenBtn.disabled = true;
    envOpenText.textContent = 'निमंत्रण खुल रहा है...';
    envTimer = setTimeout(handleEnvelopeOpen, 1800);
  }

  function handleEnvelopeOpen() {
    Music.autoPlay();
    setScene('gate');
    Fireworks.configure(true, 'high');
    Balloons.set(true);
    startGate();
  }

  function startGate() {
    clearGateTimers();
    sceneGate.classList.remove('gate-open');
    gateTimers.push(setTimeout(() => sceneGate.classList.add('gate-open'), 450));
    gateTimers.push(setTimeout(handleGateComplete, 3800));
  }

  function handleGateComplete() {
    clearGateTimers();
    setScene('main');
    Fireworks.configure(true, 'medium');
    clearTimeout(fwStopTimer);
    fwStopTimer = setTimeout(() => Fireworks.configure(false), 4500);
  }

  function handleSkipToDetails() {
    clearTimeout(envTimer);
    clearTimeout(fwStopTimer);
    clearGateTimers();
    Music.unlock();
    Music.autoPlay();
    setScene('main');
    Fireworks.configure(false);
    Balloons.set(false);
    window.scrollTo(0, 0);
  }

  function handleReplay() {
    clearTimeout(envTimer);
    clearTimeout(fwStopTimer);
    clearGateTimers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetEnvelope();
    setScene('envelope');
    Fireworks.configure(false);
    Balloons.set(false);
  }

  envOpenBtn.addEventListener('click', handleOpenClick);
  $('#env-body').addEventListener('click', handleOpenClick);
  $('#env-skip').addEventListener('click', handleSkipToDetails);
  $('#gate-skip').addEventListener('click', handleSkipToDetails);
  $('#btn-replay').addEventListener('click', handleReplay);
  $('#nav-home').addEventListener('click', () => { closeMenu(); handleReplay(); });

  /* -------------------------------------------------------------------
     6. Navigation (smooth scroll + mobile drawer)
  ------------------------------------------------------------------- */
  const drawer = $('#nav-drawer');
  const burgerIc = $('#nav-burger-ic');
  let menuOpen = false;

  function paintMenu() {
    burgerIc.innerHTML = iconSVG(menuOpen ? 'x' : 'menu', 20);
    menuOpen ? show(drawer) : hide(drawer);
  }
  function closeMenu() { menuOpen = false; paintMenu(); }

  $('#nav-burger').addEventListener('click', () => { menuOpen = !menuOpen; paintMenu(); });
  $$('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => {
      closeMenu();
      const el = document.getElementById(btn.dataset.scroll);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
  paintMenu();

  /* -------------------------------------------------------------------
     7. Venue links
  ------------------------------------------------------------------- */
  (function () {
    const venueQuery = encodeURIComponent('श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़');
    $('#btn-maps').href = 'https://www.google.com/maps/search/?api=1&query=' + venueQuery;
    $('#btn-wa').href = 'https://wa.me/919554926547?text=' + encodeURIComponent(
      'सादर प्रणाम, मधु एवं अभिषेक के शुभ सगाई समारोह (26 नवंबर 2026, श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़) के संबंध में जानकारी हेतु संपर्क किया गया है।'
    );
  })();

  /* -------------------------------------------------------------------
     8. Share bar
  ------------------------------------------------------------------- */
  (function () {
    const copyIc = $('#share-copy-ic');
    const copyText = $('#share-copy-text');
    let copied = false;

    const getUrl = () => window.location.href;
    const getTitle = () => 'मधु एवं अभिषेक — शुभ सगाई समारोह निमंत्रण';
    const getText = () =>
      '॥ ॐ श्री गणेशाय नमः ॥\n\nसादर आमंत्रण\nशुभ सगाई समारोह: आयु. कु. मधु दुबे संग चि. अभिषेक तिवारी\n\nदिनांक: 26 नवंबर 2026, समय: शाम 5 बजे\nसमारोह स्थल: श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़\n\nसपरिवार पधारकर वर-वधू को अपना स्नेह एवं आशीर्वाद प्रदान करें।\n\nडिजिटल निमंत्रण पत्रिका लिंक: ' + getUrl();

    function paintCopy() {
      copyIc.innerHTML = copied ? iconSVG('check', 18, 'ok') : iconSVG('copy', 18);
      copyText.textContent = copied ? 'लिंक कॉपी हो गया!' : 'लिंक कॉपी करें';
    }
    paintCopy();

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.remove();
    }

    function copyLink() {
      const done = () => {
        copied = true; paintCopy();
        setTimeout(() => { copied = false; paintCopy(); }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(getUrl()).then(done).catch(() => { fallbackCopy(getUrl()); done(); });
      } else {
        fallbackCopy(getUrl()); done();
      }
    }

    $('#share-copy').addEventListener('click', copyLink);

    $('#share-native').addEventListener('click', async () => {
      if (navigator.share) {
        try { await navigator.share({ title: getTitle(), text: getText(), url: getUrl() }); } catch (e) { /* cancelled */ }
      } else {
        copyLink();
      }
    });

    $('#share-wa').addEventListener('click', () => {
      window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(getText()), '_blank');
    });

    $('#share-cal').addEventListener('click', () => {
      // 26 Nov 2026, 5:00 PM IST → 11:30 UTC (till 10:00 PM IST)
      const title = encodeURIComponent('मधु एवं अभिषेक — शुभ सगाई समारोह');
      const details = encodeURIComponent('शुभ सगाई समारोह: आयु. कु. मधु दुबे संग चि. अभिषेक तिवारी। सपरिवार पधारकर वर-वधू को अपना स्नेह एवं आशीर्वाद प्रदान करें।');
      const location = encodeURIComponent('श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़');
      const dates = '20261126T113000Z/20261126T163000Z';
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details=' + details + '&location=' + location, '_blank');
    });

    $('#share-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

  /* -------------------------------------------------------------------
     9. Finale: symbolic closing-gate animation
  ------------------------------------------------------------------- */
  (function () {
    const gate = $('#closing-gate');
    let t = null;
    $('#btn-gate-close').addEventListener('click', () => {
      hide(gate);
      void gate.offsetWidth;      // restart CSS animation
      show(gate);
      clearTimeout(t);
      t = setTimeout(() => hide(gate), 4000);
    });
  })();

  /* -------------------------------------------------------------------
     10. Original-card lightbox
  ------------------------------------------------------------------- */
  (function () {
    const modal = $('#modal');
    const img = $('#modal-img');
    const zoomBox = $('#modal-zoom');
    const dl = $('#modal-download');
    const tabInner = $('#tab-inner');
    const tabCover = $('#tab-cover');

    const CARDS = {
      inner: { src: 'assets/engagement-invitation.jpg', title: 'मूल सगाई निमंत्रण पत्रिका (विस्तृत)' },
      cover: { src: 'assets/invitation-cover.jpg', title: 'मूल निमंत्रण बाहरी आवरण (कवर)' }
    };

    let active = 'inner';
    let zoom = 1;
    let isOpen = false;

    function paint() {
      const c = CARDS[active];
      img.src = c.src;
      img.alt = c.title;
      modal.setAttribute('aria-label', c.title);
      dl.href = c.src;
      dl.setAttribute('download', 'madhu-abhishek-invitation-' + active + '.jpg');
      tabInner.classList.toggle('active', active === 'inner');
      tabCover.classList.toggle('active', active === 'cover');
      zoomBox.style.transform = 'scale(' + zoom + ')';
    }

    function open(type) {
      active = type || 'inner';
      zoom = 1;
      isOpen = true;
      paint();
      show(modal);
    }
    function close() { isOpen = false; hide(modal); }

    $$('[data-card]').forEach((el) => el.addEventListener('click', () => open(el.dataset.card)));
    modal.addEventListener('click', close);
    $$('[data-stop]', modal).forEach((el) => el.addEventListener('click', (e) => e.stopPropagation()));
    $('#modal-close').addEventListener('click', close);
    tabInner.addEventListener('click', () => { active = 'inner'; zoom = 1; paint(); });
    tabCover.addEventListener('click', () => { active = 'cover'; zoom = 1; paint(); });
    $('#zoom-in').addEventListener('click', () => { zoom = Math.min(zoom + 0.35, 3.0); paint(); });
    $('#zoom-out').addEventListener('click', () => { zoom = Math.max(zoom - 0.35, 0.75); paint(); });
    $('#zoom-reset').addEventListener('click', () => { zoom = 1; paint(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) close(); });
  })();

  /* -------------------------------------------------------------------
     11. Three.js — floating golden dust + rotating sacred rings
         (loaded from CDN via the import map in index.html;
          the rest of the site still works if the CDN is unreachable)
  ------------------------------------------------------------------- */
  async function initThree() {
    const container = $('#three-bg');
    let THREE, RoomEnvironment;
    try {
      THREE = await import('three');
      RoomEnvironment = (await import('three/addons/environments/RoomEnvironment.js')).RoomEnvironment;
    } catch (err) {
      console.warn('Three.js could not be loaded — continuing without 3D background.', err);
      return;
    }

    const particleDensity = 140;

    // Detect software WebGL to adapt load
    const isSoftwareGl = (function () {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x270309, 0.04);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isSoftwareGl, powerPreference: 'high-performance' });
    } catch (err) {
      console.warn('WebGL unavailable — skipping 3D background.', err);
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Procedural environment lighting
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // Warm Indian-wedding lights
    const key = new THREE.DirectionalLight(0xf7e6b0, 1.8);
    key.position.set(5, 8, 10);
    scene.add(key);
    scene.add(new THREE.HemisphereLight(0x510712, 0x270309, 1.2));
    const goldPoint = new THREE.PointLight(0xd6b56d, 2.5, 20);
    goldPoint.position.set(0, 0, 4);
    scene.add(goldPoint);

    // 1. Floating golden dust & embers
    const count = isSoftwareGl ? Math.floor(particleDensity * 0.5) : particleDensity;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sways = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = Math.random() * 0.015 + 0.005;
      sways[i] = Math.random() * Math.PI * 2;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Round gold spark texture
    const spark = document.createElement('canvas');
    spark.width = 64; spark.height = 64;
    const sctx = spark.getContext('2d');
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 240, 1)');
    grad.addColorStop(0.3, 'rgba(247, 230, 176, 0.85)');
    grad.addColorStop(0.7, 'rgba(214, 181, 109, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sctx.fillStyle = grad;
    sctx.beginPath();
    sctx.arc(32, 32, 30, 0, Math.PI * 2);
    sctx.fill();
    const sparkTex = new THREE.CanvasTexture(spark);
    sparkTex.colorSpace = THREE.SRGBColorSpace;

    const pMat = new THREE.PointsMaterial({
      size: 0.35,
      map: sparkTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xf7e6b0
    });
    scene.add(new THREE.Points(geometry, pMat));

    // 2. Slow rotating golden rings in depth
    const ringGroup = new THREE.Group();
    ringGroup.position.z = -4;
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd6b56d, metalness: 0.9, roughness: 0.2, emissive: 0x510712, emissiveIntensity: 0.2
    });
    ringGroup.add(new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.035, 16, 100), ringMat));
    ringGroup.add(new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.02, 16, 80), ringMat));
    scene.add(ringGroup);

    const clock = new THREE.Clock();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      const t = clock.getElapsedTime();
      const arr = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += speeds[i];
        arr[i * 3] += Math.sin(t + sways[i]) * 0.005;
        if (arr[i * 3 + 1] > 10) {
          arr[i * 3 + 1] = -10;
          arr[i * 3] = (Math.random() - 0.5) * 24;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      ringGroup.rotation.z = t * 0.04;
      ringGroup.rotation.x = Math.sin(t * 0.2) * 0.15;
      ringGroup.rotation.y = Math.cos(t * 0.15) * 0.15;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* -------------------------------------------------------------------
     12. Boot
  ------------------------------------------------------------------- */
  hydrate();
  setScene('envelope');
  initThree();
})();
 
