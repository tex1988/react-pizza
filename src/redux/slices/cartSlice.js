import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  pizzas: [],
};

function getSamePizza(state, action) {
  return state.pizzas.find(
    (pizza) => JSON.stringify(pizza, replacer) === JSON.stringify(action.payload, replacer),
  );
}

function replacer(key, value) {
  if (key !== 'count' && key !== 'price') {
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
        samePizza.price += action.payload.price;
      } else {
        state.pizzas.push(action.payload);
        state.pizzas[state.pizzas.length - 1].count = 1;
      }
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalCount++;
    },

    removePizza(state, action) {
      const samePizza = getSamePizza(state, action);
      if (samePizza && samePizza.count === 1) {
        state.pizzas = state.pizzas.filter((pizza) => pizza.id !== action.payload.id);
      } else {
        samePizza.count--;
        samePizza.price -= (samePizza.price/samePizza.count); //need to fix
      }
      state.totalPrice = state.totalPrice - action.payload.price;
      state.totalCount--;
    },

    clearPizzas(state, action) {
      state.pizzas = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addPizza, removePizza, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
