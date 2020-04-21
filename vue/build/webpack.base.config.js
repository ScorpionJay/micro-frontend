/**
 * @author Jay
 * @date 2020-2-4
 * @description webpack base config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ENV = process.env.NODE_ENV || "development";

const packageName = require("../package.json").name;

module.exports = {
  mode: ENV,
  entry: {
    app: "./src/index.js"
  },
  output: {
    // path: __dirname + "/dist",
    // filename: "[name].js"
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${packageName}`,
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist")
    // publicPath: "http://localhost:9102/"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "..", "src"),
      "@config": path.join(__dirname, "..", "config"),
      "@utils": path.join(__dirname, "..", "src/utils")
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      title: "Demo",
      favicon: "./src/assets/images/favicon.ico",
      inject: true,
      minify: ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      BUILD_VERSION: JSON.stringify(new Date().toString())
    })
  ]
};
