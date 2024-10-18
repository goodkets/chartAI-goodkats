import React, { useState, useMemo } from "react";
import { Layout } from "antd";
import "./main.scss";
import Chat from "./chat";
import TextAreaText from "./textArea";

const { Content, Footer } = Layout;
const Main: React.FC = () => {
  const [text, setText] = useState({
    avator: "user",
    message: "",
    time: ""
  });
  const memoizedText = useMemo(() => text, [text.avator, text.message]);
  const AreaTextChange = (message: string) => {
    setText({ ...text, message });
  };


  return (
    <>
      <Content className="contentMain">
        <Chat text={memoizedText} />
      </Content>
      <Footer className="footerMain">
        <TextAreaText onAreaTextChange={AreaTextChange} />
      </Footer>
    </>
  );
};

export default Main;
