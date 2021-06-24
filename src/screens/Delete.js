import { gql, useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";

const DELETE_PHOTO_MUATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
      error
    }
  }
`;
const Delete = ({ open, close, id }) => {
  function onDeleteClick() {
    deletePhotoMutation();
    window.location.reload();
  }

  const [deletePhotoMutation] = useMutation(DELETE_PHOTO_MUATION, {
    variables: {
      id,
    },
  });
  return (
    <>
      {open ? (
        <Background>
          <Container>
            <Close onClick={close}>❌</Close>
            <h1>Do you really want to delete this photo?</h1>
            <ButtonDiv>
              <button onClick={onDeleteClick}>Yes</button>
              <span onClick={close}>No</span>
            </ButtonDiv>
          </Container>
        </Background>
      ) : null}
    </>
  );
};

const Close = styled.p`
  cursor: pointer;
  top: 7%;
  right: 3%;
  position: absolute;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.28);
`;
const Container = styled.div`
  border-radius: 30px;
  background-color: #ffffff;
  width: 706px;
  height: 269px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  h1 {
    font-family: Oswald;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 58px;
    margin-bottom: 35px;
    color: black;
  }
  button {
    cursor: pointer;
    width: 157px;
    height: 65px;
    border-radius: 15px;
    border: none;
    color: white;
    font-family: NotoSans;
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
  }
  span {
    font-family: NotoSans;
    font-size: 40px;
    font-weight: bold;
    color: #2b90d9;
    text-decoration: underline;
    margin-left: 52px;
    cursor: pointer;
  }
`;

export default Delete;
