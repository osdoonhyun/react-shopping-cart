import { createFileRoute } from '@tanstack/react-router';
import Detail from '@components/pages/Product/Detail';

export const Route = createFileRoute('/list/$productId')({
  component: () => {
    const { productId } = Route.useParams();
    return <Detail id={productId} />;
  },
});
