import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 28px 60px 36px 60px;
  margin-bottom: 20px;
  border-radius: 20px;
  img {
    width: 40px;
    margin: 0;
    height: 40px;
  }
  form {
    margin-top: 20px;
    width: 524px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  span {
  }
`;

function FormBox({ children }) {
  return <Container>{children}</Container>;
}

export default FormBox;
