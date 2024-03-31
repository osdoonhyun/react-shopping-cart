export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartProduct {
  id: number;
  product: Product;
}

export interface OrderProduct extends CartProduct {
  quantity: number;
  selected: boolean;
}
