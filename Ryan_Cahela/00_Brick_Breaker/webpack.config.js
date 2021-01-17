const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?(js)$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
};
