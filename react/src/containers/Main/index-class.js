/**
 * @author Jay
 * @date 2020-01-01
 * @description Main
 */
import React, { Suspense, lazy } from "react";
import { Layout, Modal } from "antd";
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
import Menu from "./component/Menu";
import Bread from "./component/Bread";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../Home"));
const Demo = lazy(() => import(/* webpackChunkName: "demo" */ "../Demo"));

import Style from "./style";
class Main extends React.Component {
  state = {
    collapsed: false,
    menu: []
  };

  async componentDidMount() {
    let response = await Request({
      url: "menu.json"
    });
    if (response.state) {
      this.setState({ menu: response.data });
    }
  }

  fnToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  fnLogout = () => {
    Modal.confirm({
      title: "提示信息",
      content: "确认退出吗?",
      onOk: () => {
        Storage.clear();
        // location.href = "/";
        this.props.logoutAction();
        this.props.history.replace("/login");
      }
    });
  };

  render() {
    const { menu } = this.state;
    return (
      <Layout className={Style.layout}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={Style.logo} />
          <Menu data={menu} />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Head
              onToggle={this.fnToggle}
              collapsed={this.state.collapsed}
              onLogout={this.fnLogout}
            />
          </Header>

          <Bread data={menu} />

          <Content
            style={{
              margin: "0 12px",
              padding: 24,
              background: "#fff"
              // minHeight: "80vh"
            }}
          >
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path={`/home`} component={Home} />
                <Route path={`/demo`} component={Demo} />
                <Redirect to={`/home`} />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
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
