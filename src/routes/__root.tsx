import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/layout/Header';
import AlertDialogContainer from '@components/common/AlertDialogContainer';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <AlertDialogContainer />
    </>
  ),
});
