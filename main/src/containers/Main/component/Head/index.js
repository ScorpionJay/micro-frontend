/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import Style from "./style";

function Head(props) {
  return (
    <div className={Style.header}>
      {/* <Icon
        className={Style.trigger}
        type={props.collapsed ? "menu-unfold" : "menu-fold"}
        onClick={props.onToggle}
      /> */}
      <div className={Style.right}>
        <span style={{ marginRight: 10 }}></span>
        {/* <Icon type="setting" onClick={props.onLogout}></Icon> */}
        <span onClick={props.onLogout}>
          <LogoutOutlined /> 退出
        </span>
      </div>
    </div>
  );
}

export default Head;
