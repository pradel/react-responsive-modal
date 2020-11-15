import { Ref, useEffect } from 'react';

let modals: Ref<any>[] = [];

/**
 * Handle the order of the modals.
 * Inspired by the material-ui implementation.
 */
export const modalManager = {
  /**
   * Return the modals array
   */
  modals: () => modals,

  /**
   * Register a new modal
   */
  add: (newModal: Ref<any>) => {
    modals.push(newModal);
  },

  /**
   * Remove a modal
   */
  remove: (oldModal: Ref<any>) => {
    modals = modals.filter((modal) => modal !== oldModal);
  },

  /**
   * When multiple modals are rendered will return true if current modal is the last one
   */
  isTopModal: (modal: Ref<any>) =>
    !!modals.length && modals[modals.length - 1] === modal,
};

export function useModalManager(ref: Ref<any>, open: boolean) {
  useEffect(() => {
    if (open) {
      modalManager.add(ref);
    }
    return () => {
      modalManager.remove(ref);
    };
  }, [open, ref]);
}
