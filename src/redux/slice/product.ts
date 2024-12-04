import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../interface";
import { productAction } from "../action/product";
import { APP_PAGINATE_CONFIG } from "../../constant";

const initialState: ProductState = {
  page: APP_PAGINATE_CONFIG.DEFAULT_PAGE,
  itemsPerPage: APP_PAGINATE_CONFIG.DEFAULT_ITEMS_PER_PAGE,
  isLoading: false,
  isDrawerOpen: false,
  allProducts: {
    count: 0,
    data: []
  },
  searchKeyWord: "",
  selectedCategory: "",
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyWord = action.payload;
      state.page = initialState.page;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = initialState.page;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(productAction.getAllProducts.pending, (state) => {
      state.allProducts = initialState.allProducts
      state.isLoading = true
    })
    .addCase(productAction.getAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload
      state.isLoading = false
    })
  }
})

export const {
  setSearchKeyword,
  setCurrentPage,
  toggleDrawer,
  setCategory
 } = productSlice.actions;
export default productSlice.reducer;