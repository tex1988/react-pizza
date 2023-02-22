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

export enum Status {
  LOADING = 'loading',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export interface PizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}