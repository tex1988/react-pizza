export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  cartItems: CartItem[];
}