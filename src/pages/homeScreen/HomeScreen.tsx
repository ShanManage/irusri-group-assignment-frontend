import { Col, Divider, Empty, Flex, Modal, Pagination, Row, Skeleton, Typography } from "antd"
import { APP_PAGINATE_CONFIG } from "../../constant"
import { EcProductCard } from "../../components/composite"
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Product } from "../../interface";
import { useAuth } from "../../context/AuthContext";
import { LoginFormFields, RegisterFormFields } from "../../interface";
import { useNotify } from "../../hooks";
import { Login, Register } from "../../components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { productAction } from "../../redux/action/product";
import { setCurrentPage } from "../../redux/slice/product";

const { Text, Link } = Typography;

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { addItem } = useCart();
  const { notify, contextHolder } = useNotify();
  const { authenticate, currentUser, signUp } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const productResponse = useSelector((state: RootState) => state.product.allProducts)
  const isLoading = useSelector((state: RootState) => state.product.isLoading)
  const page = useSelector((state: RootState) => state.product.page)
  const searchKeyWord = useSelector((state: RootState) => state.product.searchKeyWord)

  useEffect(() => {
    dispatch(productAction.getAllProducts())
  }, [page, searchKeyWord])

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      setPendingProduct(product);
      setIsModalOpen(true);
    } else {
      addItem({ ...product, quantity: 1 });
      notify("Item added successfully to the cart", "", "success");
    }
  };

  const onHandleLogin = async (values: LoginFormFields) => {
    try {
      const res = await authenticate(values);
      if (res.success) {
        setIsModalOpen(false);
        notify(res.message, "", "success");
      }
    } catch (error) {
      notify(
        "Signin failed",
        (error as { message: string }).message || "An unexpected error occurred.",
        "error"
      );
    }
  };

  const onHandleRegister = async (values: RegisterFormFields) => {
    try {
      const res = await signUp(values);
      if (res.success) {
        setIsModalOpen(false);
        notify(res.message, "", "success");
      }
    } catch (error) {
      notify(
        "SignUP failed",
        (error as { message: string }).message || "An unexpected error occurred.",
        "error"
      );
    }
  };

  useEffect(() => {
    if (currentUser && pendingProduct) {
      addItem({ ...pendingProduct, quantity: 1 });
      setPendingProduct(null);
      notify("Item added successfully to the cart", "", "success");
    }
  }, [currentUser, pendingProduct])

  const renderSkeleton = () => (
    <div className="container">
      <Row gutter={[16, 16]} justify="center">
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <div style={{ padding: "16px", textAlign: "left" }}>
              <Skeleton.Image active style={{ width: "200px", height: "200px" }} />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );

  if (isLoading) return renderSkeleton()

  if (productResponse.data.length === 0) return <Empty />

  return (
    <>
      {contextHolder}
      <div className="container">
        <Divider />
        <Row gutter={[16, 16]} justify="center">
          {productResponse.data.map((product, index) => (
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
            total={productResponse.count}
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
          {isLogin && <Login onFinish={onHandleLogin} />}
          {!isLogin && <Register onFinish={onHandleRegister} />}
          <Flex justify="center">
            <Text>
              {isLogin ? "Don't" : "Do"} you have an account?{' '}
              <Link onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign up" : "Sign in"}
              </Link>
            </Text>
          </Flex>
        </Modal>
      </div>
    </>
  )
}

export default HomeScreen
