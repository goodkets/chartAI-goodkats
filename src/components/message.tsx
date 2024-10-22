import React, { useEffect } from 'react';
import { message } from 'antd';

interface Props {
    messagesChange: { status: string; message: string; messages: string };
}

const Message: React.FC<Props> = ({ messagesChange }) => {
    console.log('message99999', messagesChange);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        // 根据 status 的值调用相应的方法
        switch (messagesChange.status) {
            case 'success':
                messageApi.open({
                    type: 'success',
                    content: messagesChange.messages,
                });
                break;
            case 'error':
                console.log('error');
                messageApi.open({
                    type: 'error',
                    content: messagesChange.message,
                });
                break;
            case 'warning':
                messageApi.open({
                    type: 'warning',
                    content: messagesChange.message,
                });
                break;
            default:
                break;
        }
    }, [messagesChange.status, messageApi]);

    return (
        <div>
            {contextHolder}
        </div>
    );
};

export default Message;