import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";

import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register } = useForm();
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>
            Sign up to see photos and videos from your friends.
          </SubTitle>
        </HeaderContainer>
        <form>
          <Input
            ref={register({
              required: "First Name is required.",
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <Input
            ref={register({
              required: "Email is required.",
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
          <Input
            ref={register({
              required: "User Name is required.",
            })}
            name="password"
            type="text"
            placeholder="Username"
          />
          <Input
            ref={register({
              required: "password is required.",
            })}
            type="password"
            placeholder="password"
          />
          <Button type="submit" value="Sing UP" />
        </form>
      </FormBox>

      <BottomBox
        cta={"Have an account?"}
        link={routes.home}
        linkText="Log In"
      />
    </AuthLayout>
  );
};
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
export default SignUp;
