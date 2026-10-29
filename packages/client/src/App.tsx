import ChatBot from './components/ChatBot';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductList from './components/review/ProductList';

const router = createBrowserRouter([
  {
    path: '/chat',
    element: <ChatBot />,
  },
  {
    path: '/products/:productId',
    element: <ProductList />,
  },
  {
    path: '*',
    element: <h1>Hello there</h1>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-dvh p-6 max-w-225 mx-auto flex flex-col">
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
