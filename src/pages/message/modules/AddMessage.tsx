import { addOrUpdate } from "@/api/message";
import { useRequest } from "ahooks";
import { memo, useEffect, useState } from "react";
import {
  Toast,
  Button,
  TextArea,
  Switch,
  Slider,
  List,
  Input,
} from "antd-mobile";
import closeIcon from "@/iconfont/svg/close.svg";
import { CardStyle, Message } from "@/custom_types/message";
import { CloseOutline, CheckOutline } from "antd-mobile-icons";
import "./add-message.less";
import { useLocation, useNavigate } from "react-router-dom";
import MyNavBar from "@/components/common/navbar";

const AddMessage = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const msg = location?.state?.message;
  const styleObj: CardStyle = JSON.parse(msg?.style || "{}");

  const [content, setContent] = useState(msg?.messageContent || "");
  const [type, setType] = useState(msg?.type || "00");
  const [angle, setAngle] = useState("0");
  const [bgc, setBgc] = useState(styleObj.bgc || "#FFF");
  const [ftc, setFtc] = useState(styleObj.ftc || "#000");
  const [sdc, setSdc] = useState(styleObj.sdc || "#ccc");

  const addMessage = async () => {
    const params: Message = {
      id: msg?.id,
      messageContent: content,
      type,
      style: JSON.stringify({ angle, ftc, bgc, sdc }),
    };
    return await addOrUpdate(params);
  };

  const { loading, run } = useRequest(addMessage, {
    manual: true,
    onSuccess: () => {
      Toast.show({ icon: "sccuess", content: "添加成功", duration: 2000 });
      navigate(-1);
    },
  });

  useEffect(() => {
    if (loading) {
      Toast.show({
        icon: "loading",
      });
    } else {
      Toast.clear();
    }
  }, [loading]);

  return (
    <>
      <div className="add-msg-ctn">
        <MyNavBar title="ADD MESSAGE" />
        <div className="text">
          <TextArea
            maxLength={1000}
            showCount
            placeholder="请输入"
            autoSize={{ minRows: 7, maxRows: 15 }}
            value={content}
            onChange={(value: string | undefined) => setContent(value)}
          />
        </div>
        <div className="pram-ctn">
          <List>
            <List.Item>
              <span className="pri-or-pub-label">是否公开</span>
              <Switch
                defaultChecked={type === "00"}
                onChange={(val) => {
                  if (val) {
                    setType("00");
                  } else {
                    setType("01");
                  }
                }}
                checkedText={<CheckOutline fontSize={18} />}
                uncheckedText={<CloseOutline fontSize={18} />}
              />
            </List.Item>
            <List.Item>
              <span className="pri-or-pub-label">旋转角度</span>
              <div>
                <Slider
                  min={-10}
                  max={10}
                  step={1}
                  defaultValue={parseInt(String(angle))}
                  popover
                  onChange={(val) => {
                    setAngle(String(val));
                  }}
                />
              </div>
            </List.Item>
            <List.Item>
              <span className="pri-or-pub-label">背景颜色</span>
              <Input
                placeholder="请输入"
                defaultValue={bgc}
                onChange={(val) => {
                  console.log(val);
                  setBgc(val);
                }}
              />
            </List.Item>
            <List.Item>
              <span className="pri-or-pub-label">字体颜色</span>
              <Input
                placeholder="请输入"
                defaultValue={ftc}
                onChange={(val) => {
                  console.log(val);
                  setFtc(val);
                }}
              />
            </List.Item>
            <List.Item>
              <span className="pri-or-pub-label">阴影颜色</span>
              <Input
                placeholder="请输入"
                defaultValue={sdc}
                onChange={(val) => {
                  console.log(val);
                  setSdc(val);
                }}
              />
            </List.Item>
          </List>
        </div>
        <Button
          block
          color="primary"
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

export default AddMessage;
