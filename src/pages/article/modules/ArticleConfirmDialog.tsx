import { Dialog, Input } from "antd-mobile";

type Iprops = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  setTitle: (val: string) => void;
};

const ArticleConfirmDialog = (props: Iprops) => {
  const { visible, onCancel, onConfirm, title = "", setTitle } = props;
  return (
    <Dialog
      visible={visible}
      actions={[
        [
          { key: "cancel", text: "取消", onClick: onCancel },
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
  );
};

export default ArticleConfirmDialog;
