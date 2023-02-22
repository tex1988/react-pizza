import { RootState } from '../../store';
import { FilterSliceState } from './types';

export function selectFilter(state: RootState): FilterSliceState {
  return state.filter;
}