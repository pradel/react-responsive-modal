import '@testing-library/jest-dom';
import { vitest } from 'vite-plus/test';

class AnimationEventPolyfill extends Event {
  animationName: string;
  elapsedTime: number;
  pseudoElement: string;

  constructor(type: string, init: AnimationEventInit = {}) {
    super(type, init);
    this.animationName = init.animationName ?? '';
    this.elapsedTime = init.elapsedTime ?? 0;
    this.pseudoElement = init.pseudoElement ?? '';
  }
}

window.AnimationEvent =
  AnimationEventPolyfill as unknown as typeof AnimationEvent;

window.scroll = vitest.fn();
