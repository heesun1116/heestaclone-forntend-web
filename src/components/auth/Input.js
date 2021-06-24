import styled from "styled-components";

const Input = styled.input`
  font-family: NotoSans;
  font-size: 23.9px;
  width: 524px;
  border-radius: 15px;
  height: 58px;
  padding: 14px 23px;
  background-color: #f0f0f0;
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 20px;
    font-weight: bold;
    color: #b0b0b0;
    font-family: NotoSans;
  }
  &:focus {
    box-shadow: 0 0 45px 7px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
`;

export default Input;
