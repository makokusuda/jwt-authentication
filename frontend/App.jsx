import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import About from "@/frontend/common/About";
import Home from "@/frontend/home/Home";
import Login from "@/frontend/login/Login";
import Menu from "@/frontend/common/Menu";
import MyPage from "@/frontend/myPage/MyPage";

const App = () => {
  return (
    <>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/my-page" component={MyPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
