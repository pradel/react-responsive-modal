const modals: { element: HTMLDivElement; blockScroll: boolean }[] = [];

/**
 * Handle the order of the modals.
 * Inspired by the material-ui implementation.
 */
export default {
  /**
   * Return the modals array
   */
  modals: () => modals,

  /**
   * Register a new modal
   */
  add: (newModal: HTMLDivElement, blockScroll: boolean) => {
    if (modals.findIndex((modal) => modal.element === newModal) === -1) {
      modals.push({ element: newModal, blockScroll });
    }
  },

  /**
   * Remove a modal
   */
  remove: (oldModal: HTMLDivElement) => {
    const index = modals.findIndex((modal) => modal.element === oldModal);
    if (index !== -1) {
      modals.splice(index, 1);
    }
  },

  /**
   * Check if the modal is the first one on the screen
   */
  isTopModal: (modal: HTMLDivElement) =>
    !!modals.length && modals[modals.length - 1]?.element === modal,
};
