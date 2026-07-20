const body = document.body;
const world = document.querySelector('.world');
const stage = document.querySelector('.world-stage');
const scenes = [...document.querySelectorAll('.scene')];
const progressBars = [...document.querySelectorAll('.scene-progress i')];
const menuButton = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('.menu-panel');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let rafId = 0;

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuPanel.setAttribute('aria-hidden', String(!open));
  body.classList.toggle('menu-open', open);
}

function updateWorld() {
  rafId = 0;
  const rect = world.getBoundingClientRect();
  const distance = Math.max(1, world.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / distance));
  const sceneIndex = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  stage.style.setProperty('--progress', progress.toFixed(4));
  stage.style.setProperty('--scene-progress', ((progress * scenes.length) % 1).toFixed(4));
  scenes.forEach((scene, index) => scene.classList.toggle('is-active', index === sceneIndex));
  progressBars.forEach((bar, index) => bar.classList.toggle('is-complete', index <= sceneIndex));
}

function requestUpdate() {
  if (!rafId) rafId = requestAnimationFrame(updateWorld);
}

menuButton.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
menuPanel.addEventListener('click', (event) => { if (event.target.closest('a') || event.target.classList.contains('menu-backdrop')) setMenu(false); });
window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);
window.addEventListener('load', () => body.classList.add('is-loaded'));
if (reduceMotion) body.classList.add('reduce-motion');
updateWorld();
