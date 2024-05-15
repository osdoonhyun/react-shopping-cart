import { createFileRoute } from '@tanstack/react-router';
import ProductDetailPage from '@/pages/Product/ProductDetailPage';

export const Route = createFileRoute('/list/$productId')({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { productId } = Route.useParams();

    return <ProductDetailPage id={Number(productId)} />;
  },
});
