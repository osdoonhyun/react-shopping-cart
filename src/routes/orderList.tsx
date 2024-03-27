import { createFileRoute } from '@tanstack/react-router';
import List from '@components/pages/Order/List';

export const Route = createFileRoute('/orderList')({
  component: () => <List />,
});
