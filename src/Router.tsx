import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/sign-in',
      element: <SignIn />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
