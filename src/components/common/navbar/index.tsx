import { NavBar, Space } from "antd-mobile";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface Iprops {
  title?: string;
  right?: ReactElement;
}

const MyNavBar = React.memo(function Article(props: Iprops) {
  const { title = "", right = <></> } = props;
  const navigate = useNavigate();
  return (
    <NavBar
      right={right}
      onBack={() => {
        navigate(-1);
      }}
    >
      {title}
    </NavBar>
  );
});

export default MyNavBar;
