import { createFileRoute } from '@tanstack/react-router';
import ProductDetailPage from '@/pages/Product/ProductDetailPage';

export const Route = createFileRoute('/list/$productId')({
  component: () => {
    const { productId } = Route.useParams();
    return <ProductDetailPage id={productId} />;
  },
});
