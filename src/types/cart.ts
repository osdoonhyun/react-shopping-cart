import { Product } from './product';

export interface CartProduct {
  id: number;
  product: Product;
  quantity?: number;
}

export interface CartProductWithSelection extends CartProduct {
  selected: boolean;
}
