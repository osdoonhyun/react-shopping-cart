import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@components/@common/Header';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});
