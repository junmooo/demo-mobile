/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from "react";
import { Toast, Radio, Dialog } from "antd-mobile";
import forward from "@/iconfont/svg/forward.svg";
import empty from "@/iconfont/svg/empty.svg";
import "./index.less";
import { useRequest } from "ahooks";
import { query, deleteMessage } from "@/api/message";
import ContentRender from "./modules/TinderCard";
import React from "react";
import { Message } from "@/custom_types/message";
import { useNavigate } from "react-router-dom";
import { Action } from "antd-mobile/es/components/popover";
import MessageNavbar from "./modules/MessageNavBar";

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

  const onMenuClick = (node: Action) => {
    if (node.key === "add") {
      navigate("/msg/add");
    }
    if (node.key === "edit") {
      navigate("/msg/add", {
        state: { message: data[currentIndex] },
      });
    }
    if (node.key === "delete") {
      Dialog.confirm({
        cancelText: "不了不了",
        confirmText: "我意已决",
        title: "嗯哼?",
        content: "确定要删除吗?",
        onConfirm: () => {
          runDelete(currentIndex);
        },
      });
    }
  };
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

  // const swipe = async (dir: string) => {
  //   if (currentIndex >= 0 && currentIndex < data.length) {
  //     if (!dir) {
  //       const dice = Math.random() * 100;
  //       if (dice < 25) dir = "left";
  //       else if (dice < 50) dir = "right";
  //       else if (dice < 75) dir = "down";
  //       else dir = "up";
  //     }
  //     await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
  //   }
  // };

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
        <MessageNavbar onMenuClick={onMenuClick} run={run} goBack={goBack} />
        <div className="quest-ctn">
          {loading ? (
            ""
          ) : (
            <ContentRender
              data={data}
              currentIndexRef={currentIndexRef}
              updateCurrentIndex={updateCurrentIndex}
              childRefs={childRefs}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MessagePage;
