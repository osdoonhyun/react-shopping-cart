import { getCartProducts } from '@components/apis/Cart/getCartProducts';
import { useQuery } from '@tanstack/react-query';

export const useGetCartProductsQuery = () => {
  const { data: cartProducts } = useQuery({
    queryKey: ['cartProduct'],
    queryFn: getCartProducts,
  });

  return { cartProducts };
};
