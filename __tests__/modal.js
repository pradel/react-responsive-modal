import React from 'react';
import { mount } from 'enzyme';
import Modal from '../src/modal';

const defaultProps = {
  classes: {},
  open: false,
  onClose: jest.fn()
}

describe('modal', () => {
  it('should have a default export', () => {
    expect(typeof Modal).toBe('function');
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
