import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../interface";
import { productAction } from "../action/product";

const initialState: ProductState = {
  isLoading: false,
  products: [],
  searchKeyWord: ""
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(productAction.getAllProducts.pending, (state) => {
      state.products = []
      state.isLoading = true
    })
    .addCase(productAction.getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })
  }
})

export default productSlice.reducer;