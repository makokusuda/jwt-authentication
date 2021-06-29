import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams } from "react-router-dom";
import styled from "styled-components";
import service from "@/service/service";

const Edit = (props) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMode("edit");
  }, []);

  const getArticle = async () => {
    const res = await service.getAllArticleByArticleId(id);
    setTitle(res.data[0].title);
    setBody(res.data[0].body);
  };

  const logout = () => {
    service.logout();
    setIsLoggedIn(false);
  };

  useEffect(async () => {
    let data;
    try {
      await getArticle();
    } catch (err) {
      console.error(err);
    }
    if (data) return;

    try {
      await service.refreshToken({ refreshToken, accessToken });
      await getArticle();
    } catch (err) {
      logout();
    }
  }, []);

  const putArticle = async () => {
    await service.putArticle({ id, body, title });
    window.setTimeout(() => {
      window.location.href = "http://localhost:8080/#/my-page";
    }, 1000);
  };

  const updateArticle = async () => {
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

    let result = false;
    try {
      await putArticle();
      result = true;
    } catch (err) {
      console.error(err);
    }
    if (result) return;

    try {
      await service.refreshToken({ refreshToken, accessToken });
      await putArticle();
    } catch (err) {
      logout();
    }
  };

  return (
    <Container>
      <PageTitle>Edit Post</PageTitle>
      <ErrorMessage>{message}</ErrorMessage>
      <div>
        <AreaTitle>Title</AreaTitle>
        <TextArea
          data-type={"title"}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
        />
      </div>
      <div>
        <AreaTitle>Description</AreaTitle>
        <TextArea
          data-type={"body"}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          value={body}
        />
      </div>
      <SubmitButton onClick={updateArticle}>Submit</SubmitButton>
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </Container>
  );
};

export default Edit;

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
