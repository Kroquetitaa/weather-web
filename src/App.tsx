import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/route';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@helpers/queryClient';

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  )
}
