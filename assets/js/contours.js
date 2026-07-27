/* "Cauce" — generative topographic contours.
   Concentric warped iso-lines emanating from a focal point, echoing the
   brand spiral. Cheap (no deps), DPR-aware, honours reduced-motion. */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hexToRgb(h) {
    const n = parseInt(h.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  class Field {
    constructor(canvas) {
      this.c = canvas;
      this.ctx = canvas.getContext("2d");
      this.fx = parseFloat(canvas.dataset.focalX ?? "0.82");
      this.fy = parseFloat(canvas.dataset.focalY ?? "0.18");
      this.color = hexToRgb(canvas.dataset.color || "#2F9BE0");
      this.tint = hexToRgb(canvas.dataset.tint || "#BFE0F6");
      this.gap = parseFloat(canvas.dataset.gap || "30");
      this.alpha = parseFloat(canvas.dataset.alpha || "0.5");
      this.speed = parseFloat(canvas.dataset.speed || "1");
      this.t = Math.random() * 1000;
      this.resize();
      const ro = new ResizeObserver(() => this.resize());
      ro.observe(canvas);
    }
    resize() {
      const r = this.c.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, r.width);
      this.h = Math.max(1, r.height);
      this.c.width = this.w * this.dpr;
      this.c.height = this.h * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (reduce) this.draw();
    }
    draw() {
      const { ctx, w, h } = this;
      const cx = w * this.fx;
      const cy = h * this.fy;
      ctx.clearRect(0, 0, w, h);
      const maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) + this.gap;
      const rings = Math.ceil(maxR / this.gap);
      for (let i = 1; i <= rings; i++) {
        const base = i * this.gap;
        const prog = i / rings;
        ctx.beginPath();
        const steps = Math.max(48, Math.floor(base / 3));
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          // organic warp: a few sinusoids, phase drifts with time + radius
          const warp =
            Math.sin(a * 3 + this.t * 0.6 + base * 0.02) * (7 + prog * 22) +
            Math.sin(a * 2 - this.t * 0.4 + base * 0.015) * (10 + prog * 26) +
            Math.sin(a * 5 + this.t * 0.25) * (3 + prog * 8);
          const r = base + warp;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.94; // slight vertical squash
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const mix = Math.min(1, prog * 1.2);
        const cr = Math.round(this.color[0] + (this.tint[0] - this.color[0]) * (1 - mix));
        const cg = Math.round(this.color[1] + (this.tint[1] - this.color[1]) * (1 - mix));
        const cb = Math.round(this.color[2] + (this.tint[2] - this.color[2]) * (1 - mix));
        const fade = this.alpha * (0.35 + 0.65 * (1 - prog));
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${fade})`;
        ctx.lineWidth = i % 4 === 0 ? 1.6 : 1;
        ctx.stroke();
      }
    }
    tick(dt) {
      this.t += dt * 0.12 * this.speed;
      this.draw();
    }
  }

  const canvases = Array.from(document.querySelectorAll("canvas[data-contours]"));
  if (!canvases.length) return;
  const fields = canvases.map((c) => new Field(c));

  if (reduce) {
    fields.forEach((f) => f.draw());
    return;
  }

  let last = performance.now();
  let running = true;
  // pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) { last = performance.now(); loop(last); }
  });
  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (const f of fields) f.tick(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
