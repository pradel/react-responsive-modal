const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const decamelize = require('decamelize');
const styles = require('../lib/styles').default;

function getValue(key, value) {
  if (key === 'maxWidth') {
    return `${value}px`;
  }
  return value;
}

const prefix = 'react-responsive-modal';
// Generate css file
let css = '';
Object.keys(styles).forEach(key => {
  css += `.${prefix}-${key} {\n`;
  Object.keys(styles[key]).forEach(keyStyle => {
    css += `${keyStyle}: ${getValue(keyStyle, styles[key][keyStyle])};\n`;
  });
  css += '}\n';
});
fs.writeFileSync('./lib/react-responsive-modal.css', decamelize(css, '-'));
