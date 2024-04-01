import axios from 'axios';

type IdType = {
  id: string;
};

export const getProductDetail = async ({ id }: IdType) => {
  const response = await axios.get(`/products/${id}`);

  return response.data;
};
