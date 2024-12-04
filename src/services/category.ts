import { DUMMY_PRODUCT_LIST } from "../constant";

const getAllProductCategories = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const uniqueCategories = Array.from(
        new Set(DUMMY_PRODUCT_LIST.map((product) => product.subtitle))
      );

      resolve(uniqueCategories);
    }, 1000);
  });
};

export const categoryService = {
  getAllProductCategories
}