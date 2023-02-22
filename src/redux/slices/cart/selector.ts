import { RootState } from '../../store';
import { CartSliceState } from './types';

export function selectCart(state: RootState): CartSliceState {
  return state.cart;
}