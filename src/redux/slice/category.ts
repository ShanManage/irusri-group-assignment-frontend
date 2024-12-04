import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../../interface";
import { categoryAction } from "../action/category";

const initialState: CategoryState = {
  isLoading: false,
  categories: []
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(categoryAction.getAllProductCategories.pending, (state) => {
      state.categories = initialState.categories
      state.isLoading = true
    })
    .addCase(categoryAction.getAllProductCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
  }
})

export default categorySlice.reducer;