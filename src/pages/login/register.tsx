import { Button, Form, Input, Modal, Toast } from "antd-mobile";
import auth from "@/api/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.less";
import { useBoolean } from "ahooks";
import MyNavBar from "@/components/common/navbar";

type registerType = {
  title?: string;
  record?: any;
};

function Register(props: registerType) {
  const [form] = Form.useForm();
  const { title, record } = props;

  const navigate = useNavigate();
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        auth.register(values).then(() => {
          navigate("/login");
        });
      })
      .catch((info) => {
        Toast.show({
          icon: "fail",
          content: "校验失败 " + info.errorFields,
        });
      });
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);
  return (
    <div className="rgst-ctn">
      <MyNavBar title="注册" />
      <Form
        form={form}
        className="form-style"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        footer={
          <Button type="submit" block color="primary">
            提交
          </Button>
        }
      >
        <Form.Header>注册信息</Form.Header>
        <Form.Item
          label="Username"
          name="operName"
          key={"operName"}
          rules={[
            { required: true, message: "Please input your username!" },
            {
              validator: async (_, value) => {
                const res = await auth.getName({ operName: value });
                return res?.data === null
                  ? Promise.resolve()
                  : Promise.reject("用户名被占用!");
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="operPwd"
          key={"operPwd"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" disabled={record ? true : false} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="operEmail"
          key={"operEmail"}
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone No" name="phoneNo" key={"phoneNo"}>
          <Input />
        </Form.Item>

        <Form.Item label="Remark" name="remark" key={"remark"}>
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
