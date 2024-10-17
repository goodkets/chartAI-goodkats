import React, { useState } from 'react';
import { Flex, Input, Row, Col, Button, Tooltip } from 'antd';
import { EditOutlined, ScissorOutlined, AudioOutlined, UpCircleFilled } from '@ant-design/icons';
import WithSkeleton from '@/components/skeleton';
import { Props } from './type';
import { sendMessage, socket } from '@/utils/TTSRecorder';
import { useSelector, useDispatch } from 'react-redux';
// import chatAI from '@/store/chatAI';

const { TextArea } = Input;

const TextAreaText: React.FC<Props> = (props) => {

    const text = useSelector((state: any) => state.chatAI.c);
    // console.log(text, 'text');
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [textHeight, setTextHeight] = useState('20px');
    const [textValue, setTextValue] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDisabled(!(e.target.value.length > 0));
        setTextHeight(e.target.value.length > 0 ? 'auto' : '20px');
        setTextValue(e.target.value);
    };
    const debouncedLog = async (value: string) => {
        setTimeout(() => {
            sendMessage(socket, value)
        }, 1000)
        console.log(value, 111);
        props.onAreaTextChange(value)
        setDisabled(true);
        setTextValue('');
    };

    return (
        <div className='textArea'>
            <div className='Row'>
                <div className='edit'>
                    <EditOutlined />
                </div>

                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            value={textValue}
                            onChange={onChange}
                    style={{ height: `${textHeight}` }}
                            className='textAreaText'
                            placeholder="请输入你的问题！"
                        />
                <div className='setting'>
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
                </div>
            </div>
        </div>
    );
};

export default WithSkeleton(TextAreaText);