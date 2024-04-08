import { postOrderProducts } from '@/apis/Order/postOrderProducts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostOrderProductsMutation = () => {
  const queryClient = useQueryClient();

  const postOrderProductsMutation = useMutation({
    mutationFn: postOrderProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });

  return postOrderProductsMutation;
};
