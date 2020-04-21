/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack dev config
 */

const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.config.js");

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff|eot)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [new webpack.ProgressPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    headers: { "Access-Control-Allow-Origin": "*" },
    port: 9101,
    useLocalIp: true,
    hot: true,
    hotOnly: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
});
