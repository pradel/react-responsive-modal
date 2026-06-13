import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect, useRef } from 'react';

export const useScrollLock = (
  refModal: React.RefObject<Element | null>,
  open: boolean,
  showPortal: boolean,
  blockScroll: boolean,
  reserveScrollBarGap?: boolean,
) => {
  const oldRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open && refModal.current && blockScroll) {
      oldRef.current = refModal.current;
      disableBodyScroll(refModal.current, { reserveScrollBarGap });
    }
    return () => {
      if (oldRef.current) {
        enableBodyScroll(oldRef.current);
        oldRef.current = null;
      }
    };
  }, [open, showPortal, refModal, blockScroll, reserveScrollBarGap]);
};
