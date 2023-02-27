import { Button, Form, Input, Toast } from "antd-mobile";
import auth from "@/api/login";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.less";
import avatarIcon from "@/iconfont/svg/avatar.svg";
import MyNavBar from "@/components/common/navbar";
import Upload from "@/components/common/upload";
import { upload } from "@/api/files";
import FileUtils from "@/utils/file";

type registerType = {
  title?: string;
  record?: any;
};

function Register(props: registerType) {
  const [form] = Form.useForm();
  const { record } = props;
  const uploadRef = useRef<HTMLDivElement>();
  const [avatar, setAvatar] = useState("");
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
          name="name"
          key={"name"}
          rules={[
            { required: true, message: "Please input your username!" },
            {
              validator: async (_, value) => {
                const res = await auth.getName({ name: value });
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
          name="pwd"
          key={"pwd"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" disabled={record ? true : false} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          key={"email"}
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
        <Form.Item label="Avatar" name="avatar" key={"avatar"}>
          <Upload
            iconSize={"25px"}
            uploadRef={uploadRef}
            onChange={(res) => {
              console.log("change");

              const file = res[0];
              const m = 1024 * 1024;
              let quality = 1;
              if (file.size > 8 * m) quality = 0.3;
              else if (file.size > 5 * m) quality = 0.4;
              else if (file.size > 2 * m) quality = 0.6;
              const form = new FormData();
              console.log("file", file, quality);
              FileUtils.fileResizeToFile(file, quality, (res: File) => {
                form.append("file", res);
                console.log(form);
                upload(form)
                  .then((res) => {
                    setAvatar(res.url);
                  })
                  .catch(() => {
                    Toast.show("上传失败!");
                  });
              });
            }}
          />
          <img
            className="avatar"
            src={avatar || avatarIcon}
            onClick={() => {
              console.log("hello");
              uploadRef.current?.click();
            }}
            alt="avatar"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
