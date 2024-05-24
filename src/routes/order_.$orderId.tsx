import { createFileRoute } from '@tanstack/react-router';
import OrderResultPage from '@/pages/Order/OrderResultPage';

export const Route = createFileRoute('/order/$orderId')({
  component: () => {
    const { orderId } = Route.useParams();

    return <OrderResultPage id={Number(orderId)} />;
  },
});
