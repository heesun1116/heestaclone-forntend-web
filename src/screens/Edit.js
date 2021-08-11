import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { EditInput } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import Polygon from "./Polygon.svg";
const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      id
      firstName
      lastName
      userName
      bio
      email
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;
const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      error
      id
    }
  }
`;
const Edit = () => {
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState("");
  const { userName } = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });
  console.log(file);
  const { register, clearErrors, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: data?.seeProfile?.userName,
      firstName: data?.seeProfile?.firstName,
      lastName: data?.seeProfile?.lastName,
      email: data?.seeProfile?.email,
    },
  });
  const clearSingUpError = () => {
    clearErrors("result");
  };
  const onSubmitValid = (data) => {
    console.log(data);
    if (loading) {
      return;
    }

    editProfile({
      variables: {
        ...data,
        avatar: file,
      },
    });
  };
  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted: (data) => {
      alert("success");
    },
  });
  const submit = (e) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;

    if (validity.valid) {
      setFile(file);
    }
  };
  const OnChange = (e) => {
    e.preventDefault();
    setFilename(e.target.files[0].name);
  };
  return (
    <>
      {!loading ? (
        <Container>
          <UserProfile>
            <ProImg src={data?.seeProfile.avatar} alt="avatar" />
            <PolygonImg src={Polygon} />
          </UserProfile>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <UserDiv>
              <NameDiv>
                <h1>
                  {data?.seeProfile?.userName} {data?.seeProfile?.firstName}{" "}
                  {data?.seeProfile?.lastName}
                </h1>
                <Follow>
                  <Num>{data?.seeProfile?.totalFollowers}</Num> Followers
                </Follow>
                <Follow>
                  <Num>{data?.seeProfile?.totalFollowing}</Num> Following
                </Follow>
              </NameDiv>
            </UserDiv>
            <Input
              defaultValue={data?.seeProfile?.userName}
              Value={data?.seeProfile?.userName}
              onChange={clearSingUpError}
              ref={register}
              name="userName"
              type="text"
              placeholder="Username"
              disabled
            />
            <Input
              onChange={clearSingUpError}
              ref={register}
              name="password"
              type="password"
              placeholder="password"
            />
            <Input
              defaultValue={data?.seeProfile?.bio}
              onChange={clearSingUpError}
              ref={register}
              name="bio"
              type="bio"
              placeholder="bio"
            />
            <Inputdiv>
              <EditInputLeft
                defaultValue={data?.seeProfile?.firstName}
                ref={register}
                onChange={clearSingUpError}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <EditInputRight
                defaultValue={data?.seeProfile?.lastName}
                ref={register}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </Inputdiv>
            <Input
              defaultValue={data?.seeProfile?.email}
              onChange={clearSingUpError}
              ref={register}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Avatarform onChange={submit}>
              <FileBox>
                <FileLabel onChange={submit} htmlFor="fileUpload">
                  Upload Avatar
                </FileLabel>
                <FileName value={filename} disabled="disabled" />
                <FileInput
                  onChange={OnChange}
                  id="fileUpload"
                  type="file"
                  name="file"
                  required
                  accept="image/png, image/jpeg, image/jpg image/svg"
                  placeholder="Filename"
                />
              </FileBox>
            </Avatarform>
            <Button
              type="submit"
              value={loading ? "Loading..." : "Edit profile"}
            />
          </Form>
        </Container>
      ) : null}
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 81px;
  @media screen and (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
const Avatarform = styled.form`
  @media screen and (max-width: 375px) {
    width: 93%;
    display: flex;
    justify-content: center;
  }
`;
const FileLabel = styled.label`
  margin-right: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: NotoSans;
  font-size: 15px;
  font-weight: bold;
  background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
  cursor: pointer;
  border-radius: 15px;
  width: 150px;
  height: 40px;
  @media screen and (max-width: 375px) {
    width: 40%;
  }
