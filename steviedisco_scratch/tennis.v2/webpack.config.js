//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'web', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  entry: './src/game.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: 'tennis.bundle.js',
    library: "tennis",
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js', '.json'],
    alias: {
      lib: path.resolve(__dirname, 'lib'),
      model: path.resolve(__dirname, 'src/model'),
      config: path.resolve(__dirname, 'src/config'),
      services: path.resolve(__dirname, 'src/services'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      behaviours: path.resolve(__dirname, 'src/behaviours')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: 'ts-loader',
        include: [
          __dirname, 
          path.resolve(__dirname, 'lib'), 
          path.resolve(__dirname, 'src')
        ],
        exclude: [path.resolve(__dirname, 'node_modules')]
      }      
    ]
  }
};
module.exports = config;