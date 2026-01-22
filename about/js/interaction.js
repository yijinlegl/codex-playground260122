export function initInteraction(state, perf, render) {
  const tiltTargets = document.querySelectorAll('[data-tilt]');
  const coreCanvas = document.getElementById('core-canvas');

  const handleTilt = (event, target) => {
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.transform = `perspective(600px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    target.style.boxShadow = `0 0 30px rgba(74,214,255,${0.2 + Math.abs(x) * 0.2})`;
  };

  tiltTargets.forEach((target) => {
    target.addEventListener('mousemove', (event) => handleTilt(event, target));
    target.addEventListener('mouseleave', () => {
      target.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
      target.style.boxShadow = '';
    });
  });

  if (coreCanvas) {
    coreCanvas.addEventListener('mousemove', (event) => {
      const rect = coreCanvas.getBoundingClientRect();
      render.core.setPointer(event.clientX - rect.left, event.clientY - rect.top, true);
    });

    coreCanvas.addEventListener('mouseleave', () => {
      render.core.setPointer(0, 0, false);
    });

    coreCanvas.addEventListener('click', () => {
      render.core.triggerBurst();
      state.set('active');
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 400 && state.current === 'idle') {
      state.set('active');
    }
    if (scrollY > 1600 && state.current !== 'deep' && perf.mode !== 'eco') {
      state.set('deep');
    }
  });
}
