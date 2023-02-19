import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ICartItem = {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  totalPrice: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  purchasePizzas: ICartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  purchasePizzas: [],
};

function getSamePizza(state: CartSliceState, action: PayloadAction<ICartItem>): ICartItem | null {
  const samePizza = state.purchasePizzas.find(
    (pizza) => JSON.stringify(pizza, replacer) === JSON.stringify(action.payload, replacer),
  );
  return samePizza ? samePizza as ICartItem : null;
}

function replacer(key: string, value: any) {
  if (key !== 'count' && key !== 'totalPrice') {
    return value;
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state: CartSliceState, action: PayloadAction<ICartItem>): void {
      const samePizza = getSamePizza(state, action);
      if (samePizza) {
        samePizza.count++;
        samePizza.totalPrice += action.payload.price;
      } else {
        state.purchasePizzas.push(action.payload);
        state.purchasePizzas[state.purchasePizzas.length - 1].count = 1;
        state.purchasePizzas[state.purchasePizzas.length - 1].totalPrice = action.payload.price;
      }
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalCount++;
    },

    removePizza(state: CartSliceState, action: PayloadAction<ICartItem>): void {
      const samePizza: ICartItem | null = getSamePizza(state, action);
      if (samePizza) {
        if (samePizza.count === 1) {
          state.purchasePizzas = state.purchasePizzas.filter(
            (pizza) => pizza.id !== action.payload.id,
          );
        } else {
          samePizza.totalPrice -= samePizza.price;
          samePizza.count--;
        }
      }
      state.totalPrice = state.totalPrice - action.payload.price;
      state.totalCount--;
    },

    removeSamePizzas(state: CartSliceState, action: PayloadAction<ICartItem>): void {
      const samePizza: ICartItem | null = getSamePizza(state, action);
      if (samePizza) {
        state.purchasePizzas = state.purchasePizzas.filter(
          (pizza) => JSON.stringify(pizza) !== JSON.stringify(samePizza),
        );
        state.totalPrice -= samePizza.totalPrice;
        state.totalCount -= samePizza.count;
      }
    },

    clearPizzas(state: CartSliceState, action: PayloadAction<ICartItem>): void {
      state.purchasePizzas = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

// @ts-ignore
export function selectCart(state) {
  return state.cart;
}

export const { addPizza, removePizza, removeSamePizzas, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
