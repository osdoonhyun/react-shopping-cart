import { createFileRoute } from '@tanstack/react-router';
import ProductList from '@/pages/Product';

export const Route = createFileRoute('/list')({
  component: () => <ProductList />,
});
