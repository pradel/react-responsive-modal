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

const wait = (time = 100) => new Promise(resolve => setTimeout(resolve, time));

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
      wrapper.unmount();
    });

    it('should call onClose when click on the overlay', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );

      const overlayWrapper = wrapper.find(`.${defaultProps.classes.overlay}`);
      overlayWrapper.simulate('click');
      expect(defaultProps.onClose).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('should disable the handler when closeOnOverlayClick is false', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open closeOnOverlayClick={false}>
          <div>modal content</div>
        </Modal>
      );

      const overlayWrapper = wrapper.find(`.${defaultProps.classes.overlay}`);
      overlayWrapper.simulate('click');
      expect(defaultProps.onClose).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('should ignore the overlay click if the event does not come from the overlay', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );

      const modalWrapper = wrapper.find(`.${defaultProps.classes.modal}`);
      modalWrapper.simulate('click');
      expect(defaultProps.onClose).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('esc key down', () => {
    it('an invalid event should not call onClose', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );

      const handler = wrapper.instance().handleKeydown;
      handler({ keyCode: 10 });
      expect(defaultProps.onClose).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('should not call onClose when closeOnEsc is false', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open closeOnEsc={false}>
          <div>modal content</div>
        </Modal>
      );

      const handler = wrapper.instance().handleKeydown;
      handler({ keyCode: 27 });
      expect(defaultProps.onClose).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('should call onClose', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );

      const handler = wrapper.instance().handleKeydown;
      handler({ keyCode: 27 });
      expect(defaultProps.onClose).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('closeIcon', () => {
    it('should hide closeIcon when showCloseIcon is false', () => {
      const wrapper = mount(
        <Modal
          {...defaultProps}
          open
          showCloseIcon={false}
          focusTrapped={false}
        >
          <div>modal content</div>
        </Modal>
      );

      expect(wrapper.find('CloseIcon').length).toBe(0);
      wrapper.unmount();
    });

    it('should call onClose', () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );

      wrapper.find('CloseIcon').simulate('click');
      expect(wrapper.find('CloseIcon').length).toBe(1);
      expect(defaultProps.onClose).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('render', () => {
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

    it('should render null when then modal is not opened', () => {
      expect(wrapper.find(Modal).length).toBe(1);
      expect(wrapper.find(Modal)).toBeEmptyRender();
    });

    it('should render the content', () => {
      wrapper.setProps({ open: true });
      expect(wrapper.find(Modal).length).toBe(1);
      expect(wrapper.find(Modal)).toMatchSnapshot();
    });
  });

  describe('lifecycle', () => {
    it('should show modal when prop open change to true', () => {
      const wrapper = mount(
        <Modal {...defaultProps}>
          <div>modal content</div>
        </Modal>
      );

      expect(wrapper.find(Modal)).toBeEmptyRender();
      expect(wrapper.state().showPortal).toBe(false);

      wrapper.setProps({ open: true });

      expect(wrapper.find(Modal).length).toBe(1);
      expect(wrapper.find(Modal)).not.toBeEmptyRender();
      expect(wrapper.state().showPortal).toBe(true);
      wrapper.unmount();
    });

    it('should hide modal when prop open change to false', async () => {
      const wrapper = mount(
        <Modal {...defaultProps} open>
          <div>modal content</div>
        </Modal>
      );

      expect(wrapper.find(Modal).length).toBe(1);
      expect(wrapper.find(Modal)).not.toBeEmptyRender();
      expect(wrapper.state().showPortal).toBe(true);

      wrapper.setProps({ open: false });
      await wait();

      expect(wrapper.find(Modal).html()).toBe(null);
      expect(wrapper.state().showPortal).toBe(false);
      wrapper.unmount();
    });
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

  describe('prop: onEscKeyDown', () => {
    it('should be called', async () => {
      const onEscKeyDown = jest.fn();
      const wrapper = mount(
        <Modal {...defaultProps} open onEscKeyDown={onEscKeyDown}>
          <div>modal content</div>
        </Modal>
      );

      const handler = wrapper.instance().handleKeydown;
      handler({ keyCode: 27 });
      expect(onEscKeyDown).toHaveBeenCalled();
      expect(defaultProps.onClose).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('prop: onOverlayClick', () => {
    it('should be called', async () => {
      const onOverlayClick = jest.fn();
      const wrapper = mount(
        <Modal {...defaultProps} open onOverlayClick={onOverlayClick}>
          <div>modal content</div>
        </Modal>
      );

      const handler = wrapper.instance().handleClickOverlay;
      const overlayWrapper = wrapper.find(`.${defaultProps.classes.overlay}`);
      mockEvent.target.className = overlayWrapper.prop('className');
      handler(mockEvent);
      expect(onOverlayClick).toHaveBeenCalled();
      expect(defaultProps.onClose).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('prop: center', () => {
    it('should apply center class to modal', async () => {
      const wrapper = mount(
        <Modal {...defaultProps} open center>
          <div>modal content</div>
        </Modal>
      );

      const modalWrapper = wrapper.find(`.${defaultProps.classes.modal}`);
      expect(
        modalWrapper.hasClass(defaultProps.classes.modalCenter)
      ).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('prop: classes', () => {
    it('should apply custom classes to the modal', async () => {
      const wrapper = mount(
        <Modal {...defaultProps} open center>
          <div>modal content</div>
        </Modal>
      );

      expect(wrapper.find(`.${defaultProps.classes.overlay}`)).toBeTruthy();
      expect(wrapper.find(`.${defaultProps.classes.modal}`)).toBeTruthy();
      expect(wrapper.find(`.${defaultProps.classes.modalCenter}`)).toBeTruthy();
      expect(wrapper.find(`.${defaultProps.classes.closeButton}`)).toBeTruthy();
      expect(wrapper.find(`.${defaultProps.classes.closeIcon}`)).toBeTruthy();
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
