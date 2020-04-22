/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack prod config
 */

const webpack = require("webpack");
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// .BundleAnalyzerPlugin;
// const ZipPlugin = require("zip-webpack-plugin");
const common = require("./webpack.base.config.js");

const packageName = require("../package.json").name;

module.exports = merge(common, {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${packageName}`,
    // publicPath: "https://m.shanghaim.net/micro/react/",
    publicPath: "/micro/react/",
    filename: "js/[name].[hash:4].js",
    chunkFilename: "js/[name].[contenthash:4].js",
    path: path.resolve(__dirname, "../dist")
  },
  stats: {
    warnings: false
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "image/[hash:6].[ext]"
              // outputPath: "image/",
              // publicPath: ".."
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: ".."
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[contenthash:4].css",
      chunkFilename: "css/[name].[contenthash:4].css"
    })
    // analyzer bundle
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8889
    // }),
    // new webpack.BannerPlugin("Build in " + new Date()),
    // new ZipPlugin({
    //   // path: "../",
    //   // pathPrefix: "www",
    //   filename: "dist.zip"
    // })
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      new TerserPlugin({
        terserOptions: {
          parallel: true,
          cache: true,
          compress: { warnings: false, drop_console: true, unused: true },
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: "all", //all, async, and initial
      // minChunks: 3,
      name: false,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        // packaged css in one file
        styles: {
          name: "styles",
          test: /\.(less|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
});
