import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import About from "@/frontend/common/About";
import Edit from "@/frontend/edit";
import Home from "@/frontend/Home";
import Login from "@/frontend/Login";
import Menu from "@/frontend/common/Menu";
import MyPage from "@/frontend/MyPage";
import Post from "@/frontend/post";
import "@/frontend/style.css";

const App = () => {
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState(userId ? true : false);
  const [mode, setMode] = useState("home"); // home, about, login, myPage, post

  return (
    <>
      <Router>
        <Menu
          isLoggedIn={isLoggedIn}
          mode={mode}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Switch>
          <Route
            path="/about"
            render={(props) => <About {...props} setMode={setMode} />}
          />
          <Route
            path="/edit/:id"
            render={(props) => (
              <Edit
                {...props}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setMode={setMode}
              />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                isLoggedIn={isLoggedIn}
                setMode={setMode}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            path="/my-page"
            render={(props) => (
              <MyPage
                {...props}
                isLoggedIn={isLoggedIn}
                setMode={setMode}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            path="/post"
            render={(props) => (
              <Post
                {...props}
                isLoggedIn={isLoggedIn}
                setMode={setMode}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => <Home {...props} setMode={setMode} />}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
