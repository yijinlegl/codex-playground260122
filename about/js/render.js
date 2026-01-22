function resizeCanvas(canvas, dpr) {
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
}

class ParticleField {
  constructor(canvas, perf) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.perf = perf;
    this.particles = [];
    this.lastSpawn = 0;
    this.flow = 0;
  }

  init() {
    resizeCanvas(this.canvas, this.perf.dpr);
    this.spawn();
  }

  spawn() {
    const count = Math.floor(60 * this.perf.settings.particleMultiplier);
    this.particles = Array.from({ length: count }, () => this.createParticle());
  }

  createParticle() {
    return {
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.002 + 0.0008,
      alpha: Math.random() * 0.6 + 0.2
    };
  }

  update(dt) {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(74,214,255,0.8)';

    for (const p of this.particles) {
      p.y -= p.speed * dt;
      if (p.y < -0.1) {
        p.y = 1.1;
        p.x = Math.random();
      }
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * this.perf.dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (performance.now() - this.lastSpawn > 2000) {
      this.spawn();
      this.lastSpawn = performance.now();
    }
  }
}

class FlowField {
  constructor(canvas, perf) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.perf = perf;
    this.phase = 0;
  }

  init() {
    resizeCanvas(this.canvas, this.perf.dpr);
  }

  update(dt) {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1.2 * this.perf.dpr;
    ctx.strokeStyle = 'rgba(122,92,255,0.45)';
    this.phase += dt * 0.0004;
    const lines = Math.floor(5 * this.perf.settings.particleMultiplier);
    for (let i = 0; i < lines; i += 1) {
      ctx.beginPath();
      const offset = (i / lines) * canvas.height;
      for (let x = 0; x < canvas.width; x += 40) {
        const y = offset + Math.sin((x / canvas.width) * Math.PI * 2 + this.phase + i) * 28 * this.perf.dpr;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
}

class EnergyCore {
  constructor(canvas, perf) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.perf = perf;
    this.rotation = 0;
    this.burst = 0;
    this.pointer = { x: 0, y: 0, active: false };
  }

  init() {
    resizeCanvas(this.canvas, this.perf.dpr);
  }

  setPointer(x, y, active) {
    this.pointer = { x, y, active };
  }

  triggerBurst() {
    this.burst = 1;
  }

  update(dt) {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.6;
    const influence = this.pointer.active ? (this.pointer.x - centerX) / centerX : 0;

    this.rotation += dt * 0.0006 + influence * 0.0008;
    const glow = 40 * this.perf.dpr + this.burst * 60;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);

    const gradient = ctx.createRadialGradient(0, 0, radius * 0.2, 0, 0, radius);
    gradient.addColorStop(0, 'rgba(74,214,255,0.9)');
    gradient.addColorStop(0.6, 'rgba(122,92,255,0.6)');
    gradient.addColorStop(1, 'rgba(10,18,40,0.1)');

    ctx.shadowColor = 'rgba(74,214,255,0.6)';
    ctx.shadowBlur = glow;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6 * this.perf.dpr;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.shadowBlur = glow * 0.6;
    for (let i = 0; i < 6; i += 1) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(radius * 0.4, 0);
      ctx.lineTo(radius * 0.9, 0);
      ctx.stroke();
    }

    ctx.restore();

    if (this.burst > 0) {
      ctx.strokeStyle = `rgba(122,255,215,${this.burst})`;
      ctx.lineWidth = 4 * this.perf.dpr;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + (1 - this.burst) * 80 * this.perf.dpr, 0, Math.PI * 2);
      ctx.stroke();
      this.burst -= dt * 0.0012;
    }
  }
}

export function initRender(perf, state) {
  const bgCanvas = document.getElementById('bg-canvas');
  const flowCanvas = document.getElementById('flow-canvas');
  const coreCanvas = document.getElementById('core-canvas');

  const particles = new ParticleField(bgCanvas, perf);
  const flow = new FlowField(flowCanvas, perf);
  const core = new EnergyCore(coreCanvas, perf);

  let lastFrame = performance.now();

  const render = {
    core,
    start() {
      particles.init();
      flow.init();
      core.init();

      window.addEventListener('resize', () => {
        perf.dpr = Math.min(window.devicePixelRatio || 1, 2);
        particles.init();
        flow.init();
        core.init();
      });

      const loop = (now) => {
        const dt = now - lastFrame;
        if (dt >= 1000 / perf.settings.fpsCap) {
          lastFrame = now;
          perf.tick(now);
          particles.update(dt);
          flow.update(dt);
          core.update(dt);
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  };

  state.onChange((next) => {
    if (next === 'deep') {
      perf.setMode('experimental');
    }
  });

  return render;
}
