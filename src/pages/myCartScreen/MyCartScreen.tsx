import { Card, Empty, Flex, Typography } from "antd";
import { EcCartItemCard } from "../../components/composite";
import { useCart } from "../../context/CartContext";
import { useMemo } from "react";
import styles from './MyCartScreen.module.scss'

const MyCartScreen = () => {
  const { cartItems = [], updateQuantity, removeItem } = useCart();

  const total = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return <Empty />
  }

  return (
    <div className="container">
      <Card className={styles.totalCard}>
        <Flex justify="center" align="center">
          <Typography.Title level={4} ellipsis className="zero-margin">
            CART TOTAL :&nbsp;&nbsp;
          </Typography.Title>
          <Typography.Title level={2} ellipsis className="zero-margin">
            ${total}
          </Typography.Title>

        </Flex>
      </Card>
      {cartItems.map((item) => (
        <EcCartItemCard
          key={item.id}
          {...item}
          onUpdate={updateQuantity}
          onRemove={removeItem}
        />
      ))}
    </div>
  )
}

export default MyCartScreen
