import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (text.avator === "user" && text.message) {
      setTexts([...texts, { message: text.message, avator: "user", time: getCurrentTime() }]);
    }
  }, [text]);
  setOnMessageCallback((message: string) => {
    setTexts([
      ...texts,
      { message, avator: "robot", time: getCurrentTime() },
    ]);
  }); 

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
      </div>
    </>
  );
};

export default WithSkeleton(Chat);
