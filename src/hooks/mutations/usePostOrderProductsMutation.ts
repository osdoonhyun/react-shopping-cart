import { postOrderProducts } from '@/apis/Order/postOrderProducts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });

  return postOrderProductsMutation;
};
