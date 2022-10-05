import { babel } from '@rollup/plugin-babel';
import glsl from 'rollup-plugin-glsl';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import livereload from 'rollup-plugin-livereload';
import ts from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import image from '@rollup/plugin-image';
import typescript from 'typescript';

const env = process.env.__ENV;
const production = env === 'production';
const devOutput = {
  sourcemap: true,
  file: 'lib/index.js',
  format: 'esm'
};
const productionOutput = [
  {
    file: 'lib/bundle-esm.js',
    format: 'esm'
  }
];

const config = {
  input: production ? 'src/index.ts' : 'src/app.ts',
  output: production ? productionOutput : devOutput,
  plugins: [
    image(),
    glsl({
      // By default, everything gets included
      include: 'src/**/*.glsl',

      // Undefined by default
      exclude: ['**/index.html'],

      // Source maps are on by default
      sourceMap: true
    }),
    ts({
      typescript,
      tsconfig: production ? 'ts/es.tsconfig.json' : 'tsconfig.json'
    }),
    !production && sourcemaps(),
    nodeResolve({
      jail: 'src'
    }),
    !production && babel({ babelHelpers: 'bundled' }),
    !production && serve({
      port: 3000
    }),
    !production && livereload({
      watch: 'lib',
      verbose: true, // Disable console output

      // other livereload options
      port: 35729
    })
  ]
};

export default config;
