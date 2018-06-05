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
   * Is the dialog centered (**when you don't have a lot of content**).
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
}

declare const ReactReponsiveModal: React.ComponentType<Props>;

export default ReactReponsiveModal;
