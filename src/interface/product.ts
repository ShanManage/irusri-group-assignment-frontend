export interface Product {
  id: number
  title: string
  subtitle: string
  price: number
  image: string
}

export interface ProductState {
  page: number
  itemsPerPage: number
  isLoading: boolean
  allProducts: GetAllProductsResponse
  searchKeyWord: string
}

export interface ProductQueryParams {
  page: number;
  itemsPerPage: number;
  searchKeyWord: string;
}

export interface GetAllProductsResponse {
  count: number
  data: Product[]
}