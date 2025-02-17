/**
 * @author Jay
 * @date 2020-01-01
 * @description silder menu
 */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: []
  };

  componentDidMount() {
    this.fnMenu();
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fnMenu();
    }
    return null;
  }

  fnOpenChange = (openKeys) => {
    const { data = [] } = this.props;
    const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
    if (data.map((item) => item.code).indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  fnMenu = () => {
    const { data = [] } = this.props;

    const {
      location: { pathname }
    } = this.props;

    // console.log("xxxx", pathname.split("/"), data);
    let name = pathname.split("/");

    const openKeys = [];
    const selectedKeys = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (openKeys.length !== 0) break;
      if (name.includes(item.link)) {
        if (item.children && item.children.length > 0) {
          for (let j = 0; j < item.children.length; j++) {
            const subItem = item.children[j];
            // if (pathname.indexOf(subItem.link) != -1) {
            if (name.includes(subItem.link)) {
              openKeys.push(item.code);
              selectedKeys.push(subItem.code);
              break;
            }
          }
        } else {
          // if (pathname.indexOf(item.link) != -1) {
          if (name.includes(item.link)) {
            openKeys.push(item.code);
            selectedKeys.push(item.code);
            break;
          }
        }
      }
    }

    this.setState({ openKeys, selectedKeys });
  };

  render() {
    const { data = [] } = this.props;
    const { openKeys, selectedKeys } = this.state;
    // console.log("xxxx", openKeys, selectedKeys);
    return (
      <Menu
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={this.fnOpenChange}
        subMenuOpenDelay={0}
        subMenuCloseDelay={0.1}
        style={{
          //height: "100%",
          borderRight: 0
        }}
      >
        {data.map((item) => {
          if (!item.children) {
            return (
              <Menu.Item key={item.code}>
                <Link to={`/${item.link}`}>
                  {/* <Icon type={"user"} /> */}
                  {/* <img src={ReportSvg} style={{ marginRight: 10 }} /> */}
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu
                key={item.code}
                title={
                  <div>
                    <span>{item.name}</span>
                  </div>
                }
              >
                {item.children.map((child) => {
                  return (
                    <Menu.Item key={child.code}>
                      <Link to={`/${item.link}/${child.link}`}>{child.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>
    );
  }
}

export default withRouter(SiderMenu);
