import React, {useState} from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Logo from "@/assets/react.svg";
import "./aside.scss"
const { Sider } = Layout;
const Aside: React.FC = (props) => {
    // console.log(us,8888)
    // const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider style={{backgroundColor:"#F3F4F6"}} trigger={null}  collapsible collapsed={props.useCollapsed}>
        <div className="demo-logo-vertical" >
            <img src={Logo}  alt="" />
        </div>
        <Menu
          style={{backgroundColor:"#F3F4F6"}}
        //   theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
    )
};

export default Aside;
