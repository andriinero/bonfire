import Main from '@/layout/Main';
import Sidebar from '@/layout/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="grid min-h-dvh grid-cols-[auto,1fr]">
      <Sidebar></Sidebar>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default Home;
