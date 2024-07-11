import typescript from 'rollup-plugin-typescript2';
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.ts',
  output: [
    {
      file: "./build/index.js",
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: "./build/index.es.js",
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        exclude: [
          'node_modules',
          'build',
          'src/**/*.stories.tsx',
          'src/**/*.test.tsx',
        ],
      },
    }),
    includePaths({ paths: ['./src'] }),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
