import styled from 'styled-components';

export const WrapperAside = styled.aside`
  display: grid;
  grid-template-columns: 100px 1fr;
`;

export const LogoSection = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_aside_main};
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.h2``;
