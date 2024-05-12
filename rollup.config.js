import styles from "rollup-plugin-styles";
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';
import del from 'rollup-plugin-delete';

const autoprefixer = require('autoprefixer');

// import tsConfig from './tsconfig.json';

const conf = {
    input: 'src/index.ts',
    output: {
        file: `dist/index.cjs.js`,
        format: 'cjs'
    },
    // this externelizes react to prevent rollup from compiling it
    external: ["react", /@babel\/runtime/],
    plugins: [
        // these are babel comfigurations
        babel({
            exclude: 'node_modules/**',
            plugins: ['@babel/transform-runtime'],
            babelHelpers: 'runtime'
        }),
        // this adds sourcemaps
        sourcemaps(),
        del({targets:'dist/*'}),
        // this adds support for styles
        styles({
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            }
        }),
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: "ESNext"
                },
            },
            // target: 'es2016',
            exclude: ['./src/**/*.test.ts', './src/**/*.test.tsx']
        })
    ],
}

export default conf;