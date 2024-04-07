import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Protected from './pages/Protected';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/sign-in" element={<SignIn />} index />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
