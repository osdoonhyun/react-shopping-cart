import { useQuery } from '@tanstack/react-query';
import { getCartProducts } from '@/apis/Cart/getCartProducts';
import { CART_QUERY_KEYS } from '@/constants/queryKey';

export const useGetCartProductsQuery = () => {
  const { data: cartProducts } = useQuery({
    queryKey: CART_QUERY_KEYS.LISTS(),
    queryFn: getCartProducts,
  });

  return { cartProducts };
};
