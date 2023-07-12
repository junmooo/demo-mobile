import React, { useEffect, useRef, useState } from "react";
import { Button, Popup, Sticky, Image } from "@nutui/nutui-react";
import "./portal.less";
import logo from "@/assets/img/logo.jpg";
import menu from "@/assets/img/menu.png";
import sys2Img1 from "@/assets/img/sys2Img1.png";
import sys2Img2 from "@/assets/img/sys2Img2.png";
import sys2Img3 from "@/assets/img/sys2Img3.png";
import sys2Img4 from "@/assets/img/sys2Img4.png";
import wechatIcon from "@/assets/img/wechat.png";
import wechat from "@/assets/img/wechat.jpg";
import { useIntl } from "react-intl";

interface Iprops {}

const Demo = React.memo(function Demo(props: Iprops) {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  return (
    <div className="container">
      <Sticky threshold={0} position={"top"}>
        <div className="header">
          <Image src={logo} width="50px" />
          <div className="title">互联网技术服务</div>
          <div style={{ width: "50px" }}>
            <Image src={menu} width="25px" />
          </div>
        </div>
      </Sticky>
      <div className="banner">
        <div className="text">
          <p>集信息化、数字化、个性化于一体</p>
          <p>大幅提升资源利用率</p>
          <p>助力企业实现智能化升级</p>
        </div>
      </div>
      <div className="sys1Box">
        <div className="boxTit">
          <span>系统定制服务</span>
        </div>
        <div className="text">
          <p>根据客户的特定业务需求，</p>
          <p>为客户提供系统设计开发定制化解决方案</p>
          <p>高效实施产品落地并提供终身的售后服务</p>
          <p>帮助客户实现个性化业务流程，</p>
          <p>陪伴客户使用系统的整个生命周期</p>
        </div>
      </div>
      <Image src={sys2Img1} height="150px" fit="cover" />
      <div className="textCtn">
        <p className="title">主要业务平台</p>
        <p>web网站</p>
        <p>微信小程序</p>
        <p>Android IOS 客户端</p>
        <p>MAC PC客户端</p>
      </div>
      <Image src={sys2Img4} height="150px" fit="cover" />、
      <div className="textCtn">
        <p className="title">主要业务内容</p>
        <p>门户网站建设，活动、产品展示等</p>
        <p>后台管理系统，如人员信息录入，信息统计、归档等</p>
        <p>个人博客，收藏、作品展等</p>
        <p>平台商城，垂直电商等</p>
        <p>其他可根据客户需求私人定制</p>
      </div>
      <Image src={sys2Img2} height="150px" fit="cover" />
      <div className="wechat" onClick={() => setShow(true)}>
        <Image src={wechatIcon} height="20px" width="20px" fit="cover" />
      </div>
      <Popup
        visible={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <Image src={wechat} width="300" fit="cover" loading />
      </Popup>
    </div>
  );
});

export default Demo;
