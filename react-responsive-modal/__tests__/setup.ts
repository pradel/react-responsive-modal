import '@testing-library/jest-dom';
import { vitest } from 'vitest';

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

// Tell React this environment supports act(). @testing-library/react sets it
// on import, but tests that call act() directly don't import it.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

window.scroll = vitest.fn();
