import React, { useEffect, useReducer, useRef, useState } from "react";
import WithSkeleton from "@/components/skeleton";
import { Props, TextItem } from "./type";
import "./module.scss";
import TextMessage from "@/components/textMessage";
import { setOnMessageCallback } from "@/utils/TTSRecorder";
import { getCurrentTime } from "@/utils/time";
import Message from "@/components/message";
import { changeDisabled, changeMessageStatus } from "@/store/chatAI";
import { useDispatch } from "react-redux";

type Action =
  | { type: "ADD_USER_MESSAGE"; message: string }
  | { type: "ADD_ROBOT_MESSAGE_START"; message: string }
  | { type: "ADD_ROBOT_MESSAGE_PART"; message: string };

const initialState: TextItem[] = [];

const reducer = (state: TextItem[], action: Action): TextItem[] => {
  switch (action.type) {
    case "ADD_USER_MESSAGE":
      return [
        ...state,
        {
          message: action.message,
          avator: "user",
          time: getCurrentTime(),
          key: Date.now(),
        },
      ];
    case "ADD_ROBOT_MESSAGE_START":
      return [
        ...state,
        {
          message: action.message,
          avator: "robot",
          time: getCurrentTime(),
          key: Date.now(),
        },
      ];
    case "ADD_ROBOT_MESSAGE_PART": {
      const lastMessageIndex = state.length - 1;
      if (lastMessageIndex >= 0 && state[lastMessageIndex].avator === "robot") {
        const updatedLastMessage = {
          ...state[lastMessageIndex],
          message: state[lastMessageIndex].message + action.message,
        };
        return [...state.slice(0, lastMessageIndex), updatedLastMessage];
      }
      return state;
    }
    default:
      return state;
  }
};

const Chat: React.FC<Props> = (props) => {
  const dispatchs = useDispatch();
  const { text } = props;
  // console.log(text, "聊天");
  const [texts, dispatch] = useReducer(reducer, initialState);
  const [messageStatus, setMessageStatus] = useState<{
    message: string;
    status: string;
    messages: string;
  }>({
    message: "",
    status: "",
    messages: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (text.avator === "user" && text.message) {
      dispatch({ type: "ADD_USER_MESSAGE", message: text.message });
    }
  }, [text]);

  setOnMessageCallback(({ message, avator, status }) => {
    dispatchs(changeDisabled(true)); //消息没通信完成不能允许发送
    if (typeof status === "number" && status == 2) {
      dispatchs(changeMessageStatus(true));
    }
    if (
      status !== undefined &&
      typeof status === "number" &&
      status >= 400 &&
      status <= 500
    ) {
      setMessageStatus({
        message: message + status,
        status: "error",
        messages: message,
      });
    }
    setTimeout(() => {
      if (
        status !== undefined &&
        (typeof status === "number" ? status === 0 : status === "0")
      ) {
        dispatch({ type: "ADD_ROBOT_MESSAGE_START", message: message });
      } else {
        dispatch({ type: "ADD_ROBOT_MESSAGE_PART", message: message });
      }
    }, 500);
  });

  useEffect(() => {
    // 每次消息更新时滚动到底部
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [texts]);

  return (
    <>
      <Message messagesChange={messageStatus} />
      <div className="containerChat" style={{ height: "200px" }}>
        {texts.map((item, index) => (
          <TextMessage
            avator={item.avator}
            message={item.message}
            key={item.key}
            time={item.time}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default WithSkeleton(Chat);
