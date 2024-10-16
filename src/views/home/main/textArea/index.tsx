import React, { useState } from 'react';
import { Flex, Input, Row, Col, Button, Tooltip } from 'antd';
import { EditOutlined, ScissorOutlined, AudioOutlined, UpCircleFilled } from '@ant-design/icons';
import WithSkeleton from '@/components/skeleton';
import { Props } from './type';
import { getChatList } from '@/api/charAI';
import fetchToken from '@/utils/fetchToken';
// import ChatWebSocket from '@/utils/ChatWebSocket';

const { TextArea } = Input;

const TextAreaText: React.FC<Props> = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [textHeight, setTextHeight] = useState('20px');
    const [textValue, setTextValue] = useState('');
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDisabled(!(e.target.value.length > 0));
        setTextHeight(e.target.value.length > 0 ? 'auto' : '20px');
        setTextValue(e.target.value);
    };
    const debouncedLog = async (value: string) => {
        // const res = await getChatList({})
        // console.log(res, 222);
        await fetchToken();
        // const websocketUrl = 'wss://spark-api.xf-yun.com/v3.1/chat';
        // const chatWebSocket = new ChatWebSocket(websocketUrl);
        // chatWebSocket.connect();
        props.onAreaTextChange(value)
        setDisabled(true);
        setTextValue('');
    };

    return (
        <div className='textArea'>
            <Row className='Row' style={{ height: '100%' }}>
                <Col span={1} className='edit'>
                    <EditOutlined />
                </Col>
                <Col span={19}>
                    <Flex vertical gap={32}>
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            value={textValue}
                            onChange={onChange}
                            style={{ height: `${textHeight}`, width: "max-content" }}
                            className='textAreaText'
                            placeholder="请输入你的问题！"
                        />
                    </Flex>
                </Col>
                <Col span={4} className='setting'>
                    <div className='icons'>
                        <div className='icon'>
                            <Tooltip title="暂未开放">
                        <ScissorOutlined />
                            </Tooltip>
                        </div>
                        <div className='icon'>
                            <Tooltip title="暂未开放">
                        <AudioOutlined />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="hr">
                        |
                    </div>
                    <div>
                        <Button onClick={() => { debouncedLog(textValue) }} className='button' type="link" icon={<UpCircleFilled />} disabled={disabled} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default WithSkeleton(TextAreaText);