/**
 * @author Jay
 * @date 2019-4-1
 * @description  webpack base config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ENV = process.env.NODE_ENV || "development";
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// css loader
const cssLoader = require("./utils/cssLoader");

const packageName = require("../package.json").name;

module.exports = {
  mode: ENV,
  entry: {
    index: "./src/index.js"
  },
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${packageName}`,
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist")
    // publicPath: "http://192.168.0.108:9101/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      ...cssLoader
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@config": path.resolve(__dirname, "../config/"),
      "@containers": path.resolve(__dirname, "../src/containers/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@styles": path.resolve(__dirname, "../src/styles/"),
      "@utils": path.resolve(__dirname, "../src/utils/"),
      "@image": path.resolve(__dirname, "../src/static/images/"),
      Styles: path.resolve(__dirname, "../src/style/"),
      Utils: path.resolve(__dirname, "../src/utils/"),
      Components: path.resolve(__dirname, "../src/components/"),
      Context: path.resolve(__dirname, "../src/context/")
    },
    extensions: [".js", ".jsx", ".less"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ["**/*", "!dll/**"]
    }),
    // new CopyPlugin([{ from: "static/", to: "static/" }]),
    new webpack.ProvidePlugin({
      http: [path.resolve(__dirname, "../src/utils/request"), "default"],
      API: [path.resolve(__dirname, "../src/utils/api"), "default"]
    }),
    new CopyPlugin([{ from: "src/json/", to: "json/" }]),
    // new webpack.DllReferencePlugin({
    //   manifest: require("../dll/react.manifest.json")
    // }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      favicon: "./src/static/images/favicon.ico",
      title: "react-pc-init",
      inject: true,
      minify: ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
      }
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, "../dll/*.dll.js"),
    //   outputPath: "js",
    //   publicPath: "js",
    //   includeSourcemap: false,
    //   hash: true
    // }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV)
    })
  ]
};
