const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;

export default ConditionalWrap;
