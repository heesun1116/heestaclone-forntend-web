import React from "react";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";

const Home = () => {
  const histroy = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(histroy)}>Logout in Now</button>
    </div>
  );
};

export default Home;
