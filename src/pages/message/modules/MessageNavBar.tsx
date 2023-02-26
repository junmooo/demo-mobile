import menuIcon from "@/iconfont/svg/menu.svg";
import restore from "@/iconfont/svg/restore.svg";
import {
  AddCircleOutline,
  EditSOutline,
  CloseCircleOutline,
} from "antd-mobile-icons";
import { Popover, Switch } from "antd-mobile";
import { Action } from "antd-mobile/es/components/popover";

type Iprops = {
  onMenuClick: (node: Action) => void;
  title?: string;
  run: (obj: any) => void;
  goBack: () => void;
};

const MessageNavbar = (props: Iprops) => {
  const { onMenuClick, run, goBack } = props;
  const actions: Action[] = [
    { key: "add", icon: <AddCircleOutline />, text: "新增" },
    { key: "edit", icon: <EditSOutline />, text: "修改" },
    { key: "delete", icon: <CloseCircleOutline />, text: "删除" },
  ];

  return (
    <div className="header">
      <div className="title">留言板</div>
      <div className="menu">
        <Switch
          defaultChecked={true}
          onChange={(val) => {
            const type = val ? "00" : "01";
            run({ type });
          }}
          checkedText={"私"}
          uncheckedText={"公"}
        />

        <img width={"30px"} src={restore} alt="back" onClick={goBack} />
        <Popover.Menu
          actions={actions}
          placement="bottom-start"
          onAction={onMenuClick}
          trigger="click"
        >
          <img src={menuIcon} width={"35px"} alt="menu" />
        </Popover.Menu>
      </div>
    </div>
  );
};

export default MessageNavbar;
