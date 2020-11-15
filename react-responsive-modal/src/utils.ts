import noScroll from 'no-scroll';

export const isBrowser = typeof window !== 'undefined';

export const blockNoScroll = () => {
  noScroll.on();
};

export const unblockNoScroll = () => {
  noScroll.off();
};
