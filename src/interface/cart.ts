import { Product } from "./app";

export type CartItem = Product & {
  quantity: number;
};

export type CartState = {
  userCart: { [userId: string]: CartItem[] };
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: { userId: number; item: CartItem } }
  | { type: "REMOVE_ITEM"; payload: { userId: number; id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { userId: number; id: number; quantity: number } }
  | { type: "LOAD_CART"; payload: CartState };

export type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};