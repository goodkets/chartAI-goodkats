import {
    UploadOutlined,
    PlusOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
 import { Menu } from 'antd';
 import WithSkeleton from "@/components/Skeleton" 
const MenuAside = () => {
    return (
        <>
                    <Menu
          style={{backgroundColor:"#F3F4F6"}}
        //   theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <PlusOutlined />,
              label: '新对话',
            },
            // {
            //   key: '2',
            //   icon: <VideoCameraOutlined />,
            //   label: 'nav 2',
            // },
            // {
            //   key: '3',
            //   icon: <UploadOutlined />,
            //   label: 'nav 3',
            // },
          ]}
        />
        </>
    )
}

export default WithSkeleton(MenuAside)