/**
 * @author Jay
 * @date 2020-01-01
 * @description react root
 */
/*eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import AppContainer from "./containers";
import ErrorBoundary from "@/components/ErrorBoundary";
// import Request from "Utils/request";
// import API from "Utils/api";
// import { Session } from " sUtils/storage";
// import { UserContext } from "./context/UserContext";
import { DictContext } from "Context/DictContext";
import { hot } from "react-hot-loader/root";
import createStore from "./store";
import { ConfigProvider } from "antd";
const store = createStore();

// i18n
import intl from "react-intl-universal";
// common locale data
require("intl/locale-data/jsonp/en.js");
require("intl/locale-data/jsonp/zh.js");
// custom i18n
const locales = {
  en_US: require("./locales/en-US.json"),
  zh_CN: require("./locales/zh-CN.json")
};
import "./styles";

// ant design i18n
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";

const antLocales = {
  zh_CN: zhCN,
  en_US: enUS
};

function App() {
  const [dict, setDict] = useState([]);
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    // load locales
    loadLocales();
    // dict
    // const dict = Session.get("dict");
    // let response = await Request({
    //   url: API.common.dict
    // });
    // if (response.status) {
    //   this.setState({ dict: response.data });
    //   Session.set("dict", response.data);
    // }
    // } else {
    //   this.setState({ dict });
    // }
  }, []);

  const loadLocales = () => {
    intl
      .init({
        currentLocale: localStorage.getItem("lang") || "zh_CN",
        locales
      })
      .then(() => {
        setInitDone(true);
      });
  };

  return (
    initDone && (
      <ErrorBoundary>
        <ConfigProvider locale={antLocales[localStorage.getItem("lang") || "zh_CN"]}>
          <Provider store={store}>
            <DictContext.Provider value={dict}>
              <AppContainer />
            </DictContext.Provider>
          </Provider>
        </ConfigProvider>
      </ErrorBoundary>
    )
  );
}

export default hot(App);
