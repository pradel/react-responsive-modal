import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import cx from 'classnames';
import CloseIcon from './CloseIcon';
import { FocusTrap } from './FocusTrap';
import modalManager from './modalManager';
import { isBrowser, blockNoScroll, unblockNoScroll } from './utils';

const classes = {
  overlay: 'react-responsive-modal-overlay',
  modal: 'react-responsive-modal-modal',
  modalCenter: 'react-responsive-modal-modalCenter',
  closeButton: 'react-responsive-modal-closeButton',
  animationIn: 'react-responsive-modal-fadeIn',
  animationOut: 'react-responsive-modal-fadeOut',
};

export interface ModalProps {
  /**
   * Control if the modal is open or not.
   */
  open: boolean;
  /**
   * Should the dialog be centered.
   *
   * Default to false.
   */
  center?: boolean;
  /**
   * Is the modal closable when user press esc key.
   *
   * Default to true.
   */
  closeOnEsc?: boolean;
  /**
   * Is the modal closable when user click on overlay.
   *
   * Default to true.
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether to block scrolling when dialog is open.
   *
   * Default to true.
   */
  blockScroll?: boolean;
  /**
   * Show the close icon.
   */
  showCloseIcon?: boolean;
  /**
   * id attribute for the close icon button.
   */
  closeIconId?: string;
  /**
   * Custom icon to render (svg, img, etc...).
   */
  closeIcon?: React.ReactNode;
  /**
   * When the modal is open, trap focus within it.
   *
   * Default to true.
   */
  focusTrapped?: boolean;
  /**
   * You can specify a container prop which should be of type `Element`.
   * The portal will be rendered inside that element.
   * The default behavior will create a div node and render it at the at the end of document.body.
   */
  container?: Element;
  /**
   * An object containing classNames to style the modal.
   */
  classNames?: {
    overlay?: string;
    modal?: string;
    closeButton?: string;
    closeIcon?: string;
    animationIn?: string;
    animationOut?: string;
  };
  /**
   * An object containing the styles objects to style the modal.
   */
  styles?: {
    overlay?: React.CSSProperties;
    modal?: React.CSSProperties;
    closeButton?: React.CSSProperties;
    closeIcon?: React.CSSProperties;
  };
  /**
   * Animation duration in milliseconds.
   *
   * Default to 500.
   */
  animationDuration?: number;
  /**
   * ARIA role for modal
   *
   * Default to 'dialog'.
   */
  role?: string;
  /**
   * ARIA label for modal
   */
  ariaLabelledby?: string;
  /**
   * ARIA description for modal
   */
  ariaDescribedby?: string;
  /**
   * id attribute for modal
   */
  modalId?: string;
  /**
   * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.
   */
  onClose: () => void;
  /**
   * Callback fired when the escape key is pressed.
   */
  onEscKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Callback fired when the overlay is clicked.
   */
  onOverlayClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  /**
   * Callback fired when the Modal has exited and the animation is finished.
   */
  onAnimationEnd?: () => void;
  children?: React.ReactNode;
}

export const Modal = ({
  open,
  center,
  blockScroll = true,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  container,
  showCloseIcon = true,
  closeIconId,
  closeIcon,
  focusTrapped = true,
  animationDuration = 500,
  classNames,
  styles,
  role = 'dialog',
  ariaDescribedby,
  ariaLabelledby,
  modalId,
  onClose,
  onEscKeyDown,
  onOverlayClick,
  onAnimationEnd,
  children,
}: ModalProps) => {
  const refModal = useRef<HTMLDivElement>(null);
  const refShouldClose = useRef<boolean | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  // Lazily create the ref instance
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  if (refContainer.current === null && isBrowser) {
    refContainer.current = document.createElement('div');
  }

  // The value should be false for srr, that way when the component is hydrated client side,
  // it will match the server rendered content
  const [showPortal, setShowPortal] = useState(false);

  const handleOpen = () => {
    modalManager.add(refContainer.current!, blockScroll);
    if (blockScroll) {
      blockNoScroll();
    }
    if (
      refContainer.current &&
      !container &&
      !document.body.contains(refContainer.current)
    ) {
      document.body.appendChild(refContainer.current);
    }
    document.addEventListener('keydown', handleKeydown);
  };

  const handleClose = () => {
    modalManager.remove(refContainer.current!);
    if (blockScroll) {
      unblockNoScroll();
    }
    if (
      refContainer.current &&
      !container &&
      document.body.contains(refContainer.current)
    ) {
      document.body.removeChild(refContainer.current);
    }
    document.removeEventListener('keydown', handleKeydown);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    // Only the last modal need to be escaped when pressing the esc key
    if (
      event.keyCode !== 27 ||
      !modalManager.isTopModal(refContainer.current!)
    ) {
      return;
    }

    if (onEscKeyDown) {
      onEscKeyDown(event);
    }

    if (closeOnEsc) {
      onClose();
    }
  };

  useEffect(() => {
    return () => {
      // When the component is unmounted directly we want to unblock the scroll
      if (showPortal) {
        handleClose();
      }
    };
  }, [showPortal]);

  useEffect(() => {
    // If the open prop is changing, we need to open the modal
    // This is also called on the first render if the open prop is true when the modal is created
    if (open && !showPortal) {
      setShowPortal(true);
      handleOpen();
    }
  }, [open]);

  const handleClickOverlay = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (refShouldClose.current === null) {
      refShouldClose.current = true;
    }

    if (!refShouldClose.current) {
      refShouldClose.current = null;
      return;
    }

    if (onOverlayClick) {
      onOverlayClick(event);
    }

    if (closeOnOverlayClick) {
      onClose();
    }

    refShouldClose.current = null;
  };

  const handleModalEvent = () => {
    refShouldClose.current = false;
  };

  const handleClickCloseIcon = () => {
    onClose();
  };

  const handleAnimationEnd = () => {
    if (!open) {
      setShowPortal(false);
      handleClose();
    }

    if (blockScroll) {
      unblockNoScroll();
    }

    if (onAnimationEnd) {
      onAnimationEnd();
    }
  };

  const containerModal = container || refContainer.current;

  return showPortal && containerModal
    ? ReactDom.createPortal(
        <div
          style={{
            animation: `${
              open
                ? classNames?.animationIn ?? classes.animationIn
                : classNames?.animationOut ?? classes.animationOut
            } ${animationDuration}ms`,
            ...styles?.overlay,
          }}
          className={cx(classes.overlay, classNames?.overlay)}
          onClick={handleClickOverlay}
          onAnimationEnd={handleAnimationEnd}
          data-testid="overlay"
        >
          <div
            ref={refModal}
            className={cx(
              classes.modal,
              center && classes.modalCenter,
              classNames?.modal
            )}
            style={styles?.modal}
            onMouseDown={handleModalEvent}
            onMouseUp={handleModalEvent}
            onClick={handleModalEvent}
            id={modalId}
            role={role}
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            data-testid="modal"
          >
            {focusTrapped && <FocusTrap container={refModal} />}
            {children}
            {showCloseIcon && (
              <CloseIcon
                classes={classes}
                classNames={classNames}
                styles={styles}
                closeIcon={closeIcon}
                onClickCloseIcon={handleClickCloseIcon}
                id={closeIconId}
              />
            )}
          </div>
        </div>,
        containerModal
      )
    : null;
};

export default Modal;
