import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.less";

import { Button } from "antd-mobile";
import MyNavBar from "@/components/common/navbar";

interface Iprops {}

const Home = React.memo((props: Iprops) => {
  const navigate = useNavigate();
  return (
    <>
      <MyNavBar title="HOME" />
      <div className="home-ctn">
        <Button block onTouchEnd={() => navigate("/articles")}>
          to aticles
        </Button>
        <Button block onTouchEnd={() => navigate("/question")}>
          to question
        </Button>
        <Button block onTouchEnd={() => navigate("/upload")}>
          upload photos
        </Button>
      </div>
    </>
  );
});

export default Home;
