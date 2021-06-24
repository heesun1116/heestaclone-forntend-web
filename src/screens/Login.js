import React from "react";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AuthTitle, AuthH3, LinkSpan } from "../components/shared";
import Logo from "../components/Logo.svg";
const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;
const Notification = styled.div`
  color: #2ecc71;
  padding-top: 10px;
`;
const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.userName || "",
      password: location?.state?.password || "",
    },
  });
  //onCompleted : A callback executed once your mutation successfully completes
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
    if (token) {
      logUserIn(token);
      localStorage.setItem("TOKEN", token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { userName: username, password },
    });
  };
  //reset error
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <img src={Logo} alt="logo" />
          <LoginSpan>Login</LoginSpan>
        </div>
        <SignDiv>
          <SignH3>Don't you have an account yet?</SignH3>
          <Link to={routes.signUp}>
            <SingUpSpan>Sign Up</SingUpSpan>
          </Link>
        </SignDiv>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "user name is required",
              minLength: {
                value: 1,
                message: "User name is should be longer",
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "password is required",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Login"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
};
export default Login;

const LoginSpan = styled(AuthTitle)``;
const SignH3 = styled(AuthH3)``;
const SignDiv = styled.div`
  margin-top: 25px;
  display: flex;
  width: 373px;
  height: 27px;
  align-items: center;
`;

const SingUpSpan = styled(LinkSpan)``;
