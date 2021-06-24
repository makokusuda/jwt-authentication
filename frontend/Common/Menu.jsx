import React from "react";
import { Link } from "react-router-dom";
import service from "@/service/service";

const Menu = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const logout = () => {
    service.logout();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/my-page">My page</Link>
          <Link to="/post">Post</Link>
          <div style={{ width: "100px" }} onClick={logout}>
            Logout
          </div>
        </>
      ) : (
        <>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Menu;
