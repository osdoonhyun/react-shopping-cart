import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCartProduct } from '@components/apis/Cart/postCartProduct';
import useCartStore from '@components/store/cartStore';

export const usePostCartProductMutation = () => {
  const queryClient = useQueryClient();
  const addToCart = useCartStore.use.addToCart();

  const postCartProductMutation = useMutation({
    mutationFn: postCartProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cartProductList'] });

      addToCart(data);
    },
  });

  return postCartProductMutation;
};
