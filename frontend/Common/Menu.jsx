import React from "react";
import { Link } from "react-router-dom";
import service from "@/service/service";

const Menu = (props) => {
  const { isLoggedIn, mode, setIsLoggedIn } = props;

  const logout = () => {
    service.logout();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {mode === "home" ? <div>Home</div> : <Link to="/">Home</Link>}
      {isLoggedIn ? (
        <>
          {mode === "myPage" ? (
            <div>My page</div>
          ) : (
            <Link to="/my-page">My page</Link>
          )}
          {mode === "post" ? <div>Post</div> : <Link to="/post">Post</Link>}
          <div style={{ width: "100px" }} onClick={logout}>
            Logout
          </div>
        </>
      ) : (
        <>
          {mode === "about" ? <div>About</div> : <Link to="/about">About</Link>}
          {mode === "login" ? <div>Login</div> : <Link to="/login">Login</Link>}
        </>
      )}
    </div>
  );
};

export default Menu;
