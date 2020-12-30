const path = require('path');
const buble = require('@rollup/plugin-buble'); 
const typescript = require('@rollup/plugin-typescript');

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
      buble(),
    ],
  },
]