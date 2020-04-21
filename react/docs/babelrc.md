#简介说明

> 作者：小兵
> 来源：项目重构
> 下面是简易说明，更多说明：https://babeljs.io/docs/en/babelrc
> 浏览器兼容语法预览：https://kangax.github.io/compat-table/es6/

1. 作用：Babel 是一个广泛使用的转码器，可以将 es6, es7, es8...代码转为 ES5 代码

```
    {
     "presets":[
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": ["last 2 versions"],
                    "chrome": "60",
                    "firefox": "60",
                    "safari": "10",
                    "ie": "11",
                    "edge": "17",
                    "android": "4.0",
                    "ios": "10"
                  },
                  "useBuiltIns": "usage", //此选项配置如何@babel/preset-env处理polyfill
                  "corejs": "core-js@3", // 此选项只有在使用时产生影响 useBuiltIns:使用 或 useBuiltIns:条目 ,并确保 @babel / preset-env 为你注入正确的进口 core-js 的版本。
                  "debug": true  //默认值是false 启动不输出，ture启动输出目标/插件使用和在指定的版本 插件数据版本 来 console.log 。
            }
        ],
        "@babel/preset-react"
    ],

    "plugins": [
        //按需加载 引入antd
        ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" },"ant"],
        // 按需加载 引入antd-mobile
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib","style": "css"}, "antd-mobile"],
        // 动态使用import函数导入
        "@babel/plugin-syntax-dynamic-import",
        //class 转译
        "@babel/plugin-proposal-class-properties",
        // 在webpack打包的时候，可以在js文件中混用require和export。但是不能混用import 以及module.exports。
        "@babel/plugin-transform-modules-commonjs",
        @ babel / polyfill使用的对象污染了全局范围Promise。鉴于这可能会对库作者产生问题，因此有@ babel /  s选项。它可以作为Babel插件启用，并且通过以不需要代码的方式重写代码来避免全局变量的问题
    ]
}
```

2. "presets" 预设就是一堆插件(Plugin)的组合，(简单概括就是是一系列的 plugins 集合)
   从而达到某种转译的能力。就比如 react 中使用到的 @babel/preset-react ，它就是下面几种插件的组合。

@babel/plugin-syntax-jsx
@babel/plugin-transform-react-jsx
@babel/plugin-transform-react-display-name

预设的执行顺序，它是从右往左，这主要是为了确保向后兼容，因为大多数用户将 "es2015" 放在 "stage-0" 之前。

```
    #按照Babel官网的介绍，其实Preset和Stage-X都是归属到Plugin里面的，只不过所覆盖的范围不同而已。
    举个例子，如果需要转换ES2015(ES6)的语法，那么你可以在.babelrc的plugins中按需引入check-es2015-constants、es2015-arrow-functions、es2015-block-scoped-functions等等几十个不同作用的plugin。

    #但是Babel团队为了方便，将同属ES2015的几十个Transform Plugins集合到@babel/preset-env一个Preset如果没有

    #targets:指定目标,如果没有配置默认值是{}. @babel / preset-env 默认情况下将改变所有ECMAScript 2015 +代码。更多配置 https://babeljs.io/docs/en/babel-preset-env/#options

    #"@babel/preset-react" react转移集合 https://babeljs.io/docs/en/babel-preset-react#docsNav


```

> "plugins" 是在结合中没有的需要单独配置一下，比如转译 class antd 动态导入 improt ,node 等等，插件的执行顺序是从左往右
