
import React from 'react';
import { Card, FloatButton, Image, Typography } from 'antd';
import styles from './EcProductCard.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';

export interface EcProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  image: string;
  onAddToCart: () => void
}

const EcProductCard: React.FC<EcProductCardProps> = ({
  title,
  subtitle,
  price,
  image,
  onAddToCart
}) => {

  return (
    <Card
      hoverable
      bordered={false}
      className={styles.card}
      cover={
        <div style={{ position: 'relative' }}>
          <Image preview={false} alt={title} src={image} />
          <FloatButton
            icon={<ShoppingCartOutlined />}
            type="primary"
            shape="circle"
            className={styles.floatButton}
            onClick={onAddToCart}
          />
        </div>
    }
    >
      <Typography.Text type="secondary" ellipsis>
        {subtitle}
      </Typography.Text>
      <Typography.Title level={5} ellipsis>
        {title}
      </Typography.Title>
      <Typography.Title level={5}>
        ${price.toFixed(2)}
      </Typography.Title>
    </Card>
  );
};

export default EcProductCard;