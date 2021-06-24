import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Photo from "../components/Feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { logUserOut } from "../apollo";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      comments {
        ...CommentFragment
      }
      caption
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <>
      <HomeDiv>
        <PageTitle title="Home" />
        {data?.seeFeed?.map((photo) => (
          <Photo key={photo.id} {...photo} />
        ))}
      </HomeDiv>
      <Logout onClick={logUserOut}>Log out</Logout>
    </>
  );
};

export default Home;
const HomeDiv = styled.div`
  grid-template-columns: 1fr 1fr;
  gap: 38px 29px;
  width: 947px;
  margin: 81px auto;
  display: grid;
`;
const Logout = styled.button`
  text-decoration: underline;
  font-family: NotoSans;
  background: none;
  color: #2b90d9;
  font-size: 20px;
  font-weight: bold;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 0 35px 38px;
  border: none;
  cursor: pointer;
`;
