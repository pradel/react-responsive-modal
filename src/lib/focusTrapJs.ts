// https://github.com/alexandrzavalii/focus-trap-js/blob/master/src/index.js v1.1.0

export const candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
];

function isHidden(node: any) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return (
    node.offsetParent === null || getComputedStyle(node).visibility === 'hidden'
  );
}

function getCheckedRadio(nodes: any, form: any) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
}

function isNotRadioOrTabbableRadio(node: any) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio' || !node.name) {
    return true;
  }
  var radioScope = node.form || node.ownerDocument;
  var radioSet = radioScope.querySelectorAll(
    'input[type="radio"][name="' + node.name + '"]'
  );
  var checked = getCheckedRadio(radioSet, node.form);
  return checked === node || (checked === undefined && radioSet[0] === node);
}

export function getAllTabbingElements(parentElem: any) {
  var currentActiveElement = document.activeElement;
  var tabbableNodes = parentElem.querySelectorAll(candidateSelectors.join(','));
  var onlyTabbable = [];
  for (var i = 0; i < tabbableNodes.length; i++) {
    var node = tabbableNodes[i];
    if (
      currentActiveElement === node ||
      (!node.disabled &&
        getTabindex(node) > -1 &&
        !isHidden(node) &&
        isNotRadioOrTabbableRadio(node))
    ) {
      onlyTabbable.push(node);
    }
  }
  return onlyTabbable;
}

export function tabTrappingKey(event: any, parentElem: any) {
  // check if current event keyCode is tab
  if (!event || event.key !== 'Tab') return;

  if (!parentElem || !parentElem.contains) {
    if (process && process.env.NODE_ENV === 'development') {
      console.warn('focus-trap-js: parent element is not defined');
    }
    return false;
  }

  if (!parentElem.contains(event.target)) {
    return false;
  }

  var allTabbingElements = getAllTabbingElements(parentElem);
  var firstFocusableElement = allTabbingElements[0];
  var lastFocusableElement = allTabbingElements[allTabbingElements.length - 1];

  if (event.shiftKey && event.target === firstFocusableElement) {
    lastFocusableElement.focus();
    event.preventDefault();
    return true;
  } else if (!event.shiftKey && event.target === lastFocusableElement) {
    firstFocusableElement.focus();
    event.preventDefault();
    return true;
  }
  return false;
}

function getTabindex(node: any) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!isNaN(tabindexAttr)) return tabindexAttr;
  // Browsers do not return tabIndex correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function isContentEditable(node: any) {
  return node.getAttribute('contentEditable');
}
