/**
 * @author Jay
 * @date 2020-01-01
 * @description Main
 */
/*eslint-disable no-unused-vars */
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Layout, Modal, Menu } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "Components/Loading";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { menuAction } from "./action";
import { logoutAction } from "../Login/action";
import { Session as Storage } from "Utils/storage";
import Request from "Utils/request";

const { Header, Sider, Content } = Layout;
import Head from "./component/Head";
// import Menu from "./component/Menu";
import Bread from "./component/Bread";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../Home"));
const Demo = lazy(() => import(/* webpackChunkName: "demo" */ "../Demo"));

import Style from "./style";

function Main(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu();
    // push("/react");
  }, []);

  const getMenu = async () => {
    let response = await Request({
      url: "menu.json"
    });
    if (response.state) {
      setMenu(response.data);
    }
  };

  const fnToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  const fnLogout = () => {
    Modal.confirm({
      title: "提示信息",
      content: "确认退出吗?",
      onOk: () => {
        Storage.clear();
        props.logoutAction();
        props.history.replace("/login");
      }
    });
  };

  function push(subapp) {
    history.pushState(null, subapp, subapp);
  }

  return (
    <Layout className={Style.layout}>
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={Style.logo} />
        <Menu data={menu} />
      </Sider> */}
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "red",
            height: "53px",
            color: "#fff"
          }}
        >
          {/* <div className="logo" /> */}
          <div
            onClick={() => {
              push("/");
            }}
          >
            首页
          </div>

          <div
            onClick={() => {
              push("/react");
            }}
          >
            react
          </div>

          <div
            onClick={() => {
              push("/vue");
            }}
          >
            vue
          </div>
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
            <Menu.Item
              key="0"
              onClick={() => {
                push("/");
              }}
            >
              首页
            </Menu.Item>
            <Menu.Item
              key="1"
              onClick={() => {
                push("/react");
              }}
            >
              React
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                push("/vue");
              }}
            >
              VUE
            </Menu.Item>
          </Menu> */}
          <Head onToggle={fnToggle} collapsed={collapsed} onLogout={fnLogout} />
        </Header>
        {/* <Header style={{ background: "#fff", padding: 0 }}>
          <div style={{ display: "flex" }}>
            <div
              onClick={() => {
                push("/react");
              }}
            >
              React
            </div>
            <div
              onClick={() => {
                push("/vue");
              }}
            >
              Vue
            </div>
            <Head onToggle={fnToggle} collapsed={collapsed} onLogout={fnLogout} />
          </div>
        </Header> */}

        {/* <Bread data={menu} /> */}

        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={`/`} exact component={Home} />
            {/* <Route path={`/demo`} component={Demo} /> */}
            {/* <Redirect to={`/`} /> */}
          </Switch>
        </Suspense>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  menus: state.mainReducer.menus,
  userInfo: state.loginReducer.userInfo
});

const mapDispatchToProps = (dispatch) => ({
  menuAction: bindActionCreators(menuAction, dispatch),
  logoutAction: bindActionCreators(logoutAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
