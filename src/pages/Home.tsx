import Main from '@/layout/Main';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  return (
    <div className="grid min-h-dvh grid-cols-[minmax(auto,27rem),1fr]">
      <Sidebar />
      <Main></Main>
    </div>
  );
};

export default Home;
