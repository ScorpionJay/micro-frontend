# **Structure**

```
tree -L 2 -a -I "node_modules|dist|docs|.git|.DS_Store"
```

```
├── .babelrc                                babelrc配置
├── .browserslistrc                         browser配置
├── .editorconfig                           编辑器配置
├── .eslintignore                           eslint忽略文件配置
├── .eslintrc                               eslint规则配置
├── .gitignore                              git忽略配置
├── .prettierignore                         prettier忽略配置
├── .prettierrc                             prettier配置
├── CHANGELOG.md                            变更记录
├── Dockerfile                              docker镜像文件
├── LICENSE                                 License
├── README.md                               README
├── build                                   webpack配置目录
│   ├── utils                                 工具
│   ├── webpack.base.config.js                基础
│   ├── webpack.dev.config.js                 开发
│   ├── webpack.dll.config.js                 dll
│   └── webpack.prod.config.js                生产
├── config                                  配置目录
│   └── index.js                              配置环境
├── dll                                     dll目录
│   ├── react.dll.js                          dll文件
│   └── react.manifest.json                   dll json文件
├── docker-compose.yml                      docker-compose目录
├── jsconfig.json                           jsconfig配置文件
├── nginx.conf                              nginx配置文件
├── package.json                            package文件
└── src                                     代码目录
    ├── README.md                             README文件
    ├── actions                               action目录
    ├── app.js                                react根文件
    ├── components                            组件目录
    ├── containers                            容器目录
    ├── context                               上下文目录
    ├── index.html                            index模版文件
    ├── index.js                              index入口文件
    ├── json                                  json目录
    ├── locales                               语言包目录
    ├── reducers                              reducer目录
    ├── static                                静态文件目录
    ├── store                                 store目录
    ├── styles                                样式目录
    └── utils                                 工具目录
        ├── api.js                              接口文件
        ├── format.js                           格式化工具文件
        ├── helper.js                           帮助工具文件
        ├── rem.js                              rem适配工具文件
        ├── request                             请求工具文件
        ├── storage.js                          存储工具文件
        └── validate.js                         验证工具文件
```
