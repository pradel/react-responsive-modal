import { Ref, useEffect } from 'react';

let modals: Ref<Element>[] = [];

/**
 * Handle the order of the modals.
 * Inspired by the material-ui implementation.
 */
export const modalManager = {
  /**
   * Register a new modal
   */
  add: (newModal: Ref<Element>) => {
    modals.push(newModal);
  },

  /**
   * Remove a modal
   */
  remove: (oldModal: Ref<Element>) => {
    modals = modals.filter((modal) => modal !== oldModal);
  },

  /**
   * When multiple modals are rendered will return true if current modal is the last one
   */
  isTopModal: (modal: Ref<Element>) =>
    !!modals.length && modals[modals.length - 1] === modal,
};

export function useModalManager(ref: Ref<Element>, open: boolean) {
  useEffect(() => {
    if (open) {
      modalManager.add(ref);
    }
    return () => {
      modalManager.remove(ref);
    };
  }, [open, ref]);
}
