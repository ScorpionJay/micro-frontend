import "./public-path";
import Vue from "vue";
import Home from "@/views/Home";
import Main from "@/views/Main";
import App from "./App";
import About from "@/views/About";
import Login from "@/views/Login";
import NotFound from "@/views/notFound";
import "@/styles/index.less";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import ElementUI, { Button, Select } from "element-ui/lib";
import "element-ui/lib/theme-chalk/index.css";
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
Vue.use(ElementUI);

const router = new VueRouter({
  mode: "hash",
  base: __dirname,
  routes: [
    { path: "/login", component: Login },
    {
      path: "/",
      meta: {
        auth: true
      },
      component: Main,
      children: [
        {
          path: "",
          component: Home,
          meta: {
            auth: true
          }
        },
        {
          path: "about",
          component: About,
          meta: {
            auth: true
          }
        }
      ]
    },
    { path: "*", component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  let validator =
    typeof to.meta.auth == "undefined" || !to.meta.auth || sessionStorage.getItem("token");
  let result = validator
    ? {}
    : {
        path: "login" // 跳转到命名路由
        // query: {
        //   url: to.fullPath // 做一个来源页面，用于登陆成功之后跳转
        // }
      };
  next(result);
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
  // template: `
  //   <div id="app">
  //     <router-view class="view"></router-view>
  //   </div>`
}).$mount("#app");

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log(props);
  //ReactDOM.render(<App />, document.getElementById("root"));
  new Vue({
    router,
    render: (h) => h(App)
    // template: `
    //   <div id="app">
    //     <router-view class="view"></router-view>
    //   </div>`
  }).$mount("#app");
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  // ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}
