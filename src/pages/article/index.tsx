import { all } from "@/api/article";
import { useBoolean, useRequest } from "ahooks";
import { List, Popover, Space, Toast } from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { save } from "@/api/article";

import { UploadOutline, AddCircleOutline } from "antd-mobile-icons";
import moment from "moment";
import menuIcon from "@/iconfont/svg/menu.svg";
import MyNavBar from "@/components/common/navbar";
import { Action } from "antd-mobile/es/components/popover";
import Upload from "@/components/common/upload";
import ArticleConfirmDialog from "./modules/ArticleConfirmDialog";

const AriticleList = React.memo(function NotFound() {
  const { loading, data, run } = useRequest(all);
  const navigete = useNavigate();
  const [text, setText] = useState("");
  const [showDialog, { toggle }] = useBoolean(false);
  const [title, setTitle] = useState("未命名");

  const uploadRef = useRef<HTMLDivElement>();
  const { run: runSave } = useRequest(save, {
    manual: true,
    onSuccess: (res) => {
      Toast.show({
        icon: "success",
        duration: 2000,
        content: "保存成功",
      });
      toggle();
    },
  });
  useEffect(() => {
    if (loading) {
      Toast.show({
        icon: "loading",
        content: "loading …",
      });
    } else {
      Toast.clear();
    }
  }, [loading]);

  const actions: Action[] = [
    { key: "add", icon: <AddCircleOutline />, text: "新增" },
    { key: "import", icon: <AddCircleOutline />, text: "导入" },
    { key: "export", icon: <AddCircleOutline />, text: "导出" },
  ];
  const onMenuClick = (node: Action) => {
    if (node.key === "add") {
      navigete("/article", {
        state: { item: { article: "# HELLO WORLD!", title: "未命名" } },
      });
    }
    if (node.key === "import") {
      uploadRef.current?.click();
    }
  };

  const getFiles = (files: File[]) => {
    const reader = new FileReader();
    const file = files[0]; //files为上传组件获取的地址
    reader.readAsText(file, "utf-8");
    reader.onload = function () {
      const result = reader?.result as string;
      setText(result);
    };
    reader.onerror = function () {
      console.log("读取失败");
      console.log(reader.error);
    };
  };

  const onConfirm = () => {
    runSave({ article: text, title });
    toggle();
  };

  const right = (
    <Space>
      <Popover.Menu
        actions={actions}
        placement="bottom-start"
        onAction={onMenuClick}
        trigger="click"
      >
        <img src={menuIcon} width={"25px"} alt="menu" />
      </Popover.Menu>
    </Space>
  );
  return (
    <div className="article-list-ctn">
      <MyNavBar title="文章列表" right={right} />

      <List className="list" header="ARTICLES">
        {data?.map((item: Article) => {
          return (
            <List.Item
              key={item.id}
              onClick={() => navigete("/article", { state: { item } })}
              description={`作者: ${item?.authorName} 创建时间: ${moment(
                item?.timeCreated
              ).format("YYYY-MM-DD HH:mm:SS")}`}
            >
              {item.title}
            </List.Item>
          );
        })}
      </List>
      <Upload uploadRef={uploadRef} onChange={getFiles} multiple={false} />
      <ArticleConfirmDialog
        visible={showDialog}
        onCancel={toggle}
        onConfirm={onConfirm}
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
});

export default AriticleList;
