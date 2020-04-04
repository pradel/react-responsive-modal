import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
// import cx from 'classnames';
import CSSTransition from 'react-transition-group/CSSTransition';
import noScroll from 'no-scroll';
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

interface ModalProps {
  /**
   * Control if the modal is open or not.
   */
  open: boolean;
  /**
   * Is the modal closable when user press esc key.
   * Default to true.
   */
  closeOnEsc?: boolean;
  /**
   * Whether to block scrolling when dialog is open.
   */
  blockScroll?: boolean;
  /**
   * You can specify a container prop which should be of type `Element`.
   * The portal will be rendered inside that element.
   * The default behavior will create a div node and render it at the at the end of document.body.
   */
  container?: Element;
  /**
   * Animation duration in milliseconds.
   */
  animationDuration?: number;
  /**
   * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.
   */
  onClose: () => void;
  /**
   * Callback fired when the escape key is pressed.
   */
  onEscKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Callback fired when the Modal is open and the animation is finished.
   */
  onEntered?: () => void;
  /**
   * Callback fired when the Modal has exited and the animation is finished.
   */
  onExited?: () => void;
}

export const Modal = ({
  open,
  blockScroll = true,
  closeOnEsc = true,
  container,
  animationDuration = 500,
  onClose,
  onEscKeyDown,
  onEntered,
  onExited,
}: ModalProps) => {
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
    if (refContainer.current && !container) {
      document.body.appendChild(refContainer.current);
    }
    document.addEventListener('keydown', handleKeydown);
  };

  const handleClose = () => {
    modalManager.remove(refContainer.current);
    if (blockScroll) {
      unblockNoScroll();
    }
    if (refContainer.current && !container) {
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
    } else if (!open && showPortal) {
      handleClose();
    }
  }, [open]);

  const handleEntered = () => {
    if (onEntered) {
      onEntered();
    }
  };

  const handleExited = () => {
    if (onExited) {
      onExited();
    }

    if (!open) {
      setShowPortal(false);
    }

    if (blockScroll) {
      unblockNoScroll();
    }
  };

  console.log('open', open);
  console.log('showPortal', showPortal);
  console.log('refContainer.current', refContainer.current);

  if (!showPortal) {
    return null;
  }

  return ReactDom.createPortal(
    <CSSTransition
      in={open}
      appear
      classNames={{
        appear: 'transitionEnter',
        appearActive: 'transitionEnterActive',
        enter: 'transitionEnter',
        enterActive: 'transitionEnterActive',
        exit: 'transitionExit',
        exitActive: 'transitionExitActive',
      }}
      timeout={animationDuration}
      onEntered={handleEntered}
      onExited={handleExited}
    >
      <div>Hey show me that modal</div>
    </CSSTransition>,
    container || refContainer.current!
  );
};
