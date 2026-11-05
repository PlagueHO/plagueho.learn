/**
 * Show an unchecked business rule spreading and returning through a faster loop.
 * Parameters: Reveal deck and optional browser window for lifecycle tests.
 * Usage: setupAmplification(deck) after deck.initialize(); motion lasts six active seconds.
 */
import { moveMotionToken, setupFiniteMotion } from './finite-motion.mjs';

const duration = 6000;
const emissions = [500, 2500, 4500];
const outwardDuration = 500;
const returnDuration = 800;

export function amplificationFrame(elapsed) {
  const time = Math.max(0, Math.min(elapsed, duration));
  const emission = emissions.find(start => time >= start && time < start + outwardDuration);
  const returning = emissions.find(start => time >= start + outwardDuration &&
    time < start + outwardDuration + returnDuration);
  return {
    planningAngle: time / 24000 * 360,
    implementationAngle: time / 2000 * 360,
    copies: emissions.filter(start => time >= start + outwardDuration).length,
    outward: emission === undefined ? null : (time - emission) / outwardDuration,
    returning: returning === undefined ? null : (time - returning - outwardDuration) / returnDuration,
  };
}

export function setupAmplification(deck, view = window) {
  const document = view.document;
  const slide = document.querySelector('#feedback-window');
  const figure = slide.querySelector('[data-amplification]');
  const runners = [...figure.querySelectorAll('.cycle-runner')];
  const branches = [...figure.querySelectorAll('.rule-branch')];
  const tokens = [...figure.querySelectorAll('.rule-token')];
  const copies = [...figure.querySelectorAll('.rule-copy')];
  const returnPath = figure.querySelector('.rule-return');
  const returnToken = figure.querySelector('.return-token');
  const lengths = branches.map(path => path.getTotalLength());
  const returnLength = returnPath.getTotalLength();

  function paint(time) {
    const state = amplificationFrame(time);
    figure.dataset.copies = String(state.copies);
    runners[0].style.transform = `rotate(${state.planningAngle}deg)`;
    runners[1].style.transform = `rotate(${state.implementationAngle}deg)`;
    copies.forEach(copy => { copy.style.opacity = Number(copy.dataset.pass) <= state.copies ? '1' : '0'; });
    tokens.forEach((token, index) => moveMotionToken(token, branches[index], lengths[index], state.outward));
    moveMotionToken(returnToken, returnPath, returnLength, state.returning);
  }

  setupFiniteMotion(deck, view, { slide, figure, controls: 'amplification', duration, paint });
}
