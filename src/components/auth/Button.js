import styled from "styled-components";

const Button = styled.input`
  margin-top: 10px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  border: none;
  font-weight: 600;
  font-size: 12px;
  width: 100%;
`;

export default Button;
