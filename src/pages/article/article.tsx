import React, { useEffect, useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useLocation } from "react-router-dom";
import "./article.less";
import FileUtils from "@/utils/file";
import { upload } from "@/api/files";
import { Dialog, Input, Toast } from "antd-mobile";

import { Action } from "antd-mobile/es/components/popover";
import { useBoolean, useRequest } from "ahooks";
import { save } from "@/api/article";
import { toolbarsExclude } from "./contants";
import ArticleNavbar from "./modules/ArticleNavbar";

interface Iprops {}

const Article = React.memo(function Article(props: Iprops) {
  const location = useLocation();
  const [preview, { setFalse, setTrue }] = useBoolean(true);
  const [showDialog, { toggle }] = useBoolean(false);
  const [text, setText] = useState("# Hello World");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("未命名");

  const { run: runSave } = useRequest(save, {
    manual: true,
    onSuccess: (res) => {
      Toast.show({
        icon: "success",
        duration: 2000,
        content: "保存成功",
      });
      setId(res);
      setTrue();
      toggle();
    },
  });

  useEffect(() => {
    const item = location?.state?.item;
    if (item) {
      setId(item.id);
      setText(item.article);
      setTitle(item.title);
    }
  }, [location]);

  const onConfirm = () => {
    runSave({ article: text, id, title });
  };

  const onMenuClick = (node: Action) => {
    if (node.key === "preview") {
      setTrue();
    }
    if (node.key === "edit") {
      setFalse();
    }
  };

  const onUploadImg = async (
    files: File[],
    callback: (arg0: any[]) => void
  ) => {
    const res = await Promise.all(
      files.map((file) => {
        const m = 1024 * 1024;
        let quality = 1;
        if (file.size > 8 * m) quality = 0.3;
        else if (file.size > 5 * m) quality = 0.4;
        else if (file.size > 2 * m) quality = 0.6;
        return new Promise((rev, rej) => {
          const form = new FormData();
          FileUtils.fileResizeToFile(file, quality, (res: File) => {
            form.append("file", res);
            upload(form)
              .then((res) => {
                rev(res);
              })
              .catch((error) => rej(error));
          });
        });
      })
    );
    callback(res.map((item: any) => item?.url));
  };

  return (
    <div className="page-ctn">
      <ArticleNavbar onMenuClick={onMenuClick} toggle={toggle} title={title} />
      <div className="article-ctn">
        <MdEditor
          className="preview"
          editorId={"preview"}
          modelValue={text}
          theme="light"
          previewTheme="smart-blue"
          previewOnly={true}
        />
        <div
          style={{ display: `${preview ? "none" : "block"} `, width: "100%" }}
        >
          <MdEditor
            editorId={"editor"}
            className={"editor"}
            onUploadImg={onUploadImg}
            modelValue={text}
            onChange={setText}
            tableShape={[5, 10]}
            showCodeRowNumber={true}
            theme="light"
            preview={false}
            autoDetectCode={true}
            footers={["=", "markdownTotal"]}
            toolbarsExclude={toolbarsExclude}
          />
        </div>
      </div>
      <Dialog
        visible={showDialog}
        actions={[
          [
            { key: "cancel", text: "取消", onClick: toggle },
            { key: "confirm", text: "确认", onClick: onConfirm },
          ],
        ]}
        content={
          <div style={{ margin: "15px" }}>
            <Input
              placeholder="请输入标题"
              defaultValue={title}
              onChange={(val) => {
                console.log(70, val);
                setTitle(val);
              }}
            />
          </div>
        }
      />
    </div>
  );
});

export default Article;
