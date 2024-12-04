export interface Product {
  id: number
  title: string
  subtitle: string
  price: number
  image: string
}

export interface ProductState {
  isLoading: boolean
  products: Product[]
  searchKeyWord: string
}