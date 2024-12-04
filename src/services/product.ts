import { DUMMY_PRODUCT_LIST } from "../constant";
import { GetAllProductsResponse, ProductQueryParams } from "../interface";

const getAllProducts = async ({
  page,
  itemsPerPage,
  searchKeyWord = ""
}: ProductQueryParams): Promise<GetAllProductsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = DUMMY_PRODUCT_LIST;

      if (searchKeyWord) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchKeyWord.toLowerCase())
        );
      }

      const startIndex = (page - 1) * itemsPerPage;
      const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      resolve({
        count: filteredProducts.length,
        data: paginatedProducts
      });
    }, 1000);
  });
};

export const productService = {
  getAllProducts
}