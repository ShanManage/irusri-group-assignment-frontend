import { Col, Divider, Flex, Modal, Pagination, Row, Typography } from "antd"
import { APP_PAGINATE_CONFIG, DUMMY_PRODUCT_LIST } from "../../constant"
import { EcProductCard } from "../../components/composite"
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Product } from "../../interface/app";
import { useAuth } from "../../context/AuthContext";
import { LoginFormFields } from "../../interface";
import { useNotify } from "../../hooks";
import { Login } from "../../components/auth";

const { Text } = Typography;

const HomeScreen = () => {
  const { addItem } = useCart();
  const { notify, contextHolder } = useNotify();
  const { authenticate, currentUser } = useAuth()
  const [page, setPage] = useState(APP_PAGINATE_CONFIG.DEFAULT_PAGE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const startIndex = (page - 1) * APP_PAGINATE_CONFIG.DEFAULT_ITEMS_PER_PAGE;
  const endIndex = startIndex + APP_PAGINATE_CONFIG.DEFAULT_ITEMS_PER_PAGE;
  const paginatedProducts = DUMMY_PRODUCT_LIST.slice(startIndex, endIndex);

  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      setPendingProduct(product);
      setIsModalOpen(true);
    } else {
      addItem({ ...product, quantity: 1 });
    }
  };

  const handleLoginSuccess = async (values: LoginFormFields) => {
    try {
      const res = await authenticate(values);
      if (res.success) {
        setIsModalOpen(false);
        if (pendingProduct) {
          addItem({ ...pendingProduct, quantity: 1 });
          setPendingProduct(null);
        }
      }
    } catch (error) {
      notify(
        "Signin failed",
        (error as { message: string }).message || "An unexpected error occurred.",
        "error"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Divider />
        <Row gutter={[16, 16]} justify="center">
          {paginatedProducts.map((product, index) => (
            <Col
              key={index}
              xs={24}
              sm={12} // 2
              md={8} // 3
              lg={6} // 4
            >
              <EcProductCard
                title={product.title}
                subtitle={product.subtitle}
                price={product.price}
                image={product.image}
                onAddToCart={() => handleAddToCart(product)}
              />
            </Col>
          ))}
        </Row>
        <Divider />
        <Flex justify="center">
          <Pagination
            current={page}
            pageSize={APP_PAGINATE_CONFIG.DEFAULT_ITEMS_PER_PAGE}
            total={DUMMY_PRODUCT_LIST.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </Flex>
        <Divider />
        <Modal
          title=""
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Login onFinish={handleLoginSuccess} />
          <Flex justify="center">
            <Text disabled>Note: Assume user already signup to the system</Text>
          </Flex>
        </Modal>
      </div>
    </>
  )
}

export default HomeScreen
