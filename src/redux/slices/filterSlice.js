import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { name: 'popularity', sortType: 'rating' },
  currentPage: 1,
  searchValue: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.searchValue = action.payload.searchValue;
      state.sort = action.payload.sort;
    }
  },
});

export const { setCategoryId, setSort, setPage, setSearchValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
