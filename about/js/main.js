import { initRender } from './render.js';
import { initInteraction } from './interaction.js';
import { initStateMachine } from './state.js';
import { initPerformance } from './perf.js';
import { initUI } from './ui.js';

const perf = initPerformance();
const state = initStateMachine(perf);
const render = initRender(perf, state);

initUI(state, perf);
initInteraction(state, perf, render);

render.start();
