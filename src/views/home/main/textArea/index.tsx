import React, { useState, useRef, useEffect } from 'react';
import { Flex, Input, Row, Col, Button } from 'antd';
import { EditOutlined, ScissorOutlined, AudioOutlined, UpCircleFilled } from '@ant-design/icons';
import WithSkeleton from '@/components/Skeleton';

const { TextArea } = Input;

const TextAreaText: React.FC = () => {
    const [disabled, setDisabled] = useState(true);
    const [textHeight, setTextHeight] = useState('20px');
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDisabled(!(e.target.value.length > 0));
        setTextHeight(e.target.value.length > 0 ? 'auto' : '20px');
        console.log('Change:', calculateRowCount(e.target.value));
    };

    const calculateRowCount = (value: string) => {
        const lines = value.split('\n');
        const lineCount = lines.length;
        return Math.max(lineCount, 1); // 最少为1行
    };

    return (
        <div className='textArea'>
            <Row className='Row' style={{ height: '100%' }}>
                <Col span={1} className='edit'>
                    <EditOutlined />
                </Col>
                <Col span={19} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Flex vertical gap={32}>
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                            onChange={onChange}
                            style={{ height: `${textHeight}`, width: '100%' }}
                            className='textAreaText'
                            placeholder="请输入你的问题！"
                        />
                    </Flex>
                </Col>
                <Col span={4} className='setting'>
                    <span className='icon'>
                        <ScissorOutlined />
                    </span>
                    <span className='icon'>
                        <AudioOutlined />
                    </span>
                    <div className="hr">
                        |
                    </div>
                    <Button className='button' type="link" icon={<UpCircleFilled />} disabled={disabled} />
                </Col>
            </Row>
        </div>
    );
};

export default WithSkeleton(TextAreaText);