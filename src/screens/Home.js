import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        userName
        avatar
      }
      file
      comments {
        id
      }
      caption
      likes
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 10px;
`;
const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  const histroy = useHistory();
  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.userName}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
      <button onClick={() => logUserOut(histroy)}>Logout in Now</button>
    </div>
  );
};

export default Home;
