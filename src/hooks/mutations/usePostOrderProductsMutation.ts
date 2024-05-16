import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postOrderProducts } from '@/apis/Order/postOrderProducts';
import { ORDER_QUERY_KEYS } from '@/constants/queryKey';

interface UsePostOrderProductsMutationProps {
  onSuccess: () => void;
}

export const usePostOrderProductsMutation = ({
  onSuccess,
}: UsePostOrderProductsMutationProps) => {
  const queryClient = useQueryClient();

  const postOrderProductsMutation = useMutation({
    mutationFn: postOrderProducts,
    onSuccess: () => {
      onSuccess();

      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.ALL });
    },
  });

  return postOrderProductsMutation;
};
