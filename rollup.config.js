import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'react-lifecycles-compat',
    'react-transition-group/CSSTransition',
    'classnames',
    'no-scroll',
    'react-minimalist-portal',
  ],
  plugins: [
    postcss({
      modules: true,
      inject: {
        insertAt: 'top',
      },
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve(),
    commonjs(),
  ],
};
