/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from "react";
import { Toast, Radio, Dialog, Switch } from "antd-mobile";
import back from "@/iconfont/svg/back.svg";
import restore from "@/iconfont/svg/restore.svg";
import forward from "@/iconfont/svg/forward.svg";
import add from "@/iconfont/svg/add.svg";
import edit from "@/iconfont/svg/edit.svg";
import deleteIcon from "@/iconfont/svg/delete.svg";
import empty from "@/iconfont/svg/empty.svg";
import "./index.less";
import { useRequest } from "ahooks";
import { query, deleteMessage } from "@/api/message";
import ContentRender from "./modules/TinderCard";
import React from "react";
import { Message } from "@/custom_types/message";
import { useNavigate } from "react-router-dom";
import { CloseOutline, CheckOutline } from "antd-mobile-icons";

const MessagePage = () => {
  const [data, setData] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef<any>(currentIndex);
  const getMessages = async (params: any) => {
    return await query(params || {});
  };
  const navigate = useNavigate();

  const deleteMsg = async (idx: number) => {
    return await deleteMessage({ id: data[idx]?.id });
  };

  const { loading, run } = useRequest(getMessages, {
    onSuccess: (res) => {
      res && setData(res.data);
      res && setCurrentIndex(res.data?.length - 1);
    },
  });

  const { loading: deleteLoading, run: runDelete } = useRequest(deleteMsg, {
    manual: true,
    onSuccess: () => {
      Toast.show("删除成功!");
      run({});
    },
  });

  useEffect(() => {
    if (loading || deleteLoading) {
      Toast.show({
        icon: "loading",
        content: " shiwo",
        duration: 1000,
      });
    } else {
      Toast.clear();
    }
  }, [loading, deleteLoading]);

  const childRefs = useMemo(
    () =>
      Array(data?.length)
        .fill(0)
        .map((i) => React.createRef<any>()),
    [data]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swipe = async (dir: string) => {
    if (currentIndex >= 0 && currentIndex < data.length) {
      if (!dir) {
        const dice = Math.random() * 100;
        if (dice < 25) dir = "left";
        else if (dice < 50) dir = "right";
        else if (dice < 75) dir = "down";
        else dir = "up";
      }
      await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    if (currentIndex >= data?.length - 1) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex]?.current.restoreCard();
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="ctn">
        <div className="empty">
          <img width={"60px"} src={empty} alt="empty" />
        </div>
        <div className="header">
          <div className="title">留言板</div>
          <div className="menu">
            <img
              width={"30px"}
              src={add}
              alt="add"
              onClick={() => {
                navigate("/msg/add");
              }}
            />
            <img
              width={"30px"}
              src={edit}
              alt="edit"
              onClick={() => {
                navigate("/msg/add", {
                  state: { message: data[currentIndex] },
                });
              }}
            />
            <img
              width={"30px"}
              src={deleteIcon}
              alt="delete"
              onClick={() => {
                Dialog.confirm({
                  cancelText: "不了不了",
                  confirmText: "我意已决",
                  title: "嗯哼?",
                  content: "确定要删除吗?",
                  onConfirm: () => {
                    runDelete(currentIndex);
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="quest-ctn">
          {loading ? (
            "loading......."
          ) : (
            <ContentRender
              data={data}
              currentIndexRef={currentIndexRef}
              updateCurrentIndex={updateCurrentIndex}
              childRefs={childRefs}
            />
          )}
        </div>
        <div className="actions">
          <img width={"40px"} src={restore} alt="back" onClick={goBack} />
          <Switch
            defaultChecked={true}
            onChange={(val) => {
              const type = val ? "00" : "01";
              run({ type });
            }}
            checkedText={<CheckOutline fontSize={18} />}
            uncheckedText={<CloseOutline fontSize={18} />}
          />
          <img
            width={"40px"}
            src={forward}
            alt="forward"
            onClick={() => swipe("")}
          />
        </div>
      </div>
    </>
  );
};

export default MessagePage;
