import React, { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; tier: 0 | 1 | 2; size: number; alpha: number;
  speed: number; phase: number; ci: number; dx: number; dy: number; depth: number;
}
interface Dust { x: number; y: number; r: number; vx: number; vy: number; alpha: number; hue: 'b' | 'v'; phase: number; }
interface Meteor { x: number; y: number; angle: number; speed: number; dist: number; total: number; len: number; ci: number; }
interface Cloud { sprite: HTMLCanvasElement; cx: number; cy: number; ax: number; ay: number; sx: number; sy: number; rot: number; rs: number; scale: number; alpha: number; phase: number; }

// Star colour sets: index 0 = white/navy, 1 = cyan/teal, 2 = blue/indigo, 3 = violet
// Star colour sets: deep space palette. Index 0 = warm starlight white, 1 = ice cyan, 2 = deep indigo/slate, 3 = subtle violet
const DARK_RGB: [number, number, number][] = [[240, 244, 255], [120, 215, 240], [140, 160, 210], [175, 145, 225]];
const LIGHT_RGB: [number, number, number][] = [[30, 41, 100], [14, 116, 144], [67, 56, 202], [109, 40, 217]];

/** Pre-rendered glow sprite with tight, non-blooming falloff */
const makeGlow = ([r, g, b]: [number, number, number]): HTMLCanvasElement => {
  const c = document.createElement('canvas');
  c.width = c.height = 48;
  const x = c.getContext('2d')!;
  const grad = x.createRadialGradient(24, 24, 0, 24, 24, 24);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
  grad.addColorStop(0.18, `rgba(${r},${g},${b},0.5)`);
  grad.addColorStop(0.45, `rgba(${r},${g},${b},0.12)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = grad;
  x.fillRect(0, 0, 48, 48);
  return c;
};

/** Deep space subtle nebula clouds: very dark indigo/midnight purple, faint opacity */
const makeSprite = (size: number, rgb: [number, number, number][]): HTMLCanvasElement => {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const h = size / 2;
  rgb.forEach(([r, gg, b], i) => {
    const ox = h + Math.cos(i * 2.4) * h * 0.22;
    const oy = h + Math.sin(i * 2.4) * h * 0.22;
    const grad = g.createRadialGradient(ox, oy, 0, ox, oy, h * (0.8 - i * 0.1));
    grad.addColorStop(0, `rgba(${r},${gg},${b},0.28)`);
    grad.addColorStop(0.55, `rgba(${r},${gg},${b},0.08)`);
    grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  });
  return c;
};

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    const motion = reduced ? 0.3 : 1;
    const par = reduced ? 0 : 1;
    const frameInterval = isMobile ? 1000 / 30 : 0;

    let isLight = document.documentElement.classList.contains('light');
    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains('light');
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const glowDark = DARK_RGB.map(makeGlow);
    const glowLight = LIGHT_RGB.map(makeGlow);

    // Deep space stars: mostly tiny dim stars, disciplined medium stars, few rare accents
    const nTiny = isMobile ? 120 : 260, nMed = isMobile ? 35 : 75, nBig = isMobile ? 6 : 14;
    const pickCi = () => { const r = Math.random(); return r < 0.5 ? 0 : r < 0.72 ? 1 : r < 0.88 ? 2 : 3; };
    const stars: Star[] = [];
    const add = (tier: 0 | 1 | 2, n: number) => {
      for (let i = 0; i < n; i++) {
        const depth = tier === 0 ? 1 : tier === 1 ? 2 : 3;
        stars.push({
          x: Math.random() * w, y: Math.random() * h, tier, depth,
          size: tier === 0 ? Math.random() * 0.5 + 0.5 : tier === 1 ? Math.random() * 0.7 + 1.2 : Math.random() * 0.9 + 1.8,
          alpha: tier === 0 ? Math.random() * 0.35 + 0.35 : tier === 1 ? Math.random() * 0.25 + 0.55 : Math.random() * 0.2 + 0.75,
          speed: tier === 0 ? Math.random() * 1.4 + 0.6 : tier === 1 ? Math.random() * 1.2 + 0.8 : Math.random() * 1.0 + 0.7,
          phase: Math.random() * Math.PI * 2, ci: pickCi(),
          dx: tier === 0 ? 2.5 : tier === 1 ? 5 : 8,
          dy: tier === 0 ? -1 : tier === 1 ? -2 : -3.5,
        });
      }
    };
    add(0, nTiny); add(1, nMed); add(2, nBig);

    const dust: Dust[] = Array.from({ length: isMobile ? 8 : 18 }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.6,
      vx: (Math.random() - 0.5) * 5, vy: -(Math.random() * 4 + 1.5),
      alpha: Math.random() * 0.16 + 0.05, hue: Math.random() < 0.6 ? 'b' : 'v', phase: Math.random() * Math.PI * 2,
    }));

    // Midnight subtle nebulas: deep dark violet/indigo & near-black midnight navy
    const sSize = isMobile ? 256 : 512;
    const darkNavy = makeSprite(sSize, [[8, 14, 38], [12, 20, 48], [5, 9, 24]]);
    const midnightPurple = makeSprite(sSize, [[24, 12, 45], [35, 16, 60], [14, 8, 30]]);
    const clouds: Cloud[] = [
      { sprite: midnightPurple, cx: 0.25, cy: 0.25, ax: 0.07, ay: 0.05, sx: 0.03, sy: 0.025, rot: 0, rs: 0.008, scale: 1.15, alpha: 0.14, phase: 0 },
      { sprite: darkNavy, cx: 0.8, cy: 0.35, ax: 0.06, ay: 0.05, sx: 0.025, sy: 0.035, rot: 1, rs: -0.007, scale: 1.25, alpha: 0.12, phase: 1.7 },
      { sprite: midnightPurple, cx: 0.65, cy: 0.85, ax: 0.08, ay: 0.04, sx: 0.02, sy: 0.03, rot: 2, rs: 0.006, scale: 1.05, alpha: 0.10, phase: 3.1 },
      { sprite: darkNavy, cx: 0.15, cy: 0.8, ax: 0.05, ay: 0.04, sx: 0.035, sy: 0.02, rot: 3, rs: -0.009, scale: 0.9, alpha: 0.09, phase: 4.4 },
    ];

    const meteors: Meteor[] = [];
    let nextMeteor = performance.now() + 4500;

    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => { tx = (e.clientX / w - 0.5) * 2; ty = (e.clientY / h - 0.5) * 2; };
    if (!isMobile && !reduced) window.addEventListener('mousemove', onMove, { passive: true });
    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0, last = performance.now(), t = 0;

    const draw = (now: number, dtRaw: number) => {
      const dt = dtRaw * motion;
      t += dt;
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;

      // Base: Pure deep space near-black in dark mode
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      const base = ctx.createLinearGradient(0, 0, 0, h);
      if (isLight) { base.addColorStop(0, '#f8f9fd'); base.addColorStop(1, '#eceffa'); }
      else { base.addColorStop(0, '#010206'); base.addColorStop(1, '#02040b'); }
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Faint atmospheric clouds (deep space, zero blue fog)
      ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';
      const minDim = Math.max(w, h);
      for (const c of clouds) {
        const x = (c.cx + Math.sin(t * c.sx + c.phase) * c.ax) * w - mx * 20 * par - scrollY * 0.015 * par;
        const y = (c.cy + Math.cos(t * c.sy + c.phase) * c.ay) * h - my * 16 * par;
        const s = minDim * c.scale * (1 + Math.sin(t * 0.15 + c.phase) * 0.05);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(c.rot + t * c.rs);
        ctx.globalAlpha = c.alpha * (0.85 + Math.sin(t * 0.2 + c.phase) * 0.15) * (isLight ? 0.45 : 1);
        ctx.drawImage(c.sprite, -s / 2, -s / 2, s, s);
        ctx.restore();
      }

      // Stars: restrained, sharp, disciplined
      ctx.globalCompositeOperation = 'source-over';
      const rgbSet = isLight ? LIGHT_RGB : DARK_RGB;
      const glowSet = isLight ? glowLight : glowDark;
      const vis = isLight ? 0.5 : 1;
      for (const s of stars) {
        s.x += dt * s.dx; s.y += dt * s.dy;
        if (s.x > w + 8) s.x = -8;
        if (s.y < -8) s.y = h + 8;
        const px = s.x + mx * s.depth * 8 * par;
        let py = s.y + my * s.depth * 8 * par - scrollY * 0.035 * s.depth * par;
        py = ((py % h) + h) % h;

        const amp = s.tier === 0 ? 0.3 : s.tier === 1 ? 0.35 : 0.4;
        const tw = Math.sin(t * s.speed + s.phase);
        const a = Math.max(0.1, Math.min(1, s.alpha + tw * amp)) * vis;

        if (s.tier === 0) {
          const [r, g, b] = rgbSet[s.ci];
          ctx.globalAlpha = a * 0.75;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.beginPath(); ctx.arc(px, py, s.size, 0, 6.2832); ctx.fill();
        } else {
          const pulse = 1 + tw * (s.tier === 2 ? 0.16 : 0.1);
          const gs = s.size * (s.tier === 2 ? 5.5 : 3.8) * pulse;
          ctx.globalAlpha = a * (s.tier === 2 ? 0.85 : 0.7);
          ctx.drawImage(glowSet[s.ci], px - gs, py - gs, gs * 2, gs * 2);
          
          // Crisp core
          const [r, g, b] = rgbSet[s.ci];
          ctx.globalAlpha = Math.min(1, a * 1.05);
          ctx.fillStyle = isLight ? `rgb(${r},${g},${b})` : '#ffffff';
          ctx.beginPath(); ctx.arc(px, py, s.size * 0.6, 0, 6.2832); ctx.fill();

          // Subtle, restrained diffraction cross for only tier-2 accent stars
          if (s.tier === 2) {
            const L2 = s.size * (3.8 + tw * 1.5);
            ctx.globalAlpha = a * 0.45;
            ctx.strokeStyle = `rgb(${r},${g},${b})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(px - L2, py); ctx.lineTo(px + L2, py);
            ctx.moveTo(px, py - L2); ctx.lineTo(px, py + L2);
            ctx.stroke();
          }
        }
      }

      // Very faint spatial dust
      for (const d of dust) {
        d.x += d.vx * dt; d.y += d.vy * dt;
        if (d.x < -10) d.x = w + 10; else if (d.x > w + 10) d.x = -10;
        if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
        const a = d.alpha * (0.6 + Math.sin(t * 0.7 + d.phase) * 0.4) * (isLight ? 0.7 : 1);
        const px = d.x + mx * 12 * par, py = d.y + my * 12 * par;
        const col = isLight ? (d.hue === 'b' ? '37,99,235' : '124,58,237') : (d.hue === 'b' ? '100,160,230' : '160,130,225');
        const g = ctx.createRadialGradient(px, py, 0, px, py, d.r * 3);
        g.addColorStop(0, `rgba(${col},${a})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(px - d.r * 3, py - d.r * 3, d.r * 6, d.r * 6);
      }

      // Elegant shooting stars with luminous thin trails across dark galaxy
      if (!reduced && now > nextMeteor) {
        meteors.push({
          x: Math.random() * w * 0.9,
          y: Math.random() * h * 0.45,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          speed: Math.random() * 380 + 640,
          dist: 0,
          total: Math.random() * 320 + 460,
          len: Math.random() * 110 + 140,
          ci: Math.random() < 0.65 ? 0 : 1, // white-cyan or teal
        });
        nextMeteor = now + Math.random() * 3200 + 2400; // Trigger every 2.4 - 5.6s
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const step = m.speed * dt;
        m.dist += step;
        m.x += Math.cos(m.angle) * step;
        m.y += Math.sin(m.angle) * step;
        const p = m.dist / m.total;
        if (p >= 1) { meteors.splice(i, 1); continue; }
        const fade = Math.pow(Math.sin(p * Math.PI), 0.75);
        const L2 = m.len * (0.4 + 0.6 * fade);
        const x0 = m.x - Math.cos(m.angle) * L2;
        const y0 = m.y - Math.sin(m.angle) * L2;
        const [r, g, b] = rgbSet[m.ci];
        const head = isLight ? `rgba(${r},${g},${b},${0.95 * fade})` : `rgba(255,255,255,${0.98 * fade})`;
        
        // Multi-layered luminous trail
        const grad = ctx.createLinearGradient(x0, y0, m.x, m.y);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.35 * fade})`);
        grad.addColorStop(0.85, `rgba(180,235,255,${0.75 * fade})`);
        grad.addColorStop(1, head);

        ctx.lineCap = 'round';
        // Outer soft glow
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4.2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Inner bright beam
        ctx.globalAlpha = 0.95;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Brilliant leading starlight head
        ctx.globalAlpha = fade;
        ctx.fillStyle = isLight ? `rgb(${r},${g},${b})` : '#ffffff';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.0, 0, 6.2832);
        ctx.fill();

        // Head corona halo
        ctx.globalAlpha = 0.6 * fade;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4.0, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) { last = now; return; }
      if (frameInterval && now - last < frameInterval) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      draw(now, dt);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="bg-veil absolute inset-0" />
    </div>
  );
};
