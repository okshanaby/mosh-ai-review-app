import ChatBot from './components/ChatBot';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductList from './components/review/ProductList';

const router = createBrowserRouter([
  {
    path: '/chat',
    element: <ChatBot />,
  },
  {
    path: '/products',
    element: <ProductList />,
  },
  {
    path: '*',
    element: <h1>Hello there</h1>,
  },
]);

function App() {
  return (
    <div className="min-h-dvh p-6 max-w-225 mx-auto flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
