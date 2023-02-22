import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, PizzaQueryParams, PizzaSliceState, Status } from './types';

export const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

export const fetchPizzas = createAsyncThunk<Pizza[], PizzaQueryParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { data } = await axios.get<Pizza[]>(`${baseUrl}/pizza`, { params: params });
    return data;
  },
);

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
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
      state.status = Status.COMPLETED;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
