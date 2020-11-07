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
    // if (modals.findIndex((modal) => modal.element === newModal) === -1) {
    modals.push(newModal);
    // }
  },

  /**
   * Remove a modal
   */
  remove: (oldModal: Ref<any>) => {
    // const index = modals.findIndex((modal) => modal.element === oldModal);
    // if (index !== -1) {
    //   modals.splice(index, 1);
    // }
    modals = modals.filter((modal) => modal !== oldModal);
  },

  /**
   * When multiple modals are rendered will return true if current modal is the last one
   */
  isTopModal: (modal: Ref<any>) =>
    !!modals.length && modals[modals.length - 1] === modal,
};

export function useModalManager(ref: Ref<any>, isOpen?: boolean) {
  useEffect(() => {
    if (isOpen) {
      modalManager.add(ref);
    }
    return () => {
      modalManager.remove(ref);
    };
  }, [isOpen, ref]);
}
