import { css } from 'docz-plugin-css';
import doczPluginNetlify from 'docz-plugin-netlify';

export default {
  title: 'react-responsive-modal',
  description: 'A simple responsive react modal',
  src: '.',
  codeSandbox: false,
  plugins: [
    doczPluginNetlify(),
    css({
      preprocessor: 'postcss',
      cssmodules: true,
    }),
  ],
  filterComponents: (files) =>
    files.filter((filepath) => /w*.(js|jsx|ts|tsx)$/.test(filepath)),
};
