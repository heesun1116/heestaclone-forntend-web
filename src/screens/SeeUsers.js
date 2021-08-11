import React from "react";
import styled from "styled-components";
import SeeUser from "./SeeUser";

const SeeUsers = ({ open, close }) => {
  return (
    <>
      {open ? (
        <Container>
          <div>
            <h1>Find More Friends!</h1>
            <Close onClick={close}>❌</Close>
          </div>
          <Section>
            <SeeUser open={open} close={close} />
          </Section>
        </Container>
      ) : null}
    </>
  );
};

const Section = styled.div`
  display: flex;
  gap: 31px;
  margin-top: 23px;
  margin-left: 35.4px;
  @media screen and (max-width: 500px) {
    margin-top: 13px;
    margin-left: 10px;
    gap: 10px;
  }
`;
const Container = styled.div`
  overflow: hidden;
  flex-direction: row;
  width: 871px;
  height: 161px;
  position: absolute;
  top: 52px;
  left: 20%;
  z-index: 3;
  background: linear-gradient(#fff, #fff) padding-box,
    /*this is your grey background*/
      linear-gradient(189.17deg, #bfe9ff 6.24%, #ff6e7f 92.4%) border-box;
  border: 4px solid transparent;
  border-radius: 40px;
  background-color: #fff;
  h1 {
    font-family: Oswald;
    font-size: 21.8px;
    margin-top: 19px;
    margin-left: 35px;
  }
  @media screen and (max-width: 1024px) {
    width: 60%;
  }
  @media screen and (max-width: 500px) {
    height: 100px;
    border-radius: 20px;
    h1 {
      font-size: 12px;
      margin-top: 10px;
      margin-left: 15px;
    }
  }
`;
const Close = styled.p`
  margin-left: 830px;
  margin-top: -21.8px;
  @media screen and (max-width: 1024px) {
    margin-left: 93%;
  }
  @media screen and (max-width: 500px) {
    margin-left: 88%;
    margin-top: -13px;
  }
`;
export default SeeUsers;
