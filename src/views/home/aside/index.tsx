import React from 'react';

import { Layout, Row,Col } from 'antd';
import "./aside.scss"
import MenuAside from "./Menu"
import SettingAside from "./setting"
import LogoAside from "./logo"
import type { AsideProps } from './type';
const { Sider,Content } = Layout;


const Aside: React.FC<AsideProps> = (props) => {
    if(props.useCollapsed && props.Toggle) {
      return <div></div>
    }
    return (
        <Sider width={props.Toggle ? '15%':'280px'}  style={{backgroundColor:"#F3F4F6"}} trigger={null}  collapsible collapsed={props.Toggle}>
          <LogoAside />
        <Content className='asideContent-flex'>
          <Row>
            <Col span={24}>
              <MenuAside />
            </Col>
          </Row>
          <Row  className="bottom-content">
            <Col span={24}>
              <SettingAside />
            </Col>
          </Row>
        </Content>
      </Sider>
    )
};

export default Aside;
