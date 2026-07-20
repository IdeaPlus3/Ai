const world = document.querySelector('.world');
const stage = document.querySelector('.stage');
const chapters = [...document.querySelectorAll('.chapter')];
const steps = [...document.querySelectorAll('.progress i')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateWorld() {
  const rect = world.getBoundingClientRect();
  const distance = world.offsetHeight - innerHeight;
  const progress = Math.min(1, Math.max(0, -rect.top / distance));
  const index = Math.min(3, Math.floor(progress * 4));
  stage.style.setProperty('--p', progress.toFixed(3));
  stage.style.setProperty('--scene', index);
  chapters.forEach((chapter, i) => chapter.classList.toggle('active', i === index));
  steps.forEach((step, i) => step.classList.toggle('on', i <= index));
}
addEventListener('scroll', updateWorld, { passive: true });
addEventListener('resize', updateWorld);
updateWorld();
if (!reduceMotion) document.querySelectorAll('video').forEach(video => video.play().catch(() => {}));
