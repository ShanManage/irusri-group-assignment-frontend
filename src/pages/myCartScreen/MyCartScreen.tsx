import { Empty } from "antd";
import { EcCartItemCard } from "../../components/composite";
import { useCart } from "../../context/CartContext";

const MyCartScreen = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  return (
    <div className="container">
      {cartItems.length === 0 && <Empty />}
      {cartItems.length > 0 && cartItems.map((item) => (
        <EcCartItemCard
          {...item}
          onUpdate={updateQuantity}
          onRemove={removeItem}
        />
      ))}
    </div>
  )
}

export default MyCartScreen
