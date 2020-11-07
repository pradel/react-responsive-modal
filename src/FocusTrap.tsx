import { useEffect, useRef } from 'react';
import { isBrowser } from './utils';
import {
  tabTrappingKey,
  candidateSelectors,
  getAllTabbingElements,
} from './lib/focusTrapJs';

interface FocusTrapProps {
  container?: React.RefObject<HTMLElement> | null;
}

export const FocusTrap = ({ container }: FocusTrapProps) => {
  const refLastFocus = useRef<HTMLElement | null>();
  /**
   * Handle focus lock on the modal
   */
  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (container?.current) {
        tabTrappingKey(event, container.current);
      }
    };

    if (isBrowser) {
      document.addEventListener('keydown', handleKeyEvent);
    }
    // On mount we focus on the first focusable element in the modal if there is one
    if (isBrowser && container?.current) {
      const allTabbingElements = getAllTabbingElements(container.current);
      if (allTabbingElements[0]) {
        // First we save the last focused element
        // only if it's a focusable element
        if (
          candidateSelectors.findIndex((selector) =>
            document.activeElement?.matches(selector)
          ) !== -1
        ) {
          refLastFocus.current = document.activeElement as HTMLElement;
        }
        allTabbingElements[0].focus();
      }
    }
    return () => {
      if (isBrowser) {
        document.removeEventListener('keydown', handleKeyEvent);
        // On unmount we restore the focus to the last focused element
        refLastFocus.current?.focus();
      }
    };
  }, [container]);

  return null;
};
