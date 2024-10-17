import React, { useEffect, useState } from "react";
import WithSkeleton from "@/components/skeleton";
import { Props } from "./type";
// import UserLogo from '@/components/userLogo'
import "./module.scss";
import TextMessage from "@/components/textMessage";
import {
  sendMessage,
  setOnMessageCallback,
  setOnCloseCallback,
} from "@/utils/TTSRecorder";

const Chat: React.FC<Props> = (props) => {
  const { text } = props;
  console.log(text, "聊天");
  const [texts, setTexts] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (text.avator === "user" && text.message) {
      // console.log("user");
      setTexts([...texts, text]);
    }
  }, [text]);
  useEffect(() => {
    setOnMessageCallback((event) => {
      console.log("WebSocket 收到消息:", event.data);
      const { payload } = JSON.parse(event.data);
      console.log(event.data, 11111);
      setContent([
        ...content,
        { message: payload.choices.text[0].content, avator: "robot" },
      ]);
    });

    setOnCloseCallback(() => {
      const message = content.map((item) => item.message).join("");
      console.log(message, "message");
      setTexts([...texts, { avator: "robot", message: message }]);
      console.log("WebSocket 连接已关闭");
    });

    // 清理回调函数
    return () => {
      setOnMessageCallback(null);
      setOnCloseCallback(null);
    };
  }, [content, texts]);

  return (
    <>
      <div className="containerChat" style={{ height: "200px" }}>
        {texts.map((item, index) => (
          <TextMessage
            avator={item.avator}
            key={index}
            message={item.message}
          />
        ))}
      </div>
    </>
  );
};

export default WithSkeleton(Chat);
