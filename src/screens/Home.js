import React from "react";
import { logUserOut } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>Welcome to we dit it!</h1>
      <button onClick={() => logUserOut()}>Logout in Now</button>
    </div>
  );
};

export default Home;
