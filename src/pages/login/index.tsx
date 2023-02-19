import React, { useState } from "react";
import { Button, Form, Input, Toast } from "antd-mobile";
import "./login.less";
import auth from "@/api/login";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    auth
      .login(values)
      .then(() => {
        Toast.show({
          icon: "success",
          content: "登陆成功",
        });
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-container">
      <Form
        // style={{ width: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        footer={
          <div className="submit-bar">
            <Button
              onClick={() => {
                navigate("/register");
              }}
              color="primary"
              fill="none"
            >
              注册
            </Button>
            <Button color="primary" type="submit" fill="outline">
              登陆
            </Button>
          </div>
        }
        layout="horizontal"
      >
        <Form.Item
          label="Username"
          name="operName"
          key={"operName"}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="operPwd"
          key={"operPwd"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
