import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


interface MessageItemProps {
  avator: string;
  key: number;
  message: string;
  time: string;
}

const TextMessage: React.FC<MessageItemProps> = (props) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { avator, message, time } = props;
  // 使用正则表达式提取代码部分
  const extractCodeBlocks = (text: string) => {
    const regex = /(```(.*?)```)/gs;
    let match;
    const codeBlocks: string[] = [];
    const textParts: string[] = [];

    let lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // 添加非代码部分
      if (start > lastIndex) {
        textParts.push(text.slice(lastIndex, start));
      }

      // 添加代码部分
      codeBlocks.push(match[1]);

      lastIndex = end;
    }

    // 添加剩余的非代码部分
    if (lastIndex < text.length) {
      textParts.push(text.slice(lastIndex));
    }

    return { codeBlocks, textParts };
  };
  const { codeBlocks, textParts } = extractCodeBlocks(message);
  useEffect(() => {
    if (avator === "robot") {
      setIsAnimated(true);
    }
  }, [avator]);
  const customStyle = {
    // lineHeight: '1.5',
    // fontSize: '1rem',
    // borderRadius: '5px',
    // backgroundColor: '#282C34',
    // padding: '20px',
    // overFlow: 'auto'
    lineHeight: '1.5',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
    padding: '20px'
  };


  const userText = (
    <div className="user">
      <div className="text">
        <div className="time">{time}</div>
        <div className="message-box">
          <div className="content">
            {avator === "user" ? message : ""}
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
        <div className="message">
          <div className="time">{time}</div>
          <div className="message-box">
            <div className={`content ${isAnimated ? 'fade-in' : ''}`}>
              {/* <SyntaxHighlighter language="javascript" style={solarizedlight}>
                {codeString}
                {avator === "robot" ? message : ""}
              </SyntaxHighlighter> */}
              {avator === "robot" ? (
                <>
                  {textParts.map((part, index) => (
                    <React.Fragment key={`text-${index}`}>
                      <div>{part}</div>
                      {index < codeBlocks.length && (
                        <SyntaxHighlighter language="javascript" customStyle={customStyle} className="custom-code-block">
                          {codeBlocks[index].slice(3, -3)}
                        </SyntaxHighlighter>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <div>{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return avator === "user" ? userText : robotText;
};

export default TextMessage;