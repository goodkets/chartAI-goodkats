import React, { useState } from "react";
import { Row, Col, Layout, theme } from "antd";
import "./main.scss";
import Chat from "./chat";
import TextAreaText from "./textArea";
const { Content, Footer } = Layout;
const Main: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [text, setText] = useState({
    avator: "user",
    message: "",
  });
  const AreaTextChange = (e: string) => {
    console.log(66666);
    setText({ ...text, message: e });
  };

  return (
    <>
      <Content className="contentMain">
        <Chat text={text} />
      </Content>
      <Footer className="footerMain">
        <TextAreaText onAreaTextChange={AreaTextChange} />
      </Footer>
    </>
  );
};

export default Main;
