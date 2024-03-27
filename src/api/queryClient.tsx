import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export const ReactQueryProvider = (props: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};
