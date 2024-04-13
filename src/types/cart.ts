import { Product } from './product';

export interface CartProduct {
  id: number;
  product: Product;
  quantity?: number;
}
