import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "zarm";
import "./home.less";
interface Iprops {}

const Demo = React.memo(function Demo(props: Iprops) {
  const navigate = useNavigate();
  return (
    <div className="home-ctn">
      <Button onTouchEnd={() => navigate("/question")}>to question</Button>
      <Button onTouchEnd={() => navigate("/upload")}>upload photos</Button>
    </div>
  );
});

export default Demo;
