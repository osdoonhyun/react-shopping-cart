import List from '@components/Order/List';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/orderList')({
  component: () => <List />,
});
