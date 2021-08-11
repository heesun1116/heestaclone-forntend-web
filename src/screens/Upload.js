import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";

import Uploadform from "../components/Uploadform";

const Upload = ({ open, close }) => {
  const [caption, setCaption] = useState("");
  const { register, getValues } = useForm({
    mode: "onChange",
  });

  return (
    <>
      {open ? (
        <Background>
          <Container>
            <Close onClick={close}>❌</Close>
            <h1>Upload Photo</h1>
            <Formdiv>
              <form>
                <CaptionInput
                  onChange={() => {
                    const { caption } = getValues();
                    setCaption(caption);
                  }}
                  type="text"
                  name="caption"
                  ref={register}
                  placeholder="Photo Comment"
                />
              </form>
              <Uploadform caption={caption} />
            </Formdiv>
          </Container>
        </Background>
      ) : null}
    </>
  );
};

const Close = styled.p`
  cursor: pointer;
  top: 5%;
  right: 5%;
  position: absolute;
`;

const Formdiv = styled.div`
  width: 421px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
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
  height: 478px;
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
    margin-top: 72px;
    margin-bottom: 31px;
  }
  button {
    cursor: pointer;
    width: 214px;
    height: 65px;
    border-radius: 15px;
    border: none;
    color: white;
    font-family: NotoSans;
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
  }
  input {
    width: 421px;
    margin-bottom: 22px;
  }
  input[type="file"]::file-selector-button {
    width: 162px;
    height: 65px;
    border-radius: 15px;
    border: none;
    background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
    color: white;
    font-family: NotoSans;
    font-size: 28px;
    font-weight: bold;
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    h1 {
      font-size: 20px;
    }
    input {
      width: 92%;
      height: 53.7px;
    }
    button {
      width: 50%;
      height: 45.1px;
      font-size: 20px;
      margin-left: 50%;
    }
  }
`;
const CaptionInput = styled.input`
  background-color: beige;
  width: 398px;
  height: 65px;
  background: linear-gradient(#fff, #fff) padding-box,
    /*this is your grey background*/
      linear-gradient(189.17deg, #bfe9ff 6.24%, #ff6e7f 92.4%) border-box;
  border: 2px solid transparent;
  border-radius: 15px;
  display: inline-block;
  padding-left: 23px;
  &::placeholder {
    font-family: NotoSans;
    font-size: 20px;
    font-weight: bold;
    color: #b0b0b0;
  }
`;
export default Upload;
