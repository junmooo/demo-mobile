import { useBoolean } from "ahooks";
import { Dialog } from "antd-mobile";
import { CompactPicker } from "react-color";

type Iprops = {
  onChange: (val: { hex: string }) => void;
  bgc: string;
};
const Color = (props: Iprops) => {
  const { onChange, bgc } = props;
  const [show, { setFalse, setTrue }] = useBoolean(false);

  return (
    <>
      <span
        className="color"
        style={{ backgroundColor: bgc }}
        onClick={setTrue}
      />
      <Dialog
        actions={[{ key: "confirm", text: "确认", onClick: setFalse }]}
        closeOnMaskClick={true}
        visible={show}
        content={<CompactPicker color={"#ccc"} onChange={onChange} />}
      />
    </>
  );
};

export default Color;
