import { styled, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    color: ${({ theme }) => theme.colors.txt_main};
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
`;

export const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 400px) 1fr;
  grid-template-rows: 1fr;

  min-height: 100dvh;
`;

export const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.bg_chat_main};
`;
