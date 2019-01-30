// TypeScript Version: 2.6

import * as React from 'react';

interface Props {
  /**
   * Is the modal closable when user press esc key.
   */
  closeOnEsc?: boolean;
  /**
   * Is the modal closable when user click on overlay.
   */
  closeOnOverlayClick?: boolean;
  /**
   * Callback fired when the Modal is open and the animation is finished.
   */
  onEntered?: () => void;
  /**
   * Callback fired when the Modal has exited and the animation is finished.
   */
  onExited?: () => void;
  /**
   * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.
   */
  onClose: () => void;
  /**
   * Callback fired when the escape key is pressed.
   */
  onEscKeyDown?: () => void;
  /**
   * Callback fired when the overlay is clicked.
   */
  onOverlayClick?: () => void;
  /**
   * Control if the modal is open or not.
   */
  open: boolean;
  /**
   * An object containing classNames to style the modal, can have properties 'overlay' (classname for overlay div), 'modal' (classname for modal content div),
   * 'closeButton' (classname for the button that contain the close icon), 'closeIcon' (classname for close icon svg).
   * You can customize the transition with 'transitionEnter', 'transitionEnterActive', 'transitionExit', 'transitionExitActive'
   */
  classNames?: object;
  /**
   * An object containing the styles objects to style the modal, can have properties 'overlay', 'modal', 'closeButton', 'closeIcon'.
   */
  styles?: object;
  /**
   * Should the dialog be centered.
   */
  center?: boolean;
  /**
   * Show the close icon.
   */
  showCloseIcon?: boolean;
  /**
   * Close icon size.
   */
  closeIconSize?: number;
  /**
   * A valid svg path to show as icon.
   */
  closeIconSvgPath?: any;
  /**
   * Animation duration in milliseconds.
   */
  animationDuration?: number;
  /**
   * You can specify a container prop which should be of type `Element`. The portal will be rendered inside that element.
   * The default behavior will create a div node and render it at the at the end of document.body.
   */
  container?: any;
  /**
   * Whether to block scrolling when dialog is open
   */
  blockScroll?: boolean;
  /**
   * When the modal is open, trap focus within it
   */
  focusTrapped?: boolean;
  /**
   * Options to be passed to the focus trap, details available at https://github.com/davidtheclark/focus-trap#focustrap--createfocustrapelement-createoptions
   */
  focusTrapOptions?: object;
  /**
   * id attribute for overlay
   */
  overlayId?: string;
  /**
   * id attribute for modal
   */
  modalId?: string;
  /**
   * id attribute for close icon
   */
  closeIconId?: string;
}

declare const ReactReponsiveModal: React.ComponentType<Props>;

export default ReactReponsiveModal;
