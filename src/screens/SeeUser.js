import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";

const SEE_USERS_MUTATION = gql`
  query seeUsers {
    seeUsers {
      userName
      avatar
      id
    }
  }
`;

const SeeUser = ({ open, close }) => {
  const { data } = useQuery(SEE_USERS_MUTATION);

  return (
    <>
      {data?.seeUsers?.map((user) => (
        <User key={user.id} {...user} open={open} close={close}></User>
      ))}
    </>
  );
};

const User = ({ userName, avatar, open, close }) => {
  return (
    <>
      {open ? (
        <Container>
          <Link to={`/users/${userName}`}>
            <Avatar url={avatar} />
          </Link>
        </Container>
      ) : null}
    </>
  );
};
const Container = styled.div``;
export default SeeUser;
