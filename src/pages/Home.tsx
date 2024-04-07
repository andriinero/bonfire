import Main from '@/layout/Main';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  return (
    <div className="grid min-h-dvh grid-cols-[auto,1fr]">
      <Sidebar></Sidebar>
      <Main></Main>
    </div>
  );
};

export default Home;
