const root = document.documentElement;
const themeButtons = document.querySelectorAll(".chip");
const perfToggle = document.getElementById("perfToggle");
const bgCanvas = document.getElementById("bg-canvas");
const coreCanvas = document.getElementById("core-canvas");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const parallaxItems = document.querySelectorAll("[data-depth]");
const glowCards = document.querySelectorAll(".glow-card");
let backgroundController;

const themes = {
  nebula: {
    accent: "#6cf6ff",
    accentStrong: "#7b5bff",
    accentSoft: "rgba(108, 246, 255, 0.2)",
    background: "#05070c",
  },
  quantum: {
    accent: "#7cf7c4",
    accentStrong: "#3a6cf6",
    accentSoft: "rgba(124, 247, 196, 0.2)",
    background: "#050a10",
  },
  aurora: {
    accent: "#ff9cf6",
    accentStrong: "#8c6bff",
    accentSoft: "rgba(255, 156, 246, 0.2)",
    background: "#09050f",
  },
};

const motionState = {
  lowPerformance: false,
  autoDowngraded: false,
};
let canvasPalette = {
  accent: "108, 246, 255",
  accentStrong: "123, 91, 255",
};

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((item) => item + item).join("")
    : normalized;
  const int = parseInt(value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r}, ${g}, ${b}`;
};

const setTheme = (name) => {
  const theme = themes[name];
  if (!theme) return;
  document.body.dataset.theme = name;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-strong", theme.accentStrong);
  root.style.setProperty("--accent-soft", theme.accentSoft);
  root.style.setProperty("--bg", theme.background);
  canvasPalette = {
    accent: hexToRgb(theme.accent),
    accentStrong: hexToRgb(theme.accentStrong),
  };
  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === name);
  });
};

const setLowPerformance = (value) => {
  motionState.lowPerformance = value;
  document.body.classList.toggle("low-performance", value);
  if (backgroundController) {
    backgroundController.refreshParticles();
  }
};

const autoPerformanceCheck = () => {
  const memory = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 4;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (memory <= 4 || cores <= 4 || prefersReduced) {
    motionState.autoDowngraded = true;
    perfToggle.checked = true;
    setLowPerformance(true);
  }
};

const setupThemeSwitch = () => {
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.theme));
  });
};

// 按钮能量波纹
const setupRippleButtons = () => {
  document.querySelectorAll(".primary, .ghost").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty("--ripple-x", `${x}%`);
      button.style.setProperty("--ripple-y", `${y}%`);
    });
  });
};

// 玻璃卡片高光随鼠标移动
const setupGlowCards = () => {
  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--glow-x", `${x}%`);
      card.style.setProperty("--glow-y", `${y}%`);
    });
  });
};

// 滚动触发浮动显示
const setupScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealItems.forEach((item) => observer.observe(item));
};

// 数值统计递增动画
const setupCounters = () => {
  const animateCount = (element) => {
    const target = Number(element.dataset.target);
    const start = performance.now();
    const duration = 1200;

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const value = Math.floor(target * progress);
      element.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

// 鼠标视差
const setupParallax = () => {
  const handleMove = (event) => {
    if (motionState.lowPerformance) return;
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;
    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0.1);
      item.style.transform = `translate3d(${x * depth * 18}px, ${y * depth * 18}px, 0)`;
    });
  };

  window.addEventListener("mousemove", handleMove);
};

const setupPerformanceToggle = () => {
  perfToggle.addEventListener("change", () => {
    setLowPerformance(perfToggle.checked);
  });
};

// 背景 Canvas：星云粒子与能量连线
const backgroundRenderer = () => {
  const ctx = bgCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
    createParticles();
  };

  const createParticles = () => {
    const baseCount = motionState.lowPerformance ? 30 : 80;
    particles = Array.from({ length: baseCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(8, 12, 24, 0.4)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${canvasPalette.accent}, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();

      if (!motionState.lowPerformance) {
        for (let j = index + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(${canvasPalette.accentStrong}, 0.08)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
    });

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  resize();
  draw();

  return {
    refreshParticles: createParticles,
  };
};

// 3D 能量核心：原生 Canvas 绘制与交互
const energyCore = () => {
  const ctx = coreCanvas.getContext("2d");
  let width = coreCanvas.width;
  let height = coreCanvas.height;
  let rotation = { x: 0, y: 0 };
  let targetRotation = { x: 0, y: 0 };
  let burstParticles = [];
  let ripple = 0;

  const spherePoints = Array.from({ length: 220 }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    };
  });

  const project = (point, scale = 150) => {
    const depth = 2.2;
    const z = point.z + depth;
    return {
      x: (point.x * scale) / z + width / 2,
      y: (point.y * scale) / z + height / 2,
      alpha: Math.min(1, 1 / z),
    };
  };

  const rotate = (point) => {
    const sinY = Math.sin(rotation.y);
    const cosY = Math.cos(rotation.y);
    const sinX = Math.sin(rotation.x);
    const cosX = Math.cos(rotation.x);

    let x = point.x * cosY - point.z * sinY;
    let z = point.x * sinY + point.z * cosY;
    let y = point.y * cosX - z * sinX;
    z = point.y * sinX + z * cosX;
    return { x, y, z };
  };

  const drawRing = () => {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation.y);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${canvasPalette.accent}, 0.35)`;
    ctx.lineWidth = 2;
    ctx.ellipse(0, 0, 120, 44, rotation.x, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };

  const drawBurst = () => {
    burstParticles = burstParticles.filter((particle) => particle.life > 0);
    burstParticles.forEach((particle) => {
      particle.life -= 1;
      particle.x += particle.vx;
      particle.y += particle.vy;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.life / 30})`;
      ctx.arc(particle.x, particle.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });

    if (ripple > 0) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${canvasPalette.accent}, ${ripple / 80})`;
      ctx.lineWidth = 2;
      ctx.arc(width / 2, height / 2, ripple * 2, 0, Math.PI * 2);
      ctx.stroke();
      ripple -= 1.4;
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    if (!motionState.lowPerformance) {
      rotation.x += (targetRotation.x - rotation.x) * 0.05;
      rotation.y += (targetRotation.y - rotation.y) * 0.05;
    }

    const gradient = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 160);
    gradient.addColorStop(0, `rgba(${canvasPalette.accent}, 0.6)`);
    gradient.addColorStop(0.6, `rgba(${canvasPalette.accentStrong}, 0.2)`);
    gradient.addColorStop(1, "rgba(6, 8, 16, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 150, 0, Math.PI * 2);
    ctx.fill();

    spherePoints.forEach((point) => {
      const rotated = rotate(point);
      const projected = project(rotated);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + projected.alpha * 0.4})`;
      ctx.arc(projected.x, projected.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    drawRing();
    drawBurst();

    requestAnimationFrame(animate);
  };

  const handleMove = (event) => {
    if (motionState.lowPerformance) return;
    const rect = coreCanvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    targetRotation = { x: y * 0.8, y: x * 0.8 };
  };

  const handleLeave = () => {
    targetRotation = { x: 0, y: 0 };
  };

  const handleClick = () => {
    if (motionState.lowPerformance) return;
    ripple = 80;
    burstParticles = Array.from({ length: 40 }, () => ({
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 30,
    }));
  };

  coreCanvas.addEventListener("mousemove", handleMove);
  coreCanvas.addEventListener("mouseleave", handleLeave);
  coreCanvas.addEventListener("click", handleClick);

  animate();
};

const init = () => {
  setTheme("nebula");
  autoPerformanceCheck();
  setupThemeSwitch();
  setupPerformanceToggle();
  setupRippleButtons();
  setupGlowCards();
  setupScrollReveal();
  setupCounters();
  setupParallax();
  backgroundController = backgroundRenderer();
  energyCore();
};

init();
