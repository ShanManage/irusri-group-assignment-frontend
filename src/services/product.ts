import { DUMMY_PRODUCT_LIST } from "../constant";
import { Product } from "../interface";

const getAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_PRODUCT_LIST);
    }, 1000);
  });
}

export const productService = {
  getAllProducts
}