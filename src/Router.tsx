import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/sign-in',
      element: <SignIn />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
