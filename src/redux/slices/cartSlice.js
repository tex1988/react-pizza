import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  purchasePizzas: [],
};

function getSamePizza(state, action) {
  return state.purchasePizzas.find(
    (pizza) => JSON.stringify(pizza, replacer) === JSON.stringify(action.payload, replacer),
  );
}

function replacer(key, value) {
  if (key !== 'count' && key !== 'totalPrice') {
    return value;
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
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

    removePizza(state, action) {
      const samePizza = getSamePizza(state, action);
      if (samePizza && samePizza.count === 1) {
        state.purchasePizzas = state.purchasePizzas.filter(
          (pizza) => pizza.id !== action.payload.id,
        );
      } else {
        samePizza.totalPrice -= samePizza.price;
        samePizza.count--;
      }
      state.totalPrice = state.totalPrice - action.payload.price;
      state.totalCount--;
    },

    removeSamePizzas(state, action) {
      const samePizza = getSamePizza(state, action);
      state.purchasePizzas = state.purchasePizzas.filter(
        (pizza) => JSON.stringify(pizza) !== JSON.stringify(samePizza),
      );
      state.totalPrice -= samePizza.totalPrice;
      state.totalCount -= samePizza.count;
    },

    clearPizzas(state, action) {
      state.purchasePizzas = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export function selectCart(state) {
  return state.cart;
}

export const { addPizza, removePizza, removeSamePizzas, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
