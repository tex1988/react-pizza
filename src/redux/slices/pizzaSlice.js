import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://63e377a3619fce55d4198d8f.mockapi.io';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
  const { data } = await axios.get(`${baseUrl}/pizza`, { params: params });
  return data;
});

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'filter',
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

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
