import { Col, Divider, Flex, Pagination, Row } from "antd"
import { APP_PAGINATE_CONFIG, DUMMY_PRODUCT_LIST } from "../../constant"
import { EcProductCard } from "../../components/composite"
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const HomeScreen = () => {
  const { addItem } = useCart();
  const [page, setPage] = useState(APP_PAGINATE_CONFIG.DEFAULT_PAGE);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const startIndex = (page - 1) * APP_PAGINATE_CONFIG.DEFAULT_ITEMS_PER_PAGE;
  const endIndex = startIndex + APP_PAGINATE_CONFIG.DEFAULT_ITEMS_PER_PAGE;
  const paginatedProducts = DUMMY_PRODUCT_LIST.slice(startIndex, endIndex);


  return (
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
              onAddToCart={() => addItem({...product, quantity: 1})}
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
    </div>
  )
}

export default HomeScreen
