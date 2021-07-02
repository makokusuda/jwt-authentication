import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import service from "../../service/service";

const Post = (props) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
  const userId = localStorage.getItem("userId");

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMode("post");
  }, []);

  const postArticle = async () => {
    if (title === "" || body === "") {
      setMessage("Title and body are mandatory!");
      return;
    }
    if (title.length > 255 || body.length > 255) {
      setMessage(
        `Title(${title.length}) and body(${body.length}) should be less than 255 characters!`
      );
      return;
    }
    setMessage("");

    let postRes;
    try {
      postRes = await service.postArticle({ title, body, userId });
    } catch (err) {
      console.error(err);
    }
    if (postRes) {
      window.setTimeout(() => {
        window.location.href = "/#/my-page";
      }, 1000);
      return;
    }
    // update access token
    try {
      const res = await service.refreshToken({ refreshToken, accessToken });
      await service.postArticle({ title, body, userId });
      window.setTimeout(() => {
        window.location.href = "/#/my-page";
      }, 1000);
    } catch (err) {
      service.logout();
      setIsLoggedIn(false);
    }
  };

  return (
    <Container>
      <PageTitle>Create New Post</PageTitle>
      <ErrorMessage>{message}</ErrorMessage>
      <div>
        <AreaTitle>Title</AreaTitle>
        <TextArea
          data-type={"title"}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <AreaTitle>Description</AreaTitle>
        <TextArea
          data-type={"body"}
          onChange={(e) => setBody(e.target.value)}
          type="text"
        />
      </div>
      <SubmitButton onClick={postArticle}>Submit</SubmitButton>
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  padding: 0 20px;
  text-align: center;
  width: 500px;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
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

const TextArea = styled.textarea`
  width: 500px;
  height: 200px;
  resize: none;
  &[data-type="title"] {
    height: 20px;
  }
  @media only screen and (max-width: 600px) {
    width: 292px;
  }
`;

const SubmitButton = styled.div`
  color: #ffffff;
  background-color: #111111;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
`;
