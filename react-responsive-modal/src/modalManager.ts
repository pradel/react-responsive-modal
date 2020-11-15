import { Ref, useEffect } from 'react';

let modals: { element: Ref<any>; blockScroll: boolean }[] = [];

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
  add: (newModal: Ref<any>, blockScroll: boolean) => {
    modals.push({ element: newModal, blockScroll });
  },

  /**
   * Remove a modal
   */
  remove: (oldModal: Ref<any>) => {
    modals = modals.filter((modal) => modal.element !== oldModal);
  },

  /**
   * When multiple modals are rendered will return true if current modal is the last one
   */
  isTopModal: (modal: Ref<any>) =>
    !!modals.length && modals[modals.length - 1].element === modal,
};

export function useModalManager(
  ref: Ref<any>,
  open: boolean,
  blockScroll: boolean
) {
  useEffect(() => {
    if (open) {
      modalManager.add(ref, blockScroll);
    }
    return () => {
      modalManager.remove(ref);
    };
  }, [open, ref]);
}
