import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';


export default [
  {
    external,
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
  ...bundlesize(process.env.BUNDLESIZE)
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

function bundlesize(enabled) {
  if (!enabled) {
    return [];
  }

  return [
    {
      external,
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
      external,
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
}

/**
 * Check if import is external.
 *
 * @param {string} name
 */
function external(name) {
  return name && [
    'inferno',
    'dmn-js',
    'min-dash',
    'table-js'
  ].some(ext => name.startsWith(ext));
}
