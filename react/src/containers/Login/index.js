/**
 * @author Jay
 * @date 2020-01-01
 * @description login
 */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";
import { Form, Input, Button } from "antd";
import Style from "./style";

const Login = (props) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  useEffect(() => {
    const { token } = props;
    token && setRedirectToReferrer(true);
  }, [props]);

  if (redirectToReferrer) {
    const { from } = props.location.state || {
      from: { pathname: "/" }
    };
    return <Redirect to={from} />;
  }

  const onFinish = async (values) => {
    console.log("Success:", values);
    await props.loginAction(values, () => setRedirectToReferrer(true));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={Style.login}>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className={Style.loginForm}>
        <div className={Style.title}>React</div>
        <Form.Item name="username" rules={[{ required: true, message: "请输入用户名！" }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "请输入密码！" }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(loginAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
