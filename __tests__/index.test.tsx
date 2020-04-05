import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from '../src';

describe('modal', () => {
  describe('overlay', () => {
    // it('should pass the animationDuration prop to react-transition-group', () => {
    //   const wrapper = mount(
    //     <Modal {...defaultProps} open animationDuration={123}>
    //       <div>modal content</div>
    //     </Modal>
    //   );

    //   const transitionWrapper = wrapper.find(CSSTransition);
    //   expect(transitionWrapper.length).toBe(1);
    //   expect(transitionWrapper.props().timeout).toBe(123);
    //   wrapper.unmount();
    // });

    it('should call onClose when click on the overlay', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('close-icon'));
      expect(onClose).toHaveBeenCalled();

      const overlayWrapper = wrapper.find(`.${defaultProps.classes.overlay}`);
      overlayWrapper.simulate('click');
      expect(defaultProps.onClose).toHaveBeenCalled();
      wrapper.unmount();
    });

    // it('should disable the handler when closeOnOverlayClick is false', () => {
    //   const wrapper = mount(
    //     <Modal {...defaultProps} open closeOnOverlayClick={false}>
    //       <div>modal content</div>
    //     </Modal>
    //   );

    //   const overlayWrapper = wrapper.find(`.${defaultProps.classes.overlay}`);
    //   overlayWrapper.simulate('click');
    //   expect(defaultProps.onClose).not.toHaveBeenCalled();
    //   wrapper.unmount();
    // });

    // it('should ignore the overlay click if the event does not come from the overlay', () => {
    //   const wrapper = mount(
    //     <Modal {...defaultProps} open>
    //       <div>modal content</div>
    //     </Modal>
    //   );

    //   const modalWrapper = wrapper.find(`.${defaultProps.classes.modal}`);
    //   modalWrapper.simulate('click');
    //   expect(defaultProps.onClose).not.toHaveBeenCalled();
    //   wrapper.unmount();
    // });
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

      expect(getByTestId('close-icon')).toMatchSnapshot();
    });

    it('should hide closeIcon when showCloseIcon is false', () => {
      const { queryByTestId } = render(
        <Modal open onClose={() => null} showCloseIcon={false}>
          <div>modal content</div>
        </Modal>
      );

      expect(queryByTestId('close-icon')).toBeNull();
    });

    it('should call onClose when clicking on the icon', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>
      );

      fireEvent.click(getByTestId('close-icon'));
      expect(onClose).toHaveBeenCalled();
    });
  });
});
