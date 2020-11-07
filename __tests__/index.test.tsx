import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from '../src';

describe('modal', () => {
  describe('overlay', () => {
    it('should call onClose when click on the overlay', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onClose).toHaveBeenCalled();
    });

    it('should disable the handler when closeOnOverlayClick is false', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose} closeOnOverlayClick={false}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('overlay'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should ignore the overlay click if the event does not come from the overlay', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('modal'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('key events', () => {
    it('an invalid event should not call onClose', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.keyDown(container, { key: 'Enter', keyCode: 13 });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when closeOnEsc is false', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose} closeOnEsc={false}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when pressing esc key', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('closeIcon', () => {
    it('should render the closeIcon by default', () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>
      );

      expect(getByTestId('close-button')).toMatchSnapshot();
    });

    it('should hide closeIcon when showCloseIcon is false', () => {
      const { queryByTestId } = render(
        <Modal open onClose={() => null} showCloseIcon={false}>
          <div>modal content</div>
        </Modal>
      );

      expect(queryByTestId('close-button')).toBeNull();
    });

    it('should call onClose when clicking on the icon', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('close-button'));
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should render null when then modal is not open', () => {
      const { queryByText } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>
      );
      expect(queryByText(/modal content/)).toBeNull();
    });

    it('should render the content when modal is open', () => {
      const { queryByText } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>
      );
      expect(queryByText(/modal content/)).toBeTruthy();
    });
  });

  describe('lifecycle', () => {
    it('should show modal when prop open change to true', () => {
      const { queryByTestId, rerender } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>
      );
      expect(queryByTestId('modal')).toBeNull();
      rerender(
        <Modal open={true} onClose={() => null}>
          <div>modal content</div>
        </Modal>
      );
      expect(queryByTestId('modal')).toBeTruthy();
    });

    it('should hide modal when prop open change to false', async () => {
      const { getByTestId, queryByTestId, rerender } = render(
        <Modal open={true} onClose={() => null} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>
      );
      expect(queryByTestId('modal')).toBeTruthy();
      rerender(
        <Modal open={false} onClose={() => null} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>
      );
      fireEvent.animationEnd(getByTestId('overlay'));
      expect(queryByTestId('modal')).toBeNull();
    });
  });

  describe('prop: center', () => {
    it('should not apply center class by default', async () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>
      );

      expect(getByTestId('modal').classList.length).toBe(1);
      expect(
        getByTestId('modal').classList.contains(
          'react-responsive-modal-modalCenter'
        )
      ).toBeFalsy();
    });

    it('should apply center class to modal', async () => {
      const { getByTestId } = render(
        <Modal open onClose={() => null} center>
          <div>modal content</div>
        </Modal>
      );

      expect(getByTestId('modal').classList.length).toBe(2);
      expect(
        getByTestId('modal').classList.contains(
          'react-responsive-modal-modalCenter'
        )
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
        </Modal>
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
        </Modal>
      );

      expect(
        getByTestId('overlay').classList.contains('custom-overlay')
      ).toBeTruthy();
      expect(
        getByTestId('modal').classList.contains('custom-modal')
      ).toBeTruthy();
      expect(
        getByTestId('close-button').classList.contains('custom-closeButton')
      ).toBeTruthy();
      expect(
        getByTestId('close-icon').classList.contains('custom-closeIcon')
      ).toBeTruthy();
    });
  });

  describe('prop: onEscKeyDown', () => {
    it('should be called', async () => {
      const onEscKeyDown = jest.fn();
      const { container } = render(
        <Modal open onClose={() => null} onEscKeyDown={onEscKeyDown}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onEscKeyDown).toHaveBeenCalled();
    });
  });

  describe('prop: onOverlayClick', () => {
    it('should be called', async () => {
      const onOverlayClick = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} onOverlayClick={onOverlayClick}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onOverlayClick).toHaveBeenCalled();
    });
  });

  describe('prop: onAnimationEnd', () => {
    it('should be called', async () => {
      const onAnimationEnd = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} onAnimationEnd={onAnimationEnd}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.animationEnd(getByTestId('modal'));
      expect(onAnimationEnd).toHaveBeenCalled();
    });
  });
});
