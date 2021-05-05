import React from "react";
import { useParams } from "react-router";

function Profile(props) {
  const { userName } = useParams();
  console.log(userName);
  return <div>Profile</div>;
}

export default Profile;
