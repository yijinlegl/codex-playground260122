const MODES = {
  experimental: { particleMultiplier: 1.4, blur: 12, fpsCap: 60 },
  balanced: { particleMultiplier: 1, blur: 8, fpsCap: 60 },
  eco: { particleMultiplier: 0.6, blur: 2, fpsCap: 30 }
};

export function initPerformance() {
  const perf = {
    fps: 60,
    frameCount: 0,
    lastTime: performance.now(),
    mode: 'balanced',
    autoScale: 1,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    setMode(mode) {
      if (!MODES[mode]) return;
      this.mode = mode;
      document.body.dataset.mode = mode;
    },
    get settings() {
      const base = MODES[this.mode];
      return {
        particleMultiplier: base.particleMultiplier * this.autoScale,
        blur: base.blur,
        fpsCap: base.fpsCap
      };
    },
    tick(now) {
      this.frameCount += 1;
      if (now - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
        this.frameCount = 0;
        this.lastTime = now;
      }
    },
    autoDetect() {
      const lowPerf = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (lowPerf) {
        this.autoScale = 0.7;
        this.setMode('eco');
      }
    }
  };

  perf.autoDetect();
  return perf;
}

export function nextMode(current) {
  const order = ['experimental', 'balanced', 'eco'];
  const index = order.indexOf(current);
  return order[(index + 1) % order.length];
}
