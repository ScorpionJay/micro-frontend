/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

// import flexible from "Utils/rem";
// flexible(window, document);

import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState
} from "qiankun";

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
// import render from "./render/ReactRender";
// import render from './render/VueRender'

/**
 * 渲染子应用
 */
function Render(props) {
  const { appContent, loading } = props;

  return (
    <>
      {/* {loading && <h4 className="subapp-loading">Loading...</h4>} */}
      <div id="subapp-viewport" />
      <div dangerouslySetInnerHTML={{ __html: appContent }} />
    </>
  );
}

export default function render({ appContent, loading }) {
  const container = document.getElementById("subapp-container");
  ReactDOM.render(<Render appContent={appContent} loading={loading} />, container);
}

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });
/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    // {
    //   name: "react16",
    //   entry: "//localhost:7100",
    //   container: "#subapp-viewport",
    //   activeRule: "/react16"
    // }
    {
      name: "react",
      // entry: "//localhost:9101",
      entry: "https://m.shanghaim.net/micro/react/index.html",
      container: "#subapp-viewport",
      activeRule: "/react"
    },
    // {
    //   name: "react15",
    //   entry: "//localhost:7102",
    //   render,
    //   activeRule: "/react15"
    // },
    {
      name: "vue",
      // entry: "//localhost:9102",
      entry: "https://m.shanghaim.net/micro/vue/index.html",
      container: "#subapp-viewport",
      activeRule: "/vue"
    }
    // {
    //   name: "angular9",
    //   entry: "//localhost:7103",
    //   container: "#subapp-viewport",
    //   activeRule: "/angular9"
    // },
    // {
    //   name: "purehtml",
    //   entry: "//localhost:7104",
    //   container: "#subapp-viewport",
    //   activeRule: "/purehtml"
    // }
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
      }
    ],
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      }
    ],
    afterUnmount: [
      (app) => {
        console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
      }
    ]
  }
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: "qiankun"
});

onGlobalStateChange((value, prev) => console.log("[onGlobalStateChange - master]:", value, prev));

setGlobalState({
  ignore: "master",
  user: {
    name: "master"
  }
});

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp("/react16");

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});

ReactDOM.render(<App />, document.getElementById("main-root"));
