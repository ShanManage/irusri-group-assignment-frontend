import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../services";

export const getAllProducts = createAsyncThunk(
  'product/get-all',
  async () => {
    const products = await productService.getAllProducts()
    console.log('action', products)
    return products
  }
)

export const productAction = {
  getAllProducts
}