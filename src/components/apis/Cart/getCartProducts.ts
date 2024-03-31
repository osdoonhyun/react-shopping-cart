import axios from 'axios';

export const getCartProducts = async () => {
  const response = await axios.get('/carts');

  return response.data;
};
