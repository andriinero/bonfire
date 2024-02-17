import { Outlet } from 'react-router';

import { ThemeProvider } from 'styled-components';
import MainTheme from '@/MainTheme';
import { GlobalStyle, MainWrapper, AppWrapper } from './App.styled';
import Aside from '@/layout/Aside';

const App = () => {
  return (
    <ThemeProvider theme={MainTheme}>
      <GlobalStyle />
      <AppWrapper>
        <Aside />
        <MainWrapper>
          <Outlet />
          <h2>Main</h2>
        </MainWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
