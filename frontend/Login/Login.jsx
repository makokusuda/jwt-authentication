import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import service from "@/service/service";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
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
    }
  };

  return (
    <div>
      Login Page
      <input type="text" onChange={(e) => setUserName(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Submit</button>
      <Route>{isLoggedIn && <Redirect to="/" />}</Route>
    </div>
  );
};

export default Login;
