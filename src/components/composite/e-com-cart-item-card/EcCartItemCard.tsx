import { Card, Typography, Image, Flex, Space, Input, Divider } from "antd"
import styles from './EcCartItemCard.module.scss'
import { EcButton } from "../../atom"
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export interface EcCartItemCardProps {
  id: number
  title: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
  onUpdate: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

const EcCartItemCard = ({
  id,
  title,
  subtitle,
  price,
  image,
  quantity,
  onUpdate,
  onRemove
}: EcCartItemCardProps) => {
  return (
    <Card
      bordered={false}
      className={styles.card}
    >
      <Flex justify="space-between">

        <Flex gap={15}>
          <Image preview={false} alt={title} width={200} src={image} />

          <Flex vertical align="left" justify="center">
            <Typography.Text type="secondary" ellipsis>
              {subtitle}
            </Typography.Text>
            <Typography.Title level={5} ellipsis>
              {title}
            </Typography.Title>
            <Typography.Title level={5}>
              ${price}
            </Typography.Title>
          </Flex>
        </Flex>

        <Flex vertical align="left" justify="space-between" style={{ width: 200 }}>
          <Space size={0}>
            <EcButton
              type="secondary"
              icon={<MinusOutlined />}
              className={styles.minus}
              onClick={() => onUpdate(id, quantity - 1)}
            />
            <Input disabled value={quantity}/>
            <EcButton
              type="secondary"
              icon={<PlusOutlined />}
              className={styles.plus}
              onClick={() => onUpdate(id, quantity + 1)}
            />
          </Space>
          <Divider />
          <Flex justify="space-between" align="center">
            <Typography.Text type="secondary" ellipsis>
              {'TOTAL : '}
            </Typography.Text>
            <Typography.Title level={2} ellipsis>
              ${(price * quantity).toFixed(2)}
            </Typography.Title>
          </Flex>
          <Divider />
          <EcButton type="primary" icon={<DeleteOutlined />} onClick={() => onRemove(id)}>remove</EcButton>
        </Flex>
      </Flex>
    </Card>
  )
}

export default EcCartItemCard
