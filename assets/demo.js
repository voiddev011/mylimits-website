// A fictional walkthrough, not a connection to real accounts or provider APIs.
const demo = document.querySelector('[data-demo]');
if (demo) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = demo.querySelector('.demo-toggle');
  const step = demo.querySelector('[data-demo-step]');
  const status = demo.querySelector('[data-demo-status]');
  const steps = ['01 — Open MyLimits', '02 — Check your allowances', '03 — Refresh your readings', '04 — Back to your flow'];
  let paused = motion.matches;
  let elapsed = 0;
  let lastTime;
  let frame;
  function render() {
    const phase = Math.min(3, Math.floor(elapsed / 3000));
    demo.style.setProperty('--demo-delay', `-${elapsed}ms`);
    step.textContent = steps[phase];
    status.textContent = phase === 2 ? 'Refreshing sample readings…' : 'Readings up to date';
  }
  function tick(now) {
    if (lastTime !== undefined) elapsed = (elapsed + now - lastTime) % 12000;
    lastTime = now;
    render();
    frame = requestAnimationFrame(tick);
  }
  function update() {
    cancelAnimationFrame(frame);
    lastTime = undefined;
    demo.classList.toggle('is-paused', paused);
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Play demo animation' : 'Pause demo animation');
    if (!paused && !document.hidden) frame = requestAnimationFrame(tick);
  }
  toggle.addEventListener('click', () => { paused = !paused; update(); });
  motion.addEventListener('change', () => { paused = motion.matches; update(); });
  document.addEventListener('visibilitychange', update);
  render();
  update();
}
