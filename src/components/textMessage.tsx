import React from "react";
import { Avatar } from 'antd'
import { getCurrentTime } from '@/utils/time'
const TextMessage: React.FC = (props) => {
    console.log(props, 222)
    const userText = <div className="user">
        <div className="text">
            <div className="time">{getCurrentTime()}</div>
            <div className="message-box">
                <div className="content">
                    {props.avator == 'user' ? props.message : ''}
                </div>
            </div>
        </div>
        <div className="userInfo">
            {/* <UserLogo /> */}
            <Avatar src='https://qiniuchat.littlewheat.com/other/avatar.jpg'></Avatar>
        </div>
    </div>
    const robotText = <div className="robot">
        <div className="text">
            <div className="robotInfo">
                {/* <UserLogo /> */}
                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NfiJQjkpTOAXKqKzMcd4kmcOQ4j2mZ4qpA&s'></Avatar>
            </div>
            <div>
                <div className="time">{getCurrentTime()}</div>
                <div className="message-box">
                    <div className="content">
                        {props.avator == 'robot' ? props.message : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>
    return (
        <>
            {props.avator == 'user' ? userText : robotText}
        </>
    )
};

export default TextMessage;