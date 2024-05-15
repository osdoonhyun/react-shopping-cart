import axios from 'axios';
import { Product } from '@/types/product';

export const getProductDetail = async (id: Product['id']) => {
  const response = await axios.get(`/products/${id}`);

  return response.data;
};
