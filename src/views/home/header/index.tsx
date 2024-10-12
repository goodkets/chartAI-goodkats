import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme, Row, Col } from 'antd';
import './header.scss'
import WithSkeleton from "@/components/Skeleton"
import type { HeadersProps } from './type'
const { Header } = Layout;


const Headers: React.FC<HeadersProps> = (props) => {
    const [collapsed, setCollapsed] = useState(false);
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
                width: 30,
                height: 30,
                marginLeft:'10px'
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
export default WithSkeleton(Headers)
