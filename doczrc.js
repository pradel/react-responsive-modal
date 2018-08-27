import { css } from 'docz-plugin-css';

export default {
  title: 'react-responsive-modal',
  description: 'A simple responsive react modal',
  src: '.',
  plugins: [
    css({
      preprocessor: 'postcss',
      cssmodules: true
    })
  ]
};