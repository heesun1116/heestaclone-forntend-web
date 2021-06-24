import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeVar } from "../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 646px;
`;
const Background = styled.div`
  background: radial-gradient(100% 100% at 54.72% 0%, #ff6e7f 0%, #bfe9ff 100%),
    #c4c4c4;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`;
function AuthLayout({ children }) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Background></Background>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default AuthLayout;
