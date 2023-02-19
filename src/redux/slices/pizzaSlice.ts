import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

export type PizzaQueryParams = {
  category?: string;
  search?: string;
  sortBy: string;
  limit: number;
  page: number;
  order: string;
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params: PizzaQueryParams) => {
  const { data } = await axios.get(`${baseUrl}/pizza`, { params: params });
  return data;
});

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'completed';
    },
    [fetchPizzas.pending]: (state, action) => {
      state.pizzas = [];
      state.status = 'loading';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.pizzas = [];
      state.status = 'error';
    },
  },
});

export function selectPizzas(state) {
  return state.pizza;
}

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
