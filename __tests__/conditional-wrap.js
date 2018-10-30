import React from 'react';
import { shallow } from 'enzyme';
import ConditionalWrap from '../src/conditional-wrap';

describe('ConditionalWrap', () => {
    it('Should wrap when true', () => {
      const wrapper = shallow(
        <ConditionalWrap condition wrap={children => <a href='/'>{children}</a>} >
          <p>content</p>
        </ConditionalWrap>
      );
  
      expect(wrapper.find('a').length).toBe(1);
      expect(wrapper.find('p').length).toBe(1);
    });
    it('Should not wrap when false', () => {
      const wrapper = shallow(
        <ConditionalWrap condition={false} wrap={children => <a href='/'>{children}</a>} >
          <p>content</p>
        </ConditionalWrap>
      );
  
      expect(wrapper.find('a').length).toBe(0);
      expect(wrapper.find('p').length).toBe(1);
    });
    it('Should not wrap when undefined', () => {
      const wrapper = shallow(
        <ConditionalWrap wrap={children => <a href='/'>{children}</a>} >
          <p>content</p>
        </ConditionalWrap>
      );
  
      expect(wrapper.find('a').length).toBe(0);
      expect(wrapper.find('p').length).toBe(1);
    });
});