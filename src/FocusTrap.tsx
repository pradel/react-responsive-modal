import { useEffect } from 'react';
import { isBrowser } from './utils';
import * as focusTrapJs from './focusTrapJs';

interface FocusTrapProps {
  container?: React.RefObject<HTMLElement> | null;
}

export const FocusTrap = ({ container }: FocusTrapProps) => {
  /**
   * Handle focus lock on the modal
   */
  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (container?.current) {
        focusTrapJs.tabTrappingKey(event, container.current);
      }
    };

    if (isBrowser) {
      document.addEventListener('keydown', handleKeyEvent);
    }
    // On mount we focus on the first focusable element in the modal if there is one
    if (isBrowser && container?.current) {
      const allTabbingElements = focusTrapJs.getAllTabbingElements(
        container.current
      );
      if (allTabbingElements[0]) {
        allTabbingElements[0].focus();
      }
    }
    return () => {
      if (isBrowser) {
        document.removeEventListener('keydown', handleKeyEvent);
      }
    };
  }, [container]);

  return null;
};
