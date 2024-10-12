import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import WithSkeleton from "@/components/Skeleton"
const SettingAside = () => {
    return (
        <>
              <Button type="link" icon={<ExclamationCircleOutlined />} style={{fontSize:'20px',fontWeight:700}}>
        关于chartAI
      </Button>

        </>

    )
}
export default WithSkeleton(SettingAside)