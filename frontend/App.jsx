import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import MyPage from "./MyPage/MyPage";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/my-page" component={MyPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
