import { useBoolean } from "ahooks";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Popup, Loading, ActivityIndicator, Toast, Radio, Modal } from "zarm";
import back from "@/iconfont/svg/back.svg";
import forward from "@/iconfont/svg/forward.svg";
import add from "@/iconfont/svg/add.svg";
import edit from "@/iconfont/svg/edit.svg";
import deleteIcon from "@/iconfont/svg/delete.svg";
import empty from "@/iconfont/svg/empty.svg";
import TinderCard from "react-tinder-card";
import AddQuestion from "./modules/AddQuestion";
import "./index.less";
import { useRequest } from "ahooks";
import { questions, deleteQuestion } from "@/api/questions";
import React from "react";

const QuestionPage = () => {
  const [data, setData] = useState([]);
  const [visible, { toggle }] = useBoolean(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();

  const getQuestions = async (params) => {
    return await questions(params || {});
  };

  const deleteQuest = async (idx) => {
    return await deleteQuestion({ id: data[idx].id });
  };

  const { loading, run } = useRequest(getQuestions, {
    manual: true,
    onSuccess: (res) => {
      setData(res.data);
      setCurrentIndex(res.data?.length - 1);
    },
  });

  const { loading: deleteLoading, run: runDelete } = useRequest(deleteQuest, {
    manual: true,
    onSuccess: () => {
      Toast.show("删除成功!");
      run();
    },
  });

  useEffect(() => {
    if (!visible) {
      setCurrentQuestion({});
      run();
    }
  }, [visible]);

  const childRefs = useMemo(
    () =>
      Array(data?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [data]
  );
  useEffect(() => {
    if (loading || deleteLoading) {
      Loading.show({
        content: <ActivityIndicator size="lg" />,
      });
    } else {
      Loading.hide();
    }
  }, [loading, deleteLoading]);

  useEffect(() => {
    run();
  }, [run]);

  const onSwipe = (direction, id, index) => {
    console.log("You swiped: id : " + id + direction);
    updateCurrentIndex(index - 1);
  };

  const contentRender = useCallback(() => {
    return data?.map((item, index) => {
      return (
        <TinderCard
          ref={childRefs[index]}
          key={item.id}
          className="tinder-card"
          onSwipe={(direction) => onSwipe(direction, item.id, index)}
          onCardLeftScreen={() => onCardLeftScreen(String(item.id))}
        >
          <div className="carousel-item">
            <div className="question">{item.question}</div>
            <div className="answer">{item.answer}</div>
          </div>
        </TinderCard>
      );
    });
  }, [data]);

  const swipe = async (dir) => {
    if (currentIndex >= 0 && currentIndex < data.length) {
      if (!dir) {
        const dice = Math.random() * 100;
        console.log(dice);
        if (dice < 25) dir = "left";
        else if (dice < 50) dir = "right";
        else if (dice < 75) dir = "down";
        else dir = "up";
      }
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  const currentIndexRef = useRef(currentIndex);
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const goBack = async () => {
    if (currentIndex >= data?.length - 1) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(`(${myIdentifier}) left the screen!`, currentIndexRef.current);
  };
  return (
    <>
      <div className="background-image"></div>
      <div className="ctn">
        <div className="empty">
          <img width={"60px"} src={empty} alt="empty" />
        </div>
        <div className="header">
          <div className="title">八股练习册</div>
          <div className="menu">
            <img width={"30px"} src={add} alt="add" onClick={toggle} />
            <img
              width={"30px"}
              src={edit}
              alt="edit"
              onClick={() => {
                setCurrentQuestion(data[currentIndex]);
                toggle();
              }}
            />
            <img
              width={"30px"}
              src={deleteIcon}
              alt="delete"
              onClick={() => {
                Modal.confirm({
                  title: "确定要删除吗?",
                  onOk: () => {
                    runDelete(currentIndex);
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="quest-ctn" onDoubleClick={toggle}>
          {loading ? "loading......." : contentRender()}
        </div>
        <div className="actions">
          <img width={"40px"} src={back} alt="back" onClick={goBack} />
          <Radio.Group compact ghost type="button" size="md" defaultValue="2">
            <Radio value="0" onClick={() => run({ type: "01" })}>
              WEB
            </Radio>
            <Radio value="2" onClick={() => run({})}>
              ALL
            </Radio>
            <Radio value="1" onClick={() => run({ type: "00" })}>
              JAVA
            </Radio>
          </Radio.Group>
          <img
            width={"40px"}
            src={forward}
            alt="forward"
            onClick={() => swipe()}
          />
        </div>
        <Popup visible={visible} direction="center" width="80%">
          <div className="popup-box">
            <AddQuestion close={toggle} question={currentQuestion} />
          </div>
        </Popup>
      </div>
    </>
  );
};

export default QuestionPage;
