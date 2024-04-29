import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Protected from './pages/Protected';
import Paths from './constants/Paths';
import ChatRoomSidebar from './features/chatRooms/components/ChatRoomSidebar';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Base}>
      <Route path="/" element={<Navigate to="/home/chats" />} />
      <Route path={Paths.Auth.SIGN_IN} element={<SignIn />} index />
      <Route
        path={Paths.Home.BASE}
        element={
          <Protected>
            <Home />
          </Protected>
        }
      >
        <Route index element={<Navigate to="/home/chats" />} />
        <Route
          path={Paths.Home.BASE + Paths.Home.CHATS}
          element={<ChatRoomSidebar />}
        />
        <Route
          path={Paths.Home.BASE + Paths.Home.CONTACTS}
          element={
            <p className="text-2xl font-bold text-neutral-800">Contacts</p>
          }
        />
      </Route>
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
