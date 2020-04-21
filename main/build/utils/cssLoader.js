/**
 * @author Jay
 * @date 2019-4-1
 * @description css loader
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ENV = process.env.NODE_ENV || "development";
const theme = require("./theme.json");

/**
 * px to rem
 */
const px2rem = require("postcss-pxtorem")({
  rootValue: 100,
  propList: [
    "font",
    "font-size",
    "width",
    "max-width",
    "height",
    "max-height",
    "padding",
    "margin",
    "line-height",
    "letter-spacing"
  ]
});

/**
 * post css loader
 */
const postcssLoader =
  ENV === "production"
    ? {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-preset-env")({
              flexbox: "no-2009"
            }),
            // px2rem,
            require("cssnano")({
              preset: [
                "default",
                {
                  discardComments: {
                    removeAll: true
                  }
                }
              ]
            })
          ]
        }
      }
    : {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-preset-env")({
              flexbox: "no-2009"
            })
            // px2rem
          ]
        }
      };

const cssLoader = [
  {
    // ant-design
    test: /\.less|css$/,
    include: [/node_modules/],
    use: [
      ENV !== "production" // 生产分离出样式
        ? {
            loader: "style-loader" // creates style nodes from JS strings
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader", // translates CSS into CommonJS
        options: {
          importLoaders: 1
        }
      },
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          modifyVars: theme,
          javascriptEnabled: true
        }
      }
    ]
  },
  {
    // 公共样式
    test: /\.less|css$/,
    include: [
      path.resolve(__dirname, "../../", "src/components/"),
      path.resolve(__dirname, "../../", "src/styles/")
    ],
    use: [
      ENV !== "production" // 生产分离出样式
        ? {
            loader: "style-loader" // creates style nodes from JS strings
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          // modules: true
          importLoaders: 1
        } // translates CSS into CommonJS
      },
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }
    ]
  },
  {
    test: /\.less$/,
    exclude: [
      /node_modules/,
      path.resolve(__dirname, "../../", "src/components/"),
      path.resolve(__dirname, "../../", "src/styles/")
    ],
    use: [
      ENV !== "production" // 生产分离出样式
        ? {
            loader: "style-loader" // creates style nodes from JS strings
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]-[hash:base64:5]" // css模块化
          }
        }
      },
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }
    ]
  }
];

module.exports = cssLoader;
