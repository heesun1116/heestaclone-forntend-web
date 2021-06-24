import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  background-color: red;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
