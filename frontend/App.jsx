import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import About from "@/frontend/common/About";
import Edit from "@/frontend/edit/edit";
import Home from "@/frontend/home/Home";
import Login from "@/frontend/login/Login";
import Menu from "@/frontend/common/Menu";
import MyPage from "@/frontend/myPage/MyPage";
import Post from "@/frontend/post/post";

const App = () => {
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState(userId ? true : false);

  return (
    <>
      <Router>
        <Menu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/edit/:id"
            render={(props) => (
              <Edit
                {...props}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                isLoggedIn={isLoggedIn}
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
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
