import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";
import {
  EditOutlined,
  ScissorOutlined,
  AudioOutlined,
  UpCircleFilled,
} from "@ant-design/icons";
import WithSkeleton from "@/components/skeleton";
import { Props } from "./type";
import { sendMessage } from "@/utils/TTSRecorder";
import "./module.scss";

const { TextArea } = Input;

const TextAreaText: React.FC<Props> = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [textHeight, setTextHeight] = useState("20px");
  const [textValue, setTextValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDisabled(!(e.target.value.length > 0));
    setTextHeight(e.target.value.length > 0 ? "auto" : "20px");
    setTextValue(e.target.value);
  };
  const debouncedLog = async (value: string) => {
    setTimeout(() => {
      sendMessage(value);
    }, 1000);
    props.onAreaTextChange(value);
    setDisabled(true);
    setTextValue("");
  };

  return (
    <div className="textArea">
      <div className="Row">
        <div className="edit">
          <EditOutlined />
        </div>

        <TextArea
          autoSize={{ minRows: 1, maxRows: 6 }}
          value={textValue}
          onChange={onChange}
          style={{ height: `${textHeight}` }}
          className="textAreaText"
          placeholder="请输入你的问题！"
        />
        <div className="setting">
          <div className="icons">
            <div className="icon">
              <Tooltip title="暂未开放">
                <ScissorOutlined />
              </Tooltip>
            </div>
            <div className="icon">
              <Tooltip title="暂未开放">
                <AudioOutlined />
              </Tooltip>
            </div>
          </div>
          <div className="hr">|</div>
          <div>
            <Button
              onClick={() => {
                debouncedLog(textValue);
              }}
              className="button"
              type="link"
              icon={<UpCircleFilled />}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithSkeleton(TextAreaText);
