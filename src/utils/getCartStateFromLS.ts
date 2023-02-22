import { CartSliceState } from '../redux/slices/cart/types';

export function getCartStateFromLS(): CartSliceState {
  const cartString: string | null = localStorage.getItem('cart');
  return cartString
    ? JSON.parse(cartString)
    : { cartItems: [], totalCount: 0, totalPrice: 0 };
}