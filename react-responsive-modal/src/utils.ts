export const isBrowser = typeof window !== 'undefined';

export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');
