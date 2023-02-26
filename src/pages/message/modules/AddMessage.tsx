import { addOrUpdate } from "@/api/message";
import { useBoolean, useRequest } from "ahooks";
import { memo, useEffect, useState } from "react";
import {
  Toast,
  Button,
  TextArea,
  Switch,
  Slider,
  List,
  Input,
  Modal,
} from "antd-mobile";
import { CardStyle, Message } from "@/custom_types/message";
import { CloseOutline, CheckOutline } from "antd-mobile-icons";
import "./add-message.less";
import { useLocation, useNavigate } from "react-router-dom";
import MyNavBar from "@/components/common/navbar";
import Color from "@/components/common/color";

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
      navigate("/home", { state: { key: "message" } });
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
        <MyNavBar
          title="ADD MESSAGE"
          back={() => navigate("/home", { state: { key: "message" } })}
        />
        <div className="text">
          <TextArea
            maxLength={200}
            showCount
            placeholder="请输入"
            autoSize={{ minRows: 4, maxRows: 6 }}
            value={content}
            onChange={(value: string | undefined) => {
              if (
                typeof value === "string" &&
                value?.split("\n").length <= 11
              ) {
                setContent(value);
              } else {
                Toast.show("最多不超过12行!");
              }
            }}
          />
        </div>
        <div className="pram-ctn">
          <List>
            <List.Item>
              <span className="item-label">是否公开</span>
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
              <span className="item-label">旋转角度</span>
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
              <span className="item-label">颜色:</span>
              <span className="item-color">背景</span>
              <Color bgc={bgc} onChange={(color) => setBgc(color.hex)} />
              <span className="item-color">字体</span>
              <Color bgc={ftc} onChange={(color) => setFtc(color.hex)} />
              <span className="item-color">阴影</span>
              <Color bgc={sdc} onChange={(color) => setSdc(color.hex)} />
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
