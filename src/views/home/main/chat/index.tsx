import React, { useEffect, useState, useRef } from "react";
import WithSkeleton from "@/components/skeleton";
import { Props, TextItem } from "./type";
import "./module.scss";
import TextMessage from "@/components/textMessage";
import {
  setOnMessageCallback
} from "@/utils/TTSRecorder";
import { getCurrentTime } from "@/utils/time";


const Chat: React.FC<Props> = (props) => {
  const { text } = props;
  console.log(text, "聊天");
  const [texts, setTexts] = useState<TextItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (text.avator === "user" && text.message) {
      setTexts([...texts, { message: text.message, avator: "user", time: getCurrentTime() }]);
    }
  }, [text]);
  setOnMessageCallback((message: string) => {
    console.log(message, "message");
    setTimeout(() => {
      setTexts([
        ...texts,
        { ...message, time: getCurrentTime() },
      ]);
    }, 200)
  }); 
  useEffect(() => {
    // 每次消息更新时滚动到底部
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [texts]);

  return (
    <>
      <div className="containerChat" style={{ height: "200px" }}>
        {texts.map((item, index) => (
          <TextMessage
            avator={item.avator}
            key={index}
            message={item.message}
            time={item.time}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default WithSkeleton(Chat);
