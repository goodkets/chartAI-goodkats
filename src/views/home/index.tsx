import React, { useState, useEffect } from "react";
import { Flex, Layout } from "antd";
import Aside from "./aside";
import Header from "./header";
import Main from "./main";

const Home: React.FC = () => {
  const [Collapsed, homeSetCollapsed] = useState(false);
  const onCollapse = (collapsed: boolean) => {
    homeSetCollapsed(collapsed);
  };
  const [buttonStatus, setButtonStatus] = useState(false);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (viewWidth <= 900) {
      // alert("请使用移动端浏览");
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [viewWidth]);
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    // lineHeight: "64px",
    backgroundColor: "#4096ff",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    // minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#0958d9",
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    // lineHeight: "120px",
    // height: "100vh",
    // color: "#fff",
    // backgroundColor: "#1677ff",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    // color: "#fff",
    backgroundColor: "#4096ff",
  };

  const layoutStyle = {
    height: "100vh",
  };
  return (
    // <Layout style={{ height: "100vh" }}>
    //   <Aside useCollapsed={Collapsed} Toggle={buttonStatus}></Aside>
    //   <Layout>
    //     <Header onHomeSetCollapsed={onCollapse} Toggle={buttonStatus}></Header>
    //     <Main></Main>
    //   </Layout>
    // </Layout>
    <Flex>
      <Layout style={layoutStyle}>
        {/* <Sider style={siderStyle}> */}
        <Aside useCollapsed={Collapsed} Toggle={buttonStatus}></Aside>
        {/* </Sider> */}
        <Layout>
          <Header
            onHomeSetCollapsed={onCollapse}
            Toggle={buttonStatus}
          ></Header>
          <Main></Main>
          {/* <Header style={headerStyle}>Header</Header> */}
          {/* <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer> */}
        </Layout>
      </Layout>
    </Flex>
  );
};

export default Home;
