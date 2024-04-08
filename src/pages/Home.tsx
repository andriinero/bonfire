import Main from '@/layout/Main';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  return (
    // TODO: gird layout
    <div className="grid min-h-dvh grid-cols-[12rem,1fr]">
      <Sidebar></Sidebar>
      <Main></Main>
    </div>
  );
};

export default Home;
