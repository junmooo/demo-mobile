import { NavBar, Space } from "antd-mobile";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface Iprops {
  title?: string;
  right?: ReactElement;
  back?: () => void;
}

const MyNavBar = React.memo(function Article(props: Iprops) {
  const {
    title = "",
    right = <></>,
    back = () => {
      navigate(-1);
    },
  } = props;
  const navigate = useNavigate();
  return (
    <NavBar right={right} onBack={back}>
      {title}
    </NavBar>
  );
});

export default MyNavBar;
