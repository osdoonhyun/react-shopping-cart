import axios from 'axios';

interface PageParam {
  limit: number;
  offset: number;
}

export const fetchProducts = async ({ offset, limit }: PageParam) => {
  const response = await axios.get('/products', {
    params: { offset, limit },
  });
  const products = response.data;

  return products;
};
