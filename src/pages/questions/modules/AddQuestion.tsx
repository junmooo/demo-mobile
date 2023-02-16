import { addOrUpdateQuestion } from "@/api/questions";
import { useRequest } from "ahooks";
import { memo, useEffect, useState } from "react";
import { Input, Toast, Button, ActivityIndicator, Loading, Radio } from "zarm";
import closeIcon from "@/iconfont/svg/close.svg";
import { RadioValue } from "zarm/types/radio/PropsType";
import { Question } from "@/custom_types/question";
interface Iprops {
  close: () => void;
  question?: Question;
}

const AddQuestion = memo((props: Iprops) => {
  const { close, question = { answer: "", question: "", type: "" } } = props;
  const [title, setTitle] = useState(question.question);
  const [content, setContent] = useState(question.answer);
  const [type, setType] = useState(question.type);

  const addQuestion = async () => {
    const params = {
      id: question.id,
      question: title,
      answer: content,
      type,
    };
    return await addOrUpdateQuestion(params);
  };

  const { loading, run } = useRequest(addQuestion, {
    manual: true,
    onSuccess: () => {
      Toast.show({ content: "添加成功", stayTime: 1000 });
      close();
    },
  });

  useEffect(() => {
    if (loading) {
      Loading.show({
        content: <ActivityIndicator size="lg" />,
      });
    } else {
      Loading.hide();
    }
  }, [loading]);

  return (
    <>
      <div
        style={{
          padding: "20px 15px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div style={{ textAlign: "right", width: "100%" }} onClick={close}>
          <img width={"20px"} src={closeIcon} alt="close" />
        </div>
        <div style={{ margin: "10px" }}>
          <Input
            rows={5}
            autoHeight
            showLength
            type="text"
            maxLength={500}
            placeholder="请输入问题"
            value={title}
            onChange={(value: string | undefined) => value && setTitle(value)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <Input
            rows={8}
            autoHeight
            showLength
            type="text"
            maxLength={1000}
            placeholder="请输入答案"
            value={content}
            onChange={(value: string | undefined) => value && setContent(value)}
          />
        </div>
        <div style={{ margin: "20px" }}>
          {/* {00 java 01 web} */}
          <Radio.Group
            value={type}
            onChange={(value: RadioValue | undefined) => setType(String(value))}
          >
            <Radio value="00">JAVA</Radio>
            <Radio value="01">WEB</Radio>
          </Radio.Group>
        </div>
        <Button
          block
          theme="primary"
          onClick={() => {
            run();
          }}
        >
          提交
        </Button>
      </div>
    </>
  );
});

export default AddQuestion;
