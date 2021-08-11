import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.div`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
  font-family: NotoSans;
  font-size: 15px;
  font-weight: bold;
`;

export const AuthTitle = styled.span`
  font-family: Oswald;
  font-size: 50px;
  margin-left: 16.3px;
`;
export const AuthH3 = styled.h3`
  font-size: 20px;
  font-family: NotoSans;
  margin-right: 14px;
`;

export const LinkSpan = styled.span`
  color: #2b90d9;
  font-size: 20px;
  font-family: NotoSans;
  font-weight: bold;
  text-decoration: underline;
`;

export const InputSepLeft = styled.input`
  background: #f0f0f0;
  border-radius: 15px 0px 0px 15px;
  width: 261px;
  height: 58px;
  margin-right: 4px;
  padding: 13px 23px;
  box-sizing: border-box;
  font-size: 20px;
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

export const InputSepRight = styled.input`
  background: #f0f0f0;
  border-radius: 0px 15px 15px 0px;
  width: 261px;
  height: 58px;
  padding: 13px 23px;
  box-sizing: border-box;
  font-size: 20px;

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

export const EditInput = styled.input`
  background: linear-gradient(#fff, #fff) padding-box,
    /*this is your grey background*/
      linear-gradient(189.17deg, #bfe9ff 6.24%, #ff6e7f 92.4%) border-box;
  border: 2px solid transparent;
  border-radius: 15px;
  display: inline-block;
  border-radius: 15px;
  padding-left: 23px;
  font-size: 20px;
`;
