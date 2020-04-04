const modals: any[] = [];

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
  add: (modal: any) => {
    if (modals.indexOf(modal) === -1) {
      modals.push(modal);
    }
  },

  /**
   * Remove a modal
   */
  remove: (modal: any) => {
    const index = modals.indexOf(modal);
    if (index !== -1) {
      modals.splice(index, 1);
    }
  },

  /**
   * Check if the modal is the first one on the screen
   */
  isTopModal: (modal: any) =>
    !!modals.length && modals[modals.length - 1] === modal,
};
