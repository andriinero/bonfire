import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Paths from './constants/Paths';

import ChatRoomSidebar from './features/chatRooms/components/ChatRoomSidebar';
import ContactsSidebar from './features/contacts/components/ContactsSidebar';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import Protected from './pages/Protected';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Base} errorElement={<NotFound404 />}>
      <Route path={Paths.Error.NOT_FOUND} element={<NotFound404 />} />
      <Route
        path={Paths.Base}
        element={<Navigate to={Paths.Home.BASE + Paths.Home.CHATS} />}
      />
      <Route path={Paths.Auth.SIGN_IN} element={<SignIn />} index />
      <Route path={Paths.Auth.SIGN_UP} element={<SignUp />} />
      <Route
        path={Paths.Home.BASE}
        element={
          <Protected>
            <Home />
          </Protected>
        }
      >
        <Route
          index
          element={<Navigate to={Paths.Home.BASE + Paths.Home.CHATS} />}
        />
        <Route
          path={Paths.Home.BASE + Paths.Home.CHATS}
          element={<ChatRoomSidebar />}
        />
        <Route
          path={Paths.Home.BASE + Paths.Home.CONTACTS}
          element={<ContactsSidebar />}
        />
      </Route>
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
