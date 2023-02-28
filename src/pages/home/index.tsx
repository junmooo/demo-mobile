import { useEffect, useState } from "react";
import { TabBar } from "antd-mobile";
import Article from "@/pages/article";
import Message from "@/pages/message";
import Upload from "@/pages/upload";
import "./home.less";
import { tabs } from "./contants";
import { useLocation } from "react-router-dom";
import Me from "../me";

const Home = () => {
  const [activeKey, setActiveKey] = useState("article");
  const [current, setCurrent] = useState(<Article />);
  const location = useLocation();

  useEffect(() => {
    const key = location?.state?.key;
    key && setRouteActive(key);
  }, [location]);

  const setRouteActive = (value: string) => {
    setActiveKey(value);
    switch (value) {
      case "article":
        setCurrent(<Article />);
        break;
      case "message":
        setCurrent(<Message />);
        break;
      case "upload":
        setCurrent(<Upload />);
        break;
      case "me":
        setCurrent(<Me />);
        break;
    }
  };

  const bottom = (
    <TabBar
      safeArea
      activeKey={activeKey}
      onChange={(value) => setRouteActive(value)}
    >
      {tabs().map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
  return (
    <div className="home-ctn">
      <div className="body">{current}</div>
      <div className="bottom">{bottom}</div>
    </div>
  );
};

export default Home;
