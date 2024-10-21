import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import Typed from "typed.js";
import generateRandomLetters from "@/utils/randomLtter";
interface MessageItemProps {
  avator: string;
  key: number;
  message: string;
  time: string;
}

const TextMessage: React.FC<MessageItemProps> = (props) => {
  const index = generateRandomLetters(5, true);
  const uniqueId = `content-${index}`;

  useEffect(() => {
    if (props.avator === "robot") {
      const options = {
        strings: [props.message],
        typeSpeed: 80,
        showCursor: false,
      };
      const typed = new Typed(`#${uniqueId}`, options);
      return () => {
        typed.destroy();
      };
    }
  }, [props.avator, props.message, uniqueId]);

  const userText = (
    <div className="user">
      <div className="text">
        <div className="time">{props.time}</div>
        <div className="message-box">
          <div className="content">
            {props.avator === "user" ? props.message : ""}
          </div>
        </div>
      </div>
      <div className="userInfo">
        <Avatar src="https://qiniuchat.littlewheat.com/other/avatar.jpg"></Avatar>
      </div>
    </div>
  );

  const robotText = (
    <div className="robot">
      <div className="text">
        <div className="robotInfo">
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NfiJQjkpTOAXKqKzMcd4kmcOQ4j2mZ4qpA&s"></Avatar>
        </div>
        <div>
          <div className="time">{props.time}</div>
          <div className="message-box">
            <div className="content" id={uniqueId}>
              {props.avator === "robot" ? props.message : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return props.avator === "user" ? userText : robotText;
};

export default TextMessage;
