import { Badge, Flex, Typography } from "antd"
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"

export interface EcIconProps {
  icon: React.ComponentType<AntdIconProps>
  text?: string
  count?: number
  disabled?: boolean
  onClick: () => void
}

const EcIcon = ({
  icon: Icon,
  text,
  onClick,
  count = 0,
  disabled = false
}: EcIconProps) => {
  return (
    <Flex vertical gap={5} align="center" onClick={!disabled ? onClick : undefined} style={{ cursor: 'pointer' }}>
      <Badge count={count}>
        <Icon style={{ fontSize: text ? '22px' : undefined }} />
      </Badge>
      {text && <Typography.Text style={{ fontSize: '10px' }}>{text}</Typography.Text>}
    </Flex>
  )
}

export default EcIcon
