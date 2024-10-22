import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
// import "./styles.css"; // 引入 CSS 文件

interface MessageItemProps {
  avator: string;
  key: number;
  message: string;
  time: string;
}

const TextMessage: React.FC<MessageItemProps> = (props) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (props.avator === "robot") {
      setIsAnimated(true);
    }
  }, [props.avator]);

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
            <div className={`content ${isAnimated ? 'fade-in' : ''}`}>
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