import { getCartProducts } from '@/apis/Cart/getCartProducts';
import { useQuery } from '@tanstack/react-query';

export const useGetCartProductsQuery = () => {
  const { data: cartProducts } = useQuery({
    queryKey: ['carts', 'lists'],
    queryFn: getCartProducts,
  });

  return { cartProducts };
};
