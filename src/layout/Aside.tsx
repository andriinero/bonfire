import { Logo, LogoSection, LogoWrapper, WrapperAside } from './Aside.styled';
import ChatList from '../features/chatlist/components/ChatList';

const Aside = () => {
  return (
    <WrapperAside>
      <LogoSection>
        <LogoWrapper>
          <Logo>Logo</Logo> 
        </LogoWrapper>
      </LogoSection>
      <ChatList />
    </WrapperAside>
  );
};

export default Aside;
