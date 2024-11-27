
import React from 'react';
import { Card, Image, Typography } from 'antd';
import styles from './EcProductCard.module.scss';

export interface EcProductCardProps {
  title: string;
  subtitle: string;
  price: number;
  image: string;
}

const EcProductCard: React.FC<EcProductCardProps> = ({
  title,
  subtitle,
  price,
  image,
}) => {

  return (
    <Card
      hoverable
      bordered={false}
      className={styles.card}
      cover={<Image preview={false} alt={title} src={image}/>}
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