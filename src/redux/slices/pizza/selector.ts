import { RootState } from '../../store';
import { PizzaSliceState } from './types';

export function selectPizzas(state: RootState): PizzaSliceState {
  return state.pizza;
}