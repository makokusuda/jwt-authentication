import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import service from "../../service/service";

const Menu = (props) => {
  const { isLoggedIn, mode, setIsLoggedIn } = props;

  const logout = () => {
    service.logout();
    setIsLoggedIn(false);
  };

  return (
    <Wrapper>
      <Container>
        <LeftArea>
          {mode === "home" ? (
            <MenuText>Home</MenuText>
          ) : (
            <Link to="/">
              <MenuText>Home</MenuText>
            </Link>
          )}
        </LeftArea>
        <RightArea>
          {isLoggedIn ? (
            <>
              {mode === "myPage" ? (
                <MenuText>Dashboard</MenuText>
              ) : (
                <Link to="/my-page">
                  <MenuText>Dashboard</MenuText>
                </Link>
              )}
              {mode === "post" ? (
                <MenuText>Post</MenuText>
              ) : (
                <Link to="/post">
                  <MenuText>Post</MenuText>
                </Link>
              )}
              <MenuText onClick={logout}>Logout</MenuText>
            </>
          ) : (
            <>
              {mode === "about" ? (
                <MenuText>About</MenuText>
              ) : (
                <Link to="/about">
                  <MenuText>About</MenuText>
                </Link>
              )}
              {mode === "login" ? (
                <MenuText>Log in</MenuText>
              ) : (
                <Link to="/login">
                  <MenuText>Log in</MenuText>
                </Link>
              )}
            </>
          )}
        </RightArea>
      </Container>
    </Wrapper>
  );
};

export default Menu;

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  height: 80px;
  max-width: 1260px;
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
`;

const MenuText = styled.div`
  color: #111111;
  padding: 0 10px;
  cursor: pointer;
`;
