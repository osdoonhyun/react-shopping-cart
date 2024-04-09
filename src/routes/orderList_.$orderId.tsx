import Detail from '@/pages/Order/Detail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/orderList/$orderId')({
  component: () => {
    const { orderId } = Route.useParams();

    return <Detail id={Number(orderId)} />;
  },
});
