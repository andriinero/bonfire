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
          path={Paths.Home.BASE}
          element={
            <Protected>
              <Home />
            </Protected>
          }
        >
          <Route
            path={Paths.Home.BASE + Paths.Home.CHATS}
            element={<p>Chats</p>}
          />
          <Route
            path={Paths.Home.BASE + Paths.Home.CONTACTS}
            element={<p>Contacts</p>}
          />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
