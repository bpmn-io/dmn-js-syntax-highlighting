import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';

const externals = [
  'inferno',
  'dmn-js',
  'dmn-js-shared/lib/components/EditableComponent',
  'dmn-js-shared/lib/util/ModelUtil',
  'dmn-js-decision-table/lib/features/decision-rules',
  'min-dash',
  'table-js/lib/components'
];

export default [
  {
    external: externals,
    input: './lib/index.js',
    plugins: pgl(),
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      }
    ]
  },
  {
    external: externals,
    input: './lib/index.js',
    plugins: pgl([
      visualizer({
        title: 'Bundle, unminified',
        filename: 'tmp/bundlesize.html'
      })
    ]),
    output: [
      {
        format: 'esm',
        file: 'tmp/index.esm.js'
      }
    ]
  },
  {
    external: externals,
    input: './lib/index.js',
    plugins: pgl([
      terser(),
      visualizer({
        title: 'Bundle, minified',
        filename: 'tmp/bundlesize.min.html',
        sourcemap: true
      })
    ]),
    output: [
      {
        format: 'esm',
        file: 'tmp/index.esm.min.js',
        sourcemap: true
      }
    ]
  }
];

// helpers //////////////////////

function pgl(plugins = []) {
  return [
    // resolve(),
    resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    commonJS({
      include: ['node_modules/**']
    }),
    ...plugins
  ];
}
