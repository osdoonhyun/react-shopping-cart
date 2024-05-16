import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCartProduct } from '@/apis/Cart/postCartProduct';
import useCartStore from '@/store/cartStore';
import { CART_QUERY_KEYS } from '@/constants/queryKey';

export const usePostCartProductMutation = () => {
  const queryClient = useQueryClient();
  const { addToCart } = useCartStore.use.actions();

  const postCartProductMutation = useMutation({
    mutationFn: postCartProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.LISTS() });

      addToCart(data);
    },
  });

  return postCartProductMutation;
};
