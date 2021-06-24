import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
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

const SeeUser = () => {
  const { data, loading } = useQuery(SEE_USERS_MUTATION);

  return (
    <>
      {data?.seeUsers?.map((user) => (
        <User key={user.id} {...user}></User>
      ))}
    </>
  );
};

const User = ({ userName, avatar }) => {
  return (
    <>
      {" "}
      <div>{userName}</div>
      <Link to={`/users/${userName}`}>
        <Avatar url={avatar} />
      </Link>
    </>
  );
};

export default SeeUser;
