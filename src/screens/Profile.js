import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Button from "../components/auth/Button";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser, { ME_QUERY } from "../hooks/useUser";
import Delete from "./Delete";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
    }
  }
`;
const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
    }
  }
`;
const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      id
      firstName
      lastName
      userName
      bio
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

function Profile() {
  const { userName } = useParams();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });

  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${userName}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.userName}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    //update cache
    update: unfollowUserUpdate,
    //refatch the data
    // refetchQueries: [
    //   { query: SEE_PROFILE_QUERY, variables: { userName } },
    //   { query: ME_QUERY },
    // ],
  });
  const followUserCompleted = (data) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${userName}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.userName}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    //give the only data, not cache
    onCompleted: followUserCompleted,
    // refetchQueries: [
    //   { query: SEE_PROFILE_QUERY, variables: { userName } },
    //   { query: ME_QUERY },
    // ],
  });
  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return (
        <Link to={`/editprofile/${data?.seeProfile?.userName}`}>
          <ProfileBtn>Edit Profile</ProfileBtn>
        </Link>
      );
    }
    if (isFollowing) {
      return <ProfileBtn onClick={unfollowUser}>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={followUser}>follow</ProfileBtn>;
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.userName}'s Profile`
        }
      />
      <Container>
        <Header>
          <Avatar url={data?.seeProfile?.avatar} profile />
          <Username>
            {data?.seeProfile?.userName} {data?.seeProfile?.firstName}
            {"  "}
            {data?.seeProfile?.lastName}
          </Username>
          <ValueDiv>
            <Value>{data?.seeProfile?.totalFollowers}</Value> followers
            <Value>{data?.seeProfile?.totalFollowing}</Value> following
          </ValueDiv>
          {data?.seeProfile ? getButton(data.seeProfile) : null}

          <Row>{data?.seeProfile?.bio}</Row>
        </Header>
        <Grid>
          {data?.seeProfile?.photos.map((photo) => (
            <Photo key={photo.id} bg={photo.file}>
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {photo.likes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {photo.commentNumber}
                </Icon>
                <Icon>
                  {data?.seeProfile?.isMe ? (
                    <FontAwesomeIcon onClick={openModal} icon={faTrash} />
                  ) : null}
                  {/* <DeleteButton
                    userName={userName}
                    id={photo.id}
                    isMe={data?.seeProfile?.isMe}
                    open={openModal}
                  /> */}
                  <Delete
                    open={modalOpen}
                    userName={userName}
                    close={closeModal}
                    id={photo.id}
                  />
                </Icon>
              </Icons>
            </Photo>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;

const Container = styled.div`
  display: felx;
  width: 1357px;
  margin: 63px auto 0 auto;
  gap: 80px;
`;
const Header = styled.div`
  display: flex;
  width: 289px;
  align-items: center;
  flex-direction: column;
`;
const Username = styled.h3`
  margin-top: 17px;
  font-family: Oswald;
  font-size: 25px;
`;

const Row = styled.div`
  width: 216px;
  text-align: center;
  margin-top: 32px;
  font-family: NotoSans;
  font-size: 14px;
`;

const Value = styled.span`
  font-family: NotoSans;
  font-size: 20px;
  &:nth-child(2) {
    margin-left: 30px;
  }
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 14px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
  border-radius: 20px;
  width: 320px;
  height: 320px;
`;
const ValueDiv = styled.div`
  margin-top: 19px;
  font-family: NotoSans;
  font-size: 20px;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled.button`
  background: linear-gradient(90.27deg, #ff6e7f 0.23%, #bfe9ff 99.77%);
  border-radius: 15px;
  border: none;
  color: white;
  font-family: NotoSans;
  font-size: 20px;
  font-weight: bold;
  width: 289px;
  height: 50px;
  margin-top: 21px;

  padding: 10px 50px;
  cursor: pointer;
`;
