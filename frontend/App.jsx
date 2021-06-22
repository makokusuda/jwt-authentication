import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import About from "./common/About";
import Home from "./home/Home";
import Login from "./login/Login";
import Menu from "./common/Menu";
import MyPage from "./myPage/MyPage";

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
