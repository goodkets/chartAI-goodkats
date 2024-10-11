import React, { useState,useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme, Row, Col } from 'antd';
import './header.scss'
const { Header } = Layout;
const Headers: React.FC = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false);
    const {
      token: { colorBgContainer, },
    } = theme.useToken();
    const btnSetCollapsed = () => {
      setCollapsed(!collapsed);
      props.onHomeSetCollapsed(!collapsed)
    }
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <Row justify="space-around">
            <Col span={12}>
                {props.Toggle ? <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={btnSetCollapsed}
            style={{
                fontSize: '16px',
                width: 64,
                height: 64,
            }}
            /> : ''}
            </Col>
            <Col span={12}>
            <div className='login'>
                <Button className='button' >登录</Button>
            </div>
            </Col>
        </Row>
        
      </Header>
    )
};

export default Headers;
