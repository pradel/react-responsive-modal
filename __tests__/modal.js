import React from 'react';
import { mount } from 'enzyme';
import FocusTrap from 'focus-trap-react';
import CSSTransition from 'react-transition-group/CSSTransition';
import Modal from '../src/modal';

const defaultProps = {
  classes: {
    overlay: 'test-react-responsive-modal-overlay',
    modal: 'test-react-responsive-modal-modal',
    modalCenter: 'test-react-responsive-modal-modal-center',
    closeButton: 'test-react-responsive-modal-close-button',
    closeIcon: 'test-react-responsive-modal-close-icon',
    transitionEnter: 'test-react-responsive-modal-transition-enter',
    transitionEnterActive:
      'test-react-responsive-modal-transition-enter-active',
    transitionExit: 'test-react-responsive-modal-transition-exit',
    transitionExitActive: 'test-react-responsive-modal-transition-exit-active',
  },
  open: false,
  onClose: jest.fn(),
  animationDuration: 50,
};

const mockEvent = {
  stopPropagation: jest.fn(),
  target: {},
};

const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time));

describe('modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEvent.target = {};
  });

 

  describe('block scroll', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <Modal {...defaultProps}>
          <div>modal content</div>
        </Modal>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it('should not block the scroll when closed', () => {
      expect(document.documentElement.style.overflow).toBe('');
    });

    it('should block the scroll when opened', () => {
      wrapper.setProps({ open: true });
      expect(document.documentElement.style.overflow).toBe('hidden');
    });

    it('should unblock the scroll after animation', async () => {
      wrapper.setProps({ open: false });
      expect(document.documentElement.style.overflow).toBe('hidden');
      await wait();
      expect(document.documentElement.style.overflow).toBe('');
    });
  });

  describe('prop: onEntered', () => {
    it('should be called when component animation is finished', async () => {
      const onEntered = jest.fn();
      const wrapper = mount(
        <Modal {...defaultProps} open onEntered={onEntered}>
          <div>modal content</div>
        </Modal>
      );

      expect(onEntered).not.toHaveBeenCalled();
      await wait();

      expect(onEntered).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('prop: onExited', () => {
    it('should be called when component animation is finished', async () => {
      const onExited = jest.fn();
      const wrapper = mount(
        <Modal {...defaultProps} open onExited={onExited}>
          <div>modal content</div>
        </Modal>
      );

      await wait();
      wrapper.setProps({ open: false });
      expect(onExited).not.toHaveBeenCalled();
      await wait();

      expect(onExited).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('prop: blockScroll', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <Modal {...defaultProps} blockScroll={false}>
          <div>modal content</div>
        </Modal>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it('should not block the scroll when closed', () => {
      expect(document.documentElement.style.overflow).toBe('');
    });

    it('should not block the scroll when opened', () => {
      wrapper.setProps({ open: true });
      expect(document.documentElement.style.overflow).toBe('');
    });

    it('should not block the scroll before or after animation', async () => {
      wrapper.setProps({ open: false });
      expect(document.documentElement.style.overflow).toBe('');
      await wait();
      expect(document.documentElement.style.overflow).toBe('');
    });
  });

  describe('prop: focusTrapped', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it('should contain focus trap component when true (default)', () => {
      expect(wrapper.find(FocusTrap).exists()).toBe(true);
    });

    it('should not contain focus trap component when false', () => {
      wrapper.setProps({ focusTrapped: false });
      expect(wrapper.find(FocusTrap).exists()).toBe(false);
    });

    describe('prop: focusTrapOptions', () => {
      it('should have a default option for clickOutsideDeactivates true', () => {
        wrapper.setProps({ focusTrapped: true });
        expect(wrapper.find(FocusTrap).prop('focusTrapOptions')).toEqual({
          clickOutsideDeactivates: true,
        });
      });

      it('should override clickOutsideDeactivates if specified', () => {
        const focusTrapOptions = {
          clickOutsideDeactivates: false,
        };
        wrapper.setProps({ focusTrapOptions, focusTrapped: true });
        expect(wrapper.find(FocusTrap).prop('focusTrapOptions')).toEqual(
          focusTrapOptions
        );
      });

      it('should pass focusTrapOptions', () => {
        const focusTrapOptions = {
          clickOutsideDeactivates: false,
          escapeDeactivates: false,
          returnFocusOnDeactivate: false,
        };
        wrapper.setProps({ focusTrapOptions, focusTrapped: true });
        expect(wrapper.find(FocusTrap).prop('focusTrapOptions')).toEqual(
          focusTrapOptions
        );
      });
    });
  });
});
