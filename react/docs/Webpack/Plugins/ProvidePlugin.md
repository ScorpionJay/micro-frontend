# [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin)

偷懒不想 import 而是直接用，比如 http 请求，API

```
new webpack.ProvidePlugin({
    http: path.resolve(__dirname, "../src/utils/request"),
    API: path.resolve(__dirname, "../src/utils/api")
})
```

下面的可以注释了

```
// import Request from "Utils/request";
// console.log("Request", http);
// import API from "Utils/api";
// console.log('API', API);
```

直接使用

```
let response = await http({
    url: API.common.login,
    data,
    headers: { token: data.result }
  });
```
