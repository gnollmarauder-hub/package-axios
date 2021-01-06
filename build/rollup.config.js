const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const { babel }  = require('@rollup/plugin-babel')

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = [
  {
    input: resolveFile('src/index.ts'),
    output: {
      globals: {
        'axios': 'axios',
        'js-cookie': 'Cookies'
      },
      file: resolveFile('dist/index.js'),
      format: 'umd',
      name: 'adAxios',
    },
    external: ['axios', 'js-cookie'],
    plugins: [
      typescript(),
      babel({
        babelrc: false,
        babelHelpers: 'runtime',
        presets: [['@babel/preset-env', { 
          modules: false
        }]],
        plugins: [["@babel/plugin-transform-runtime", {
          corejs: 3,
          useESModules: true
        }]]
      })
    ],
  },
]