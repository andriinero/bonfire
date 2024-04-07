import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Protected from './pages/Protected';
import Paths from './constants/Paths';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={Paths.Base}>
        <Route path={Paths.Auth.SIGN_IN} element={<SignIn />} index />
        <Route
          path={Paths.Main.HOME}
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
