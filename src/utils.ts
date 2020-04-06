import noScroll from 'no-scroll';
import modalManager from './modalManager';

export const isBrowser = typeof window !== 'undefined';

export const blockNoScroll = () => {
  noScroll.on();
};

export const unblockNoScroll = () => {
  // Restore the scroll only if there is no modal on the screen
  if (modalManager.modals().length === 0) {
    noScroll.off();
  }
};
