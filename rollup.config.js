import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default [
  // UMD build (for browsers)
  {
    input: 'src/index.js',
    output: [
      {
        name: 'ColorPicker',
        file: pkg.browser,
        format: 'umd',
        exports: 'default'
      },
      {
        name: 'ColorPicker',
        file: 'dist/color-picker.js',
        format: 'umd',
        exports: 'default'
      }
    ],
    plugins: [
      postcss({
        extract: 'color-picker.css',
        minimize: true
      }),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  },
  // ESM build (for modern bundlers)
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      postcss({
        extract: false,
        inject: false
      }),
      resolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ],
    external: []
  }
];