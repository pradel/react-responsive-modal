import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import cx from 'classnames';
import noScroll from 'no-scroll';
import focusTrap from 'focus-trap-js';
import CloseIcon from './closeIcon';
import modalManager from './modalManager';

const isBrowser = typeof window !== 'undefined';

const blockNoScroll = () => {
  noScroll.on();
};

const unblockNoScroll = () => {
  // Restore the scroll only if there is no modal on the screen
  if (modalManager.modals().length === 0) {
    noScroll.off();
  }
};

const classes = {
  overlay: 'react-responsive-modal-overlay',
  modal: 'react-responsive-modal-modal',
  modalCenter: 'react-responsive-modal-modalCenter',
  closeButton: 'react-responsive-modal-closeButton',
  animationIn: 'react-responsive-modal-fadeIn',
  animationOut: 'react-responsive-modal-fadeOut',
};

interface ModalProps {
  /**
   * Control if the modal is open or not.
   */
  open: boolean;
  /**
   * Should the dialog be centered.
   */
  center?: boolean;
  /**
   * Is the modal closable when user press esc key.
   * Default to true.
   */
  closeOnEsc?: boolean;
  /**
   * Is the modal closable when user click on overlay.
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether to block scrolling when dialog is open.
   */
  blockScroll?: boolean;
  /**
   * Show the close icon.
   */
  showCloseIcon?: boolean;
  /**
   * id attribute for close icon.
   */
  closeIconId?: string;
  /**
   * When the modal is open, trap focus within it.
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
   */
  animationDuration?: number;
  /**
   * ARIA role for modal
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
   * Callback fired when the Modal is open and the animation is finished.
   */
  onEntered?: () => void;
  /**
   * Callback fired when the Modal has exited and the animation is finished.
   */
  onExited?: () => void;
  /**
   *
   */
  children: React.ReactNode;
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
  // onEntered,
  // onExited,
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

  const [showPortal, setShowPortal] = useState(open);

  const handleOpen = () => {
    modalManager.add(refContainer.current);
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
    modalManager.remove(refContainer.current);
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
      !modalManager.isTopModal(refContainer.current)
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
    // When the modal is rendered first time we want to block the scroll
    if (open) {
      handleOpen();
    }
    return () => {
      // When the component is unmounted directly we want to unblock the scroll
      if (showPortal) {
        handleClose();
      }
    };
  }, []);

  useEffect(() => {
    // If the open prop is changing, we need to open the modal
    if (open && !showPortal) {
      setShowPortal(true);
      handleOpen();
    }
  }, [open]);

  /**
   * Handle focus lock on the modal
   */
  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (refModal.current) {
        focusTrap(event, refModal.current);
      }
    };

    if (isBrowser && focusTrapped) {
      document.addEventListener('keydown', handleKeyEvent);
    }
    return () => {
      if (isBrowser && focusTrapped) {
        document.removeEventListener('keydown', handleKeyEvent);
      }
    };
  }, [refModal]);

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
  };

  return (
    showPortal &&
    ReactDom.createPortal(
      <div
        style={{
          animation: `${
            open
              ? classNames?.animationIn
                ? classNames?.animationIn
                : classes.animationIn
              : classNames?.animationOut
              ? classNames?.animationOut
              : classes.animationOut
          } ${animationDuration}ms`,
          ...styles?.overlay,
        }}
        className={cx(classes.overlay, classNames?.overlay)}
        onClick={handleClickOverlay}
        onAnimationEnd={handleAnimationEnd}
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
        >
          {children}
          {showCloseIcon && (
            <CloseIcon
              classes={classes}
              classNames={classNames}
              styles={styles}
              onClickCloseIcon={handleClickCloseIcon}
              id={closeIconId}
            />
          )}
        </div>
      </div>,
      container || refContainer.current!
    )
  );
};
