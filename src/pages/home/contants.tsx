import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

export const tabs = () => {
  return [
    {
      key: "article",
      title: "文档",
      icon: <AppOutline />,
    },
    {
      key: "message",
      title: "留言板",
      icon: <UnorderedListOutline />,
    },
    {
      key: "upload",
      title: "上传测试",
      icon: <MessageOutline />,
    },
    {
      key: "me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];
};
