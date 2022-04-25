import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import cx from 'classnames';
import CloseIcon from './CloseIcon';
import { FocusTrap } from './FocusTrap';
import { modalManager, useModalManager } from './modalManager';
import { useScrollLock } from './useScrollLock';
import { isBrowser } from './utils';
import useForwardedRef from '@bedrock-layout/use-forwarded-ref';

const classes = {
  root: 'react-responsive-modal-root',
  overlay: 'react-responsive-modal-overlay',
  overlayAnimationIn: 'react-responsive-modal-overlay-in',
  overlayAnimationOut: 'react-responsive-modal-overlay-out',
  modalContainer: 'react-responsive-modal-container',
  modalContainerCenter: 'react-responsive-modal-containerCenter',
  modal: 'react-responsive-modal-modal',
  modalAnimationIn: 'react-responsive-modal-modal-in',
  modalAnimationOut: 'react-responsive-modal-modal-out',
  closeButton: 'react-responsive-modal-closeButton',
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
   *
   * Default to true.
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
   * Element to focus when focus trap is used.
   *
   * Default to undefined.
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * You can specify a container prop which should be of type `Element`.
   * The portal will be rendered inside that element.
   * The default behavior will create a div node and render it at the at the end of document.body.
   */
  container?: Element | null;
  /**
   * An object containing classNames to style the modal.
   */
  classNames?: {
    root?: string;
    overlay?: string;
    overlayAnimationIn?: string;
    overlayAnimationOut?: string;
    modalContainer?: string;
    modal?: string;
    modalAnimationIn?: string;
    modalAnimationOut?: string;
    closeButton?: string;
    closeIcon?: string;
  };
  /**
   * An object containing the styles objects to style the modal.
   */
  styles?: {
    root?: React.CSSProperties;
    overlay?: React.CSSProperties;
    modalContainer?: React.CSSProperties;
    modal?: React.CSSProperties;
    closeButton?: React.CSSProperties;
    closeIcon?: React.CSSProperties;
  };
  /**
   * Animation duration in milliseconds.
   *
   * Default to 300.
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
   * Avoid unpleasant flickering effect when body overflow is hidden. For more information see https://www.npmjs.com/package/body-scroll-lock
   */
  reserveScrollBarGap?: boolean;
  /**
   * id attribute for modal container
   */
  containerId?: string;
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

export const Modal = React.forwardRef(
  (
    {
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
      initialFocusRef = undefined,
      animationDuration = 300,
      classNames,
      styles,
      role = 'dialog',
      ariaDescribedby,
      ariaLabelledby,
      containerId,
      modalId,
      onClose,
      onEscKeyDown,
      onOverlayClick,
      onAnimationEnd,
      children,
      reserveScrollBarGap,
    }: ModalProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const refDialog = useForwardedRef(ref);
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

    // Hook used to manage multiple modals opened at the same time
    useModalManager(refModal, open);

    // Hook used to manage the scroll
    useScrollLock(refModal, open, showPortal, blockScroll, reserveScrollBarGap);

    const handleOpen = () => {
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
      if (event.keyCode !== 27 || !modalManager.isTopModal(refModal)) {
        return;
      }

      onEscKeyDown?.(event);

      if (closeOnEsc) {
        onClose();
      }
    };

    useEffect(() => {
      return () => {
        if (showPortal) {
          // When the modal is closed or removed directly, cleanup the listeners
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

      onOverlayClick?.(event);

      if (closeOnOverlayClick) {
        onClose();
      }

      refShouldClose.current = null;
    };

    const handleModalEvent = () => {
      refShouldClose.current = false;
    };

    const handleAnimationEnd = () => {
      if (!open) {
        setShowPortal(false);
      }

      onAnimationEnd?.();
    };

    const containerModal = container || refContainer.current;

    const overlayAnimation = open
      ? classNames?.overlayAnimationIn ?? classes.overlayAnimationIn
      : classNames?.overlayAnimationOut ?? classes.overlayAnimationOut;

    const modalAnimation = open
      ? classNames?.modalAnimationIn ?? classes.modalAnimationIn
      : classNames?.modalAnimationOut ?? classes.modalAnimationOut;

    return showPortal && containerModal
      ? ReactDom.createPortal(
          <div
            className={cx(classes.root, classNames?.root)}
            style={styles?.root}
            data-testid="root"
          >
            <div
              className={cx(classes.overlay, classNames?.overlay)}
              data-testid="overlay"
              aria-hidden={true}
              style={{
                animation: `${overlayAnimation} ${animationDuration}ms`,
                ...styles?.overlay,
              }}
            />
            <div
              ref={refModal}
              id={containerId}
              className={cx(
                classes.modalContainer,
                center && classes.modalContainerCenter,
                classNames?.modalContainer
              )}
              style={styles?.modalContainer}
              data-testid="modal-container"
              onClick={handleClickOverlay}
            >
              <div
                ref={refDialog}
                className={cx(classes.modal, classNames?.modal)}
                style={{
                  animation: `${modalAnimation} ${animationDuration}ms`,
                  ...styles?.modal,
                }}
                onMouseDown={handleModalEvent}
                onMouseUp={handleModalEvent}
                onClick={handleModalEvent}
                onAnimationEnd={handleAnimationEnd}
                id={modalId}
                role={role}
                aria-modal="true"
                aria-labelledby={ariaLabelledby}
                aria-describedby={ariaDescribedby}
                data-testid="modal"
                tabIndex={-1}
              >
                {focusTrapped && (
                  <FocusTrap
                    container={refDialog}
                    initialFocusRef={initialFocusRef}
                  />
                )}
                {children}
                {showCloseIcon && (
                  <CloseIcon
                    classes={classes}
                    classNames={classNames}
                    styles={styles}
                    closeIcon={closeIcon}
                    onClick={onClose}
                    id={closeIconId}
                  />
                )}
              </div>
            </div>
          </div>,
          containerModal
        )
      : null;
  }
);

export default Modal;
