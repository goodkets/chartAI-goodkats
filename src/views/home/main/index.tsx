import React, { useState } from 'react';
import { Row, Col, Layout, theme } from 'antd';
import './main.scss';
import Chat from './chat';
import TextAreaText from './textArea';
const { Content } = Layout;
const Main: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [text, setText] = useState({
        message: 'user', text: ''
    });
    const AreaTextChange = (e: string) => {
        setText({ ...text, text: e })
    } 
    return (
        <Content
            className="content-flex"
            style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            <Row className="top-content">
                <Col span={24}>
                    <Chat text={text} />
                </Col>
            </Row>
            <Row className="bottom-content">
                <Col span={24}>
                    <TextAreaText onAreaTextChange={AreaTextChange} />
                </Col>
            </Row>
        </Content>
    )
};

export default Main;
