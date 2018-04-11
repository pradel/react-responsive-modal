import React from 'react';
import { mount } from 'enzyme';
import CSSTransition from 'react-transition-group/CSSTransition';
import Modal from '../src/modal';

const defaultProps = {
  classes: {
    overlay: 'test-react-responsive-modal-overlay',
    overlayLittle: 'test-react-responsive-modal-overlay-little',
    modal: 'test-react-responsive-modal-modal',
    closeButton: 'test-react-responsive-modal-close-button',
    closeIcon: 'test-react-responsive-modal-close-icon',
    transitionEnter: 'test-react-responsive-modal-transition-enter',
    transitionEnterActive: 'test-react-responsive-modal-transition-enter-active',
    transitionExit: 'test-react-responsive-modal-transition-exit',
    transitionExitActive: 'test-react-responsive-modal-transition-exit-active',
  },
  open: false,
  onClose: jest.fn()
};

const mockEvent = {
  stopPropagation: jest.fn(),
  target: {}
};

describe('modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEvent.target = {};
  });

  it('should have a default export', () => {
    expect(typeof Modal).toBe('function');
  });

  describe('overlay', () => {
    it('should pass the animationDuration prop to react-transition-group', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open animationDuration={123}>
          <div>modal content</div>
        </Modal>
      );
  
      const transitionWrapper = wrapper.find(CSSTransition);
      expect(transitionWrapper.length).toBe(1);
      expect(transitionWrapper.props().timeout).toBe(123);
    });

    it('should attach a handler to the overlay that fire onClose', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );
  
      const handler = wrapper.instance().handleClickOverlay;
      const overlayWrapper = wrapper.childAt(0).childAt(0).childAt(0).childAt(0);
      mockEvent.target.className = overlayWrapper.prop('className');
      handler(mockEvent);
      expect(overlayWrapper.prop('onMouseDown')).toEqual(handler);
      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should disable the handler when closeOnOverlayClick is false', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open closeOnOverlayClick={false}>
          <div>modal content</div>
        </Modal>
      );
  
      const handler = wrapper.instance().handleClickOverlay;
      const overlayWrapper = wrapper.childAt(0).childAt(0).childAt(0).childAt(0);
      mockEvent.target.className = overlayWrapper.prop('className');
      handler(mockEvent);
      expect(overlayWrapper.prop('onMouseDown')).toEqual(handler);
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should render null when then modal is not opened', () => {
      const wrapper = mount(
        <Modal {...defaultProps}>
          <div>modal content</div>
        </Modal>
      );
  
      expect(wrapper.find(Modal).length).toBe(1);
      expect(wrapper.find(Modal)).toBeEmptyRender();
    });
  
    it('should render the content', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );
  
      expect(wrapper.find(Modal).length).toBe(1);
      expect(wrapper.find(Modal)).toMatchSnapshot();
    });
  });
});
