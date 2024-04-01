import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCartProduct } from '@/apis/Cart/postCartProduct';
import useCartStore from '@/store/cartStore';

export const usePostCartProductMutation = () => {
  const queryClient = useQueryClient();
  const addToCart = useCartStore.use.addToCart();

  const postCartProductMutation = useMutation({
    mutationFn: postCartProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cartProducts'] });

      addToCart(data);
    },
  });

  return postCartProductMutation;
};
