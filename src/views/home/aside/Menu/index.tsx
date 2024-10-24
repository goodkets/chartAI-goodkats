import {
    UploadOutlined,
    PlusOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Menu, Tooltip } from 'antd';
import WithSkeleton from "@/components/skeleton"
const MenuAside = () => {
    return (
        <>
                    <Menu
          style={{backgroundColor:"#F3F4F6"}}
        //   theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key='1' icon={<PlusOutlined />}>
            <Tooltip title="由于服务器限制，暂不支持新对话">
              新对话
            </Tooltip>
          </Menu.Item>
        </Menu>
        </>
    )
}

export default WithSkeleton(MenuAside)