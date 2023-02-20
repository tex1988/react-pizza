import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

export type PizzaQueryParams = {
  category?: number;
  search?: string;
  sortBy: string;
  limit: number;
  page: number;
  order: string;
};

export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface PizzaSliceState {
  pizzas: Pizza[];
  status: 'loading' | 'completed' | 'error';
}

export const fetchPizzas = createAsyncThunk<Pizza[], PizzaQueryParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { data } = await axios.get<Pizza[]>(`${baseUrl}/pizza`, { params: params });
    return data;
  },
);

const initialState: PizzaSliceState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state: PizzaSliceState, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = 'completed';
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = [];
      state.status = 'error';
    });
  },
});

export function selectPizzas(state: RootState): PizzaSliceState {
  return state.pizza;
}

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
