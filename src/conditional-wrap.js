import React from 'react';
import PropTypes from 'prop-types';

const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : <div>{children}</div>;

ConditionalWrap.propTypes = {
  condition: PropTypes.bool,
  wrap: PropTypes.func,
  children: PropTypes.node
}

ConditionalWrap.defaultProps = {
  condition: false,
  wrap: null,
  children: null
}

export default ConditionalWrap;
