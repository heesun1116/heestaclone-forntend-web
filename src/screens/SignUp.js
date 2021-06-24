import React from "react";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Logo from "../components/Logo.svg";

import {
  AuthTitle,
  AuthH3,
  LinkSpan,
  InputSepLeft,
  InputSepRight,
} from "../components/shared";

import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data) => {
    const { userName, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
    history.push(routes.home, {
      message: "Account created. please log in",
      userName,
      password,
    }); // if sign up succes, go to home
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    clearErrors,
    setError,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
    });
  };
  //reset error
  const clearSingUpError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <div>
            <img src={Logo} alt="logo" />
            <SignSpan>Create Account</SignSpan>
          </div>
          <LoginDiv>
            <LoginH3>Already have an account?</LoginH3>
            <Link to={routes.home}>
              <LoginSpan>Login</LoginSpan>
            </Link>
          </LoginDiv>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            onChange={clearSingUpError}
            ref={register({
              required: "User Name is required.",
            })}
            name="userName"
            type="text"
            placeholder="Username"
          />
          <FormError message={errors?.username?.message} />
          <NameDiv>
            <InputSepLeft
              ref={register({
                required: "First Name is required.",
              })}
              onChange={clearSingUpError}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <FormError message={errors?.firstName?.message} />
            <InputSepRight
              ref={register}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </NameDiv>
          <Input
            onChange={clearSingUpError}
            ref={register({
              required: "Email is required.",
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
          <FormError message={errors?.email?.message} />

          <Input
            onChange={clearSingUpError}
            ref={register({
              required: "password is required.",
            })}
            name="password"
            type="password"
            placeholder="password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default SignUp;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignSpan = styled(AuthTitle)``;

const LoginDiv = styled.div`
  margin-top: 25px;
  display: flex;
  width: 280px;
  height: 27px;
  align-items: center;
`;
const LoginSpan = styled(LinkSpan)``;

const LoginH3 = styled(AuthH3)``;
const NameDiv = styled.div`
  display: flex;
`;
