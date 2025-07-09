import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve } from 'path';

// Use fs to read package.json instead of direct import
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(pathResolve(__dirname, './package.json'), 'utf8'));

export default [
  // UMD build (for browsers)
  {
    input: 'src/index.js',
    output: [
      {
        name: 'ColorPicker',
        file: pkg.browser,
        format: 'umd',
        exports: 'named', // Change from 'default' to 'named' to handle multiple exports
        globals: {}
      },
      {
        name: 'ColorPicker',
        file: 'dist/color-picker.js',
        format: 'umd',
        exports: 'named', // Change from 'default' to 'named' to handle multiple exports
        globals: {}
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
        // No need to specify exports for ES modules
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