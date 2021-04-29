import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";

import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
const Login = () => {
  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Login" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookF} />
          <span> Log IN wtih FaceBook</span>
        </FacebookLogin>
      </FormBox>

      <BottomBox
        cta={"Don't have an account?"}
        link={routes.signUp}
        linkText="Sign UP"
      />
    </AuthLayout>
  );
};
export default Login;

const FacebookLogin = styled.div`
  color: #40588a;
  span {
    margin-top: 10px;
    font-weight: 500;
  }
`;
