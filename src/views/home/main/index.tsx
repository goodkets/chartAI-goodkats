import React from 'react';
import { Row, Col, Layout, theme } from 'antd';
import './main.scss';
const { Content } = Layout;
const Main: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Content
            className="content-flex"
            style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            <Row className="top-content">
                <Col span={24}>顶部内容</Col>
            </Row>
            <Row className="bottom-content">
                <Col span={24}>底部内容</Col>
            </Row>
        </Content>
    )
};

export default Main;
