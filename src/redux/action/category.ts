import { createAsyncThunk } from "@reduxjs/toolkit"
import { categoryService } from "../../services"

export const getAllProductCategories = createAsyncThunk(
  'category/get-all',
  async () => {
    const categories = await categoryService.getAllProductCategories()
    return categories
  }
)

export const categoryAction = {
  getAllProductCategories
}