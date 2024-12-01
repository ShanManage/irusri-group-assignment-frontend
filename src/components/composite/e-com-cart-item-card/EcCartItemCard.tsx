import { Card, Typography, Image, Flex, Space, Input, Divider } from "antd"
import styles from './EcCartItemCard.module.scss'
import { EcButton } from "../../atom"
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export interface EcCartItemCardProps {
  title: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
}

const EcCartItemCard = ({
  title,
  subtitle,
  price,
  image,
  quantity
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
            <EcButton type="secondary" icon={<MinusOutlined />} className={styles.minus} />
            <Input disabled value={quantity}/>
            <EcButton type="secondary" icon={<PlusOutlined />} className={styles.plus} />
          </Space>
          <Divider />
          <Flex justify="space-between" align="center">
            <Typography.Text type="secondary" ellipsis>
              {'TOTAL : '}
            </Typography.Text>
            <Typography.Title level={2} ellipsis>
              ${price * quantity}
            </Typography.Title>
          </Flex>
          <Divider />
          <EcButton type="primary" icon={<DeleteOutlined />}>remove</EcButton>
        </Flex>
      </Flex>
    </Card>
  )
}

export default EcCartItemCard
