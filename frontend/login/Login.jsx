import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import service from "../../service/service";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMode("login");
  }, []);

  const signIn = async () => {
    if (userName === "" || password === "") {
      setMessage("User name and password are mandatory!");
      return;
    }
    let res;
    try {
      res = await service.signIn(userName, password);
    } catch (err) {
      console.error(err);
    }
    if (res) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setMessage("Invalid user name or password!");
    }
  };

  return (
    <Container>
      <PageTitle>Login</PageTitle>
      <ErrorMessage>{message}</ErrorMessage>
      <div>
        <AreaTitle>User Name</AreaTitle>
        <TextArea type="text" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <AreaTitle>Password</AreaTitle>
        <TextArea
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <SubmitButton onClick={signIn}>Login</SubmitButton>
      <Route>{isLoggedIn && <Redirect to="/" />}</Route>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 0 20px;
  text-align: center;
  width: 300px;
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 20px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: left;
`;

const AreaTitle = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const TextArea = styled.input`
  width: 292px;
  height: 20px;
  resize: none;
`;

const SubmitButton = styled.div`
  color: #ffffff;
  background-color: #111111;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
`;
