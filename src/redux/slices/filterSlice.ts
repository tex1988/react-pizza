import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortItem } from '../../components/Sort';

export interface FilterSliceState {
  categoryId: number;
  currentSortItem: SortItem;
  currentPage: number;
  searchValue: string;
}

const initialState = {
  categoryId: 0,
  currentSortItem: { name: 'popularity', sortType: 'rating' },
  currentPage: 1,
  searchValue: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state: FilterSliceState, action: PayloadAction<number>): void {
      state.categoryId = action.payload;
    },
    setSort(state: FilterSliceState, action: PayloadAction<SortItem>): void {
      state.currentSortItem = action.payload;
    },
    setPage(state: FilterSliceState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state: FilterSliceState, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state: FilterSliceState, action: PayloadAction<FilterSliceState>): void {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.searchValue = action.payload.searchValue;
      state.currentSortItem = action.payload.currentSortItem;
    },
  },
});

// @ts-ignore
export function selectFilter(state) {
  return state.filter;
};

export const { setCategoryId, setSort, setPage, setSearchValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
