import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import WithSkeleton from "@/components/skeleton"
const SettingAside = (props) => {
    return (
        <>
              <Button type="link" icon={<ExclamationCircleOutlined />} style={{fontSize:'20px',fontWeight:700}}>
          {props.Toggle ? '' : '关于chartAI'}
      </Button>

        </>

    )
}
export default WithSkeleton(SettingAside)