/**
 * Show faster feature arrivals exceeding an unchanged production-readiness process.
 * Parameters: Reveal deck and optional browser window for lifecycle tests.
 * Usage: setupReadiness(deck) after deck.initialize(); motion lasts six active seconds.
 */
import { moveMotionToken, setupFiniteMotion } from './finite-motion.mjs';

const duration = 6000;
const emissions = [250, 1000, 1750, 2500, 3250, 4000, 4750, 5500];
const arrivalDuration = 350;
const serviceStart = 4000;
const serviceDuration = 400;
const returnStart = 4600;
const returnDuration = 800;

export function readinessFrame(elapsed) {
  const time = Math.max(0, Math.min(elapsed, duration));
  const incoming = emissions.find(start => time >= start && time < start + arrivalDuration);
  const arrived = emissions.filter(start => time >= start + arrivalDuration).length;
  return {
    implementationAngle: time / 750 * 360,
    readinessAngle: time / 9000 * 360,
    arrived,
    pending: arrived - (time >= serviceStart ? 1 : 0),
    completed: time >= serviceStart + serviceDuration ? 1 : 0,
    incoming: incoming === undefined ? null : (time - incoming) / arrivalDuration,
    servicing: time >= serviceStart && time < serviceStart + serviceDuration ?
      (time - serviceStart) / serviceDuration : null,
    returning: time >= returnStart && time < returnStart + returnDuration ?
      (time - returnStart) / returnDuration : null,
  };
}

export function setupReadiness(deck, view = window) {
  const slide = view.document.querySelector('#production-early');
  const figure = slide.querySelector('[data-readiness]');
  const runners = [...figure.querySelectorAll('.cycle-runner')];
  const features = [...figure.querySelectorAll('.queued-feature')];
  const routes = [
    ['.feature-arrival', '.arrival-token', 'incoming'],
    ['.readiness-route', '.readiness-token', 'servicing'],
    ['.readiness-return', '.rework-token', 'returning'],
  ].map(([pathSelector, tokenSelector, state]) => {
    const path = figure.querySelector(pathSelector);
    return { path, token: figure.querySelector(tokenSelector), length: path.getTotalLength(), state };
  });

  function paint(time) {
    const state = readinessFrame(time);
    figure.dataset.pending = String(state.pending);
    runners[0].style.transform = `rotate(${state.implementationAngle}deg)`;
    runners[1].style.transform = `rotate(${state.readinessAngle}deg)`;
    features.forEach((feature, index) => { feature.style.opacity = index < state.pending ? '1' : '0'; });
    routes.forEach(route => moveMotionToken(route.token, route.path, route.length, state[route.state]));
  }

  setupFiniteMotion(deck, view, { slide, figure, controls: 'readiness', duration, paint });
}
