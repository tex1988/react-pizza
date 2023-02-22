import { SortItem } from '../../../components/Sort';

export interface FilterSliceState {
  categoryId: number;
  currentSortItem: SortItem;
  currentPage: number;
  searchValue: string;
}