`;
const FileName = styled(EditInput)`
  width: 256px;
  height: 65px;
  border-radius: 0 15px 15px 0;
  &::placeholder {
    font-family: NotoSans;
    font-size: 20px;
    font-weight: bold;
    color: #b0b0b0;
  }
  @media screen and (max-width: 500px) {
    width: 158px;
    height: 53.7px;
  }
  @media screen and (max-width: 375px) {
    width: 40%;
  }
`;
const FileBox = styled.div`
  display: flex;
  width: 448px;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 348px;
  }
  @media screen and (max-width: 375px) {
    width: 93%;
    display: flex;
    justify-content: center;
  }
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 490px;
  @media screen and (max-width: 500px) {
    width: 380px;
  }
`;
const Input = styled(EditInput)`
  width: 421px;
  height: 65px;

  &::placeholder {
    font-size: 20px;
    font-weight: bold;
    color: #b0b0b0;
    font-family: NotoSans;
  }
  @media screen and (max-width: 500px) {
    width: 348px;
    height: 53.7px;
  }
  @media screen and (max-width: 375px) {
    width: 75%;
  }
`;

const Button = styled.input`
  background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
  color: white;
  text-align: center;
  border: none;
  font-family: NotoSans;
  font-size: 20px;
  font-weight: bold;
  width: 216px;
  height: 50px;
  margin-left: 670px;
  border-radius: 15px;
  margin-top: 7px;
  @media screen and (max-width: 500px) {
    margin-left: 0;
  }
  /* opacity: ${(props) => (props.disabled ? "0.3" : "1")}; */
`;
const Inputdiv = styled.div`
  @media screen and (max-width: 375px) {
    width: 93%;
    display: flex;
    justify-content: center;
  }
`;
const EditInputRight = styled(EditInput)`
  width: 190px;
  height: 65px;
  border-radius: 0px 15px 15px 0px;
  margin-left: 5px;
  @media screen and (max-width: 500px) {
    width: 158px;
    height: 53.7px;
  }
  @media screen and (max-width: 375px) {
    width: 35%;
  }
`;
const EditInputLeft = styled(EditInput)`
  width: 190px;
  height: 65px;
  border-radius: 15px 0 0 15px;
  margin-right: 5px;
  @media screen and (max-width: 500px) {
    width: 158px;
    height: 53.7px;
  }
  @media screen and (max-width: 375px) {
    width: 35%;
  }
`;
const UserProfile = styled.div`
  width: 199px;
  height: 205px;
  position: relative;
  margin-right: 20px;
  @media screen and (max-width: 500px) {
    width: 100px;
    height: 80px;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;
const Num = styled.strong`
  font-size: 26.86px;
  font-weight: 26.86;
  font-family: Noto Sans;
  color: black;
`;
const UserDiv = styled.div`
  display: felx;
  width: 435px;
  margin-bottom: 43.47px;
  h1 {
    font-family: Oswald;
    font-size: 37.5px;
    margin-bottom: 21px;
  }
  @media screen and (max-width: 500px) {
    width: 219px;
    h1 {
      font-size: 20px;
      text-align: center;
    }
  }
`;
const NameDiv = styled.div``;
const PolygonImg = styled.img`
  position: absolute;
  bottom: -20px;
  right: -45px;
  margin: 0;
  z-index: -1;
  @media screen and (max-width: 500px) {
    width: 93px;
    height: 70px;
    top: 0;
    left: 0;
    display: none;
  }
`;
const Follow = styled.span`
  font-family: Noto Sans;
  color: #bdbdbd;
  font-size: 16.12px;
  &:nth-child(3) {
    margin-left: 42.98px;
  }
`;
const ProImg = styled.img`
  width: 181.3px;
  height: 181.13px;
  border-radius: 50%;
  @media screen and (max-width: 500px) {
    width: 100px;
    height: 100px;
    text-align: center;
  }
`;

export default Edit;
