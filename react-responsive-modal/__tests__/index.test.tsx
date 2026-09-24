import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, it, expect, vitest } from 'vite-plus/test';

import { Modal } from '../src';

const originalInnerWidth = window.innerWidth;

const mockScrollBarWidth = (scrollBarWidth: number, innerWidth: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: innerWidth,
  });
  Object.defineProperty(document.documentElement, 'clientWidth', {
    writable: true,
    configurable: true,
    value: innerWidth - scrollBarWidth,
  });
};

const restoreScrollBarWidth = () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: originalInnerWidth,
  });
  Reflect.deleteProperty(document.documentElement, 'clientWidth');
};

describe('modal', () => {
  describe('overlay', () => {
    it('should call onClose when click on the overlay', () => {
      const onClose = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should disable the handler when closeOnOverlayClick is false', () => {
      const onClose = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose} closeOnOverlayClick={false}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should ignore the overlay click if the event does not come from the overlay', () => {
      const onClose = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('key events', () => {
    it('an invalid event should not call onClose', () => {
      const onClose = vitest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { key: 'Enter', keyCode: 13 });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when closeOnEsc is false', () => {
      const onClose = vitest.fn();
      const { container } = render(
        <Modal open onClose={onClose} closeOnEsc={false}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when pressing esc key', () => {
      const onClose = vitest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose of last modal only when pressing esc key when multiple modals are opened', () => {
      const onClose = vitest.fn();
      const onClose2 = vitest.fn();
      const { container } = render(
        <>
          <Modal open onClose={onClose}>
            <div>modal content</div>
          </Modal>
          <Modal open onClose={onClose2}>
            <div>modal content</div>
          </Modal>
        </>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).not.toHaveBeenCalled();
      expect(onClose2).toHaveBeenCalledTimes(1);
    });
  });

  describe('body scroll', () => {
    beforeEach(() => {
      document.body.removeAttribute('style');
      restoreScrollBarWidth();
    });

    it('should not block the scroll when modal is rendered closed', () => {
      render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');
    });

    it('should block the scroll when modal is rendered open', () => {
      render(
        <Modal open={true} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should block scroll when prop open change to true', () => {
      const { rerender } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');

      rerender(
        <Modal open={true} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unblock scroll when prop open change to false', async () => {
      const { rerender, queryByTestId, getByTestId } = render(
        <Modal open={true} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal open={false} onClose={() => null} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );
      // Simulate the browser animation end
      fireEvent.animationEnd(getByTestId('modal'));
      await waitFor(
        () => {
          expect(queryByTestId('modal')).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );

      expect(document.body.style.overflow).toBe('');
    });

    it('should unblock scroll when unmounted directly', async () => {
      const { unmount } = render(
        <Modal open={true} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('should unblock scroll when multiple modals are opened and then closed', async () => {
      const { rerender, getAllByTestId, queryByText } = render(
        <React.Fragment>
          <Modal open onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      // We close one modal, the scroll should be locked
      rerender(
        <React.Fragment>
          <Modal open onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );

      fireEvent.animationEnd(getAllByTestId('modal')[1]);
      await waitFor(
        () => {
          expect(queryByText(/second modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('hidden');

      // We close the second modal, the scroll should be unlocked
      rerender(
        <React.Fragment>
          <Modal open={false} onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );

      fireEvent.animationEnd(getAllByTestId('modal')[0]);
      await waitFor(
        () => {
          expect(queryByText(/first modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('');
    });

    it('should unblock scroll when one modal is closed and the one still open has blockScroll set to false', async () => {
      const { rerender, getAllByTestId, queryByText } = render(
        <React.Fragment>
          <Modal open blockScroll={false} onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      // We close one modal, the scroll should be unlocked as remaining modal is not locking the scroll
      rerender(
        <React.Fragment>
          <Modal open blockScroll={false} onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );

      fireEvent.animationEnd(getAllByTestId('modal')[1]);
      await waitFor(
        () => {
          expect(queryByText(/second modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('');
    });
    it('should reserve scroll bar gap', () => {
      const scrollBarWidth = 42;
      mockScrollBarWidth(scrollBarWidth, 500);
      render(
        <Modal open={true} onClose={() => null} reserveScrollBarGap={true}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.paddingRight).toBe(`${scrollBarWidth}px`);
    });

    it('should restore pre-existing body styles when modal is closed', async () => {
      document.body.style.overflow = 'scroll';
      document.body.style.paddingRight = '10px';

      const { rerender, getByTestId, queryByTestId } = render(
        <Modal open onClose={() => null} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal open={false} onClose={() => null} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));
      await waitFor(
        () => {
          expect(queryByTestId('modal')).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.paddingRight).toBe('10px');
    });

    it('should overwrite and restore pre-existing body padding when reserveScrollBarGap is used', async () => {
      const scrollBarWidth = 42;
      mockScrollBarWidth(scrollBarWidth, 500);
      document.body.style.paddingRight = '10px';

      const { rerender, getByTestId, queryByTestId } = render(
        <Modal
          open
          onClose={() => null}
          reserveScrollBarGap
          animationDuration={0}
        >
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.paddingRight).toBe(`${scrollBarWidth}px`);

      rerender(
        <Modal
          open={false}
          onClose={() => null}
          reserveScrollBarGap
          animationDuration={0}
        >
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));
      await waitFor(
        () => {
          expect(queryByTestId('modal')).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );

      expect(document.body.style.paddingRight).toBe('10px');
    });

    it('should keep the scroll bar gap until the last modal is closed', async () => {
      const scrollBarWidth = 42;
      mockScrollBarWidth(scrollBarWidth, 500);

      const { rerender, getAllByTestId, queryByText } = render(
        <React.Fragment>
          <Modal
            open
            onClose={() => null}
            reserveScrollBarGap
            animationDuration={0}
          >
            <div>first modal</div>
          </Modal>
          <Modal open onClose={() => null} animationDuration={0}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.paddingRight).toBe(`${scrollBarWidth}px`);

      rerender(
        <React.Fragment>
          <Modal
            open
            onClose={() => null}
            reserveScrollBarGap
            animationDuration={0}
          >
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null} animationDuration={0}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      fireEvent.animationEnd(getAllByTestId('modal')[1]);
      await waitFor(
        () => {
          expect(queryByText(/second modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.paddingRight).toBe(`${scrollBarWidth}px`);

      rerender(
        <React.Fragment>
          <Modal
            open={false}
            onClose={() => null}
            reserveScrollBarGap
            animationDuration={0}
          >
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null} animationDuration={0}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      fireEvent.animationEnd(getAllByTestId('modal')[0]);
      await waitFor(
        () => {
          expect(queryByText(/first modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );

      expect(document.body.style.overflow).toBe('');
      expect(document.body.style.paddingRight).toBe('');
    });

    it('should unblock scroll when blockScroll changes to false while open', () => {
      const { rerender } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal open blockScroll={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('closeIcon', () => {
    it('should render the closeIcon by default', () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );

      expect(getByTestId('close-button')).toMatchSnapshot();
    });

    it('should hide closeIcon when showCloseIcon is false', () => {
      const { queryByTestId } = render(
        <Modal open onClose={() => null} showCloseIcon={false}>
          <div>modal content</div>
        </Modal>,
      );

      expect(queryByTestId('close-button')).toBeNull();
    });

    it('should call onClose when clicking on the icon', () => {
      const onClose = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('close-button'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('render', () => {
    it('should render null when then modal is not open', () => {
      const { queryByText } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByText(/modal content/)).toBeNull();
    });

    it('should render the content when modal is open', () => {
      const { queryByText } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByText(/modal content/)).toBeTruthy();
    });
  });

  describe('lifecycle', () => {
    it('should show modal when prop open change to true', () => {
      const { queryByTestId, rerender } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByTestId('modal')).toBeNull();
      rerender(
        <Modal open={true} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByTestId('modal')).toBeTruthy();
    });

    it('should hide modal when prop open change to false', async () => {
      const { getByTestId, queryByTestId, rerender } = render(
        <Modal open={true} onClose={() => null} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByTestId('modal')).toBeTruthy();
      rerender(
        <Modal open={false} onClose={() => null} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));
      expect(queryByTestId('modal')).toBeNull();
    });
  });

  describe('prop: center', () => {
    it('should not apply center class by default', async () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );

      expect(getByTestId('modal-container').classList.length).toBe(1);
      expect(
        getByTestId('modal-container').classList.contains(
          'react-responsive-modal-containerCenter',
        ),
      ).toBeFalsy();
    });

    it('should apply center class to modal', async () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null} center>
          <div>modal content</div>
        </Modal>,
      );

      expect(getByTestId('modal-container').classList.length).toBe(2);
      expect(
        getByTestId('modal-container').classList.contains(
          'react-responsive-modal-containerCenter',
        ),
      ).toBeTruthy();
    });
  });

  describe('prop: closeIcon', () => {
    it('should render custom icon instead of the default one', async () => {
      const { queryByTestId, getByTestId } = render(
        <Modal
          open
          onClose={() => null}
          closeIcon={<div data-testid="custom-icon">custom icon</div>}
        >
          <div>modal content</div>
        </Modal>,
      );

      expect(queryByTestId('close-icon')).toBeNull();
      expect(getByTestId('custom-icon')).toMatchSnapshot();
    });
  });

  describe('prop: classNames', () => {
    it('should apply custom classes to the modal', async () => {
      const { getByTestId } = render(
        <Modal
          open
          onClose={() => null}
          classNames={{
            overlay: 'custom-overlay',
            modal: 'custom-modal',
            closeButton: 'custom-closeButton',
            closeIcon: 'custom-closeIcon',
          }}
        >
          <div>modal content</div>
        </Modal>,
      );

      expect(getByTestId('overlay').classList).toContain(
        'react-responsive-modal-overlay',
      );
      expect(getByTestId('overlay').classList).toContain('custom-overlay');
      expect(getByTestId('modal').classList).toContain(
        'react-responsive-modal-modal',
      );
      expect(getByTestId('modal').classList).toContain('custom-modal');
      expect(getByTestId('close-button').classList).toContain(
        'react-responsive-modal-closeButton',
      );
      expect(getByTestId('close-button').classList).toContain(
        'custom-closeButton',
      );
      expect(getByTestId('close-icon').classList).toContain('custom-closeIcon');
    });
  });

  describe('prop: blockScroll', () => {
    it('should not block the scroll when modal is opened and blockScroll is false', () => {
      render(
        <Modal open blockScroll={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('prop: onEscKeyDown', () => {
    it('should be called when esc key is pressed', async () => {
      const onEscKeyDown = vitest.fn();
      const { container } = render(
        <Modal open onClose={() => null} onEscKeyDown={onEscKeyDown}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onEscKeyDown).toHaveBeenCalledTimes(1);
    });

    it('should call the latest onEscKeyDown after the prop is updated', async () => {
      const onEscKeyDown = vitest.fn();
      const onEscKeyDownUpdated = vitest.fn();
      const { container, rerender } = render(
        <Modal open onClose={() => null} onEscKeyDown={onEscKeyDown}>
          <div>modal content</div>
        </Modal>,
      );

      rerender(
        <Modal open onClose={() => null} onEscKeyDown={onEscKeyDownUpdated}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onEscKeyDown).not.toHaveBeenCalled();
      expect(onEscKeyDownUpdated).toHaveBeenCalledTimes(1);
    });

    it('should call the latest onClose after the prop is updated', async () => {
      const onClose = vitest.fn();
      const onCloseUpdated = vitest.fn();
      const { container, rerender } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      rerender(
        <Modal open onClose={onCloseUpdated}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).not.toHaveBeenCalled();
      expect(onCloseUpdated).toHaveBeenCalledTimes(1);
    });

    it('should not leak the esc handler when the modal is closed and reopened', async () => {
      const onClose = vitest.fn();
      const { getByTestId, rerender } = render(
        <Modal open onClose={onClose} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );

      rerender(
        <Modal open={false} onClose={onClose} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));

      rerender(
        <Modal open onClose={onClose} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(document, { keyCode: 27 });
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop: onOverlayClick', () => {
    it('should be called when user click on overlay', async () => {
      const onOverlayClick = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} onOverlayClick={onOverlayClick}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop: onAnimationEnd', () => {
    it('should be called when the animation is finished', async () => {
      const onAnimationEnd = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} onAnimationEnd={onAnimationEnd}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.animationEnd(getByTestId('modal'));
      expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop: containerId', () => {
    it('should renders container div with id', async () => {
      const containerId = 'container-id';
      const { getByTestId } = render(
        <Modal open onClose={() => null} containerId={containerId}>
          <div>modal content</div>
        </Modal>,
      );

      const containerModal = getByTestId('modal-container');
      expect(containerModal.getAttribute('id')).toBe(containerId);
      expect(document.getElementById(containerId)).toBeInTheDocument();
    });
  });

  describe('prop: modalId', () => {
    it('should renders modal div with id', async () => {
      const modalId = 'modal-id';
      const { getByTestId } = render(
        <Modal open onClose={() => null} modalId={modalId}>
          <div>modal content</div>
        </Modal>,
      );

      const modal = getByTestId('modal');
      expect(modal.getAttribute('id')).toBe(modalId);
      expect(document.getElementById(modalId)).toBeInTheDocument();
    });
  });

  describe('prop: ariaLabel', () => {
    it('should render modal with aria-label attribute', async () => {
      const ariaLabel = 'Custom modal label';
      const { getByTestId } = render(
        <Modal open onClose={() => null} ariaLabel={ariaLabel}>
          <div>modal content</div>
        </Modal>,
      );

      const modal = getByTestId('modal');
      expect(modal.getAttribute('aria-label')).toBe(ariaLabel);
    });
  });

  describe('prop: dir', () => {
    it('should render the modal with the dir attribute', async () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null} dir="rtl">
          <div>modal content</div>
        </Modal>,
      );

      expect(getByTestId('root').getAttribute('dir')).toBe('rtl');
    });

    it('should not render the dir attribute by default', async () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );

      expect(getByTestId('root').hasAttribute('dir')).toBe(false);
    });
  });

  describe('prop: ref', () => {
    it('should set the modal element to a ref object', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { getByTestId } = render(
        <Modal open onClose={() => null} ref={ref}>
          <div>modal content</div>
        </Modal>,
      );

      expect(ref.current).toBe(getByTestId('modal'));
    });

    it('should call a ref callback with the modal element', () => {
      const ref = vitest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} ref={ref}>
          <div>modal content</div>
        </Modal>,
      );

      expect(ref).toHaveBeenLastCalledWith(getByTestId('modal'));
    });

    it('should call a ref callback with null when the modal is not open', () => {
      const ref = vitest.fn();
      render(
        <Modal open={false} onClose={() => null} ref={ref}>
          <div>modal content</div>
        </Modal>,
      );

      expect(ref).toHaveBeenLastCalledWith(null);
    });

    it('should call a ref callback with null when the modal is closed', () => {
      const ref = vitest.fn();
      const { getByTestId, rerender } = render(
        <Modal open onClose={() => null} ref={ref} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      expect(ref).toHaveBeenLastCalledWith(getByTestId('modal'));

      rerender(
        <Modal
          open={false}
          onClose={() => null}
          ref={ref}
          animationDuration={0.01}
        >
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));

      expect(ref).toHaveBeenLastCalledWith(null);
    });

    it('should reset the ref when the modal is closed', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { getByTestId, rerender } = render(
        <Modal open onClose={() => null} ref={ref} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      expect(ref.current).toBe(getByTestId('modal'));

      rerender(
        <Modal
          open={false}
          onClose={() => null}
          ref={ref}
          animationDuration={0.01}
        >
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));

      expect(ref.current).toBeNull();
    });

    it('should keep the ref empty when the modal is not open', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Modal open={false} onClose={() => null} ref={ref}>
          <div>modal content</div>
        </Modal>,
      );

      expect(ref.current).toBeNull();
    });

    it('should set the new modal element to the ref when the modal is reopened', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { getByTestId, rerender } = render(
        <Modal open onClose={() => null} ref={ref} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      const firstModal = getByTestId('modal');

      rerender(
        <Modal
          open={false}
          onClose={() => null}
          ref={ref}
          animationDuration={0.01}
        >
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));
      rerender(
        <Modal open onClose={() => null} ref={ref} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );

      expect(ref.current).toBe(getByTestId('modal'));
      expect(ref.current).not.toBe(firstModal);
    });

    it('should reset the ref when the modal is unmounted', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { unmount } = render(
        <Modal open onClose={() => null} ref={ref}>
          <div>modal content</div>
        </Modal>,
      );
      expect(ref.current).not.toBeNull();

      unmount();

      expect(ref.current).toBeNull();
    });
  });
});
