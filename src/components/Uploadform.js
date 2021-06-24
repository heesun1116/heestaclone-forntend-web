import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
      likes
    }
  }
`;
const Uploadform = ({ caption }) => {
  const [filename, setFilename] = useState("");
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO, {
    onCompleted: (data) => {},
  });
  const submit = (e) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;

    if (validity.valid) uploadPhoto({ variables: { file, caption } });
  };
  const OnChange = (e) => {
    e.preventDefault();
    setFilename(e.target.files[0].name);
  };
  return (
    <form onChange={submit}>
      <FileBox>
        <FileLabel onChange={submit} htmlFor="fileUpload">
          File
        </FileLabel>
        <FileName value={filename} disabled="disabled" />
        <FileInput
          onChange={OnChange}
          id="fileUpload"
          type="file"
          name="file"
          required
          accept="image/png, image/jpeg, image/jpg"
          placeholder="Filename"
        />
      </FileBox>
      <button type="submit">Submit</button>
    </form>
  );
};
const FileLabel = styled.label`
  margin-right: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: NotoSans;
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
  cursor: pointer;
  border-radius: 15px;
  width: 162px;
  height: 65px;
`;
const FileName = styled.input`
  width: 200px;
  height: 65px;
  background: linear-gradient(#fff, #fff) padding-box,
    /*this is your grey background*/
      linear-gradient(189.17deg, #bfe9ff 6.24%, #ff6e7f 92.4%) border-box;
  border: 2px solid transparent;
  border-radius: 15px;
  display: inline-block;
  border-radius: 15px;
  padding-left: 23px;
  &::placeholder {
    font-family: NotoSans;
    font-size: 20px;
    font-weight: bold;
    color: #b0b0b0;
  }
`;
const FileBox = styled.div`
  display: flex;
  width: 448px;
`;
const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
const Button = styled.button`
  margin-left: 400px;
  cursor: pointer;
`;
export default Uploadform;
