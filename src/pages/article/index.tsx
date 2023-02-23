import { all } from "@/api/article";
import { useRequest } from "ahooks";
import { List } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import moment from "moment";
import MyNavBar from "@/components/common/navbar";

const AriticleList = React.memo(function NotFound() {
  const { loading, data, run } = useRequest(all);
  const navigete = useNavigate();
  return (
    <div className="article-list-ctn">
      <MyNavBar title="文章列表" />

      <List className="list" header="ARTICLES">
        {data?.map((item: Article) => {
          return (
            <List.Item
              key={item.id}
              onClick={() => navigete("/article", { state: { item } })}
              description={`作者: ${item?.authorName} 创建时间: ${moment(
                item?.timeCreated
              ).format("YYYY-MM-DD HH:mm:SS")}`}
            >
              {item.title}
            </List.Item>
          );
        })}
      </List>
    </div>
  );
});

export default AriticleList;
