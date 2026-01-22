const STATES = ['idle', 'active', 'deep', 'lowpower'];

export function initStateMachine(perf) {
  const state = {
    current: 'idle',
    subscribers: [],
    set(next) {
      if (!STATES.includes(next) || this.current === next) return;
      this.current = next;
      document.body.className = `state-${next}`;
      this.subscribers.forEach((fn) => fn(next));
    },
    onChange(fn) {
      this.subscribers.push(fn);
    },
    syncMode(mode) {
      if (mode === 'eco') {
        this.set('lowpower');
      } else if (this.current === 'lowpower') {
        this.set('idle');
      }
    }
  };

  state.syncMode(perf.mode);
  return state;
}
