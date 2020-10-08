const path = require('path')
const glob = require('glob')

const entries = {}
const srcDir = './src/js'
glob
  .sync('**/*.js', {
    cwd: srcDir,
  })
  .map(function(key) {
    // {key:value}の連想配列を生成
    // { **/*.js : './src/**/*.js' }という形式のobjectになる
    entries[key] = path.resolve(srcDir, key)
  })

module.exports = {
  mode: 'production',

  entry: entries,
  output: {
    path: __dirname,
    filename: '[name]',
  },

  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  devtool: 'source-map',
}
