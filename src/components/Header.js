import { useReactiveVar } from "@apollo/client";

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";
import Logo from "./Logo.svg";
import HomeButton from "./HomeButton.svg";
import UploadButton from "./UploadButton.svg";
import Upload from "../screens/Upload";
import Search from "./Search.svg";

import SeeUsers from "../screens/SeeUsers";
const SHeader = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 37.6px 33px 0 33px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    padding: 17px 15px 0 15px;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
  text-decoration: none;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 22px;
  @media screen and (max-width: 500px) {
    margin-left: 10px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  @media screen and (max-width: 500px) {
    height: 45px;
  }
`;

const LogoSpan = styled.span`
  font-family: Oswald;
  font-size: 30px;
  margin-left: 18px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
    margin-left: 5px;
  }
`;
const LogoImg = styled.img`
  @media screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
  }
`;
const Home = styled.img`
  width: 37px;
  height: 37px;
  @media screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
  }
`;
const Header = () => {
  const { userName } = useParams();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [UsersOepn, setUsersOepn] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openUsers = () => {
    setUsersOepn(true);
  };
  const closeUsers = () => {
    setUsersOepn(false);
  };
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <LogoImg src={Logo} alt="logo" />
          </Link>
          <Link to={routes.home}>
            <LogoSpan>Heestgram</LogoSpan>
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Home src={Search} onClick={openUsers} />
                <SeeUsers
                  open={UsersOepn}
                  close={closeUsers}
                  userName={userName}
                />
              </Icon>
              <Icon>
                <Home src={UploadButton} onClick={openModal} />
                <Upload
                  open={modalOpen}
                  close={closeModal}
                  userName={userName}
                />
              </Icon>
              <Icon>
                <Link to={routes.home}>
                  <Home src={HomeButton} />
                </Link>
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.userName}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link href={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
