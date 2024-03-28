import { createFileRoute } from '@tanstack/react-router';
import List from '@/pages/Order/List';

export const Route = createFileRoute('/orderList')({
  component: () => <List />,
});
