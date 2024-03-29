import axios from 'axios';
import { CartProduct } from '@components/types/product';

export const postCartProduct = async (
  product: Pick<CartProduct, 'product'>
) => {
  const response = await axios.post('/carts', product);

  return response.data;
};
