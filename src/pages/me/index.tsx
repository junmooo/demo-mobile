import store from "@/mobx";
import { observer } from "mobx-react";
import "./index.less";
import setting from "@/iconfont/svg/setting.svg";
import { Avatar } from "antd-mobile";
type Iprops = {};

const Me = observer((props: Iprops) => {
  const user = store.userInfo;
  return (
    <div className="me-ctn">
      <div className="header">
        <div className="info">
          <Avatar src={user.avatar || ""} className="avatar" />
          <div>
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
        </div>
        <div className="setting">
          <img src={setting} alt="setting" />
        </div>
      </div>
    </div>
  );
});

export default Me;
