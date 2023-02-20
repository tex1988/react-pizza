import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  cartItems: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  cartItems: [],
};

function getSameItem(state: CartSliceState, action: PayloadAction<CartItem>): CartItem | null {
  const sameItem = state.cartItems.find(
    (item) => JSON.stringify(item, replacer) === JSON.stringify(action.payload, replacer),
  );
  return sameItem ? sameItem as CartItem : null;
}

function replacer(key: string, value: any) {
  if (key !== 'count') {
    return value;
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: CartSliceState, action: PayloadAction<CartItem>): void {
      const sameItem = getSameItem(state, action);
      if (sameItem) {
        sameItem.count++;
      } else {
        state.cartItems.push(action.payload);
        state.cartItems[state.cartItems.length - 1].count = 1;
      }
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalCount++;
    },

    removeItem(state: CartSliceState, action: PayloadAction<CartItem>): void {
      const sameItem: CartItem | null = getSameItem(state, action);
      if (sameItem) {
        if (sameItem.count === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => JSON.stringify(item, replacer) !== JSON.stringify(action.payload, replacer)
          );
        } else {
          sameItem.count--;
        }
      }
      state.totalPrice = state.totalPrice - action.payload.price;
      state.totalCount--;
    },

    removeSameItems(state: CartSliceState, action: PayloadAction<CartItem>): void {
      const sameItem: CartItem | null = getSameItem(state, action);
      if (sameItem) {
        state.cartItems = state.cartItems.filter(
          (pizza) => JSON.stringify(pizza) !== JSON.stringify(sameItem),
        );
        state.totalCount -= sameItem.count;
      }
    },

    clearItems(state: CartSliceState): void {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export function selectCart(state: RootState): CartSliceState {
  return state.cart;
}

export const { addItem, removeItem, removeSameItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
