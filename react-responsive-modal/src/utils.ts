import noScroll from 'no-scroll';
import modalManager from './modalManager';

export const isBrowser = typeof window !== 'undefined';

export const blockNoScroll = () => {
  noScroll.on();
};

export const unblockNoScroll = () => {
  // Restore the scroll only if there is no modal on the screen
  // We filter the modals that are not affecting the scroll
  const modals = modalManager.modals().filter((modal) => modal.blockScroll);
  if (modals.length === 0) {
    noScroll.off();
  }
};
