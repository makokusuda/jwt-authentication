import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import service from "@/service/service";

const Post = (props) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
  const userId = localStorage.getItem("userId");

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setMode("post");
  }, []);

  const postArticle = async () => {
    let postRes;
    try {
      postRes = await service.postArticle({ title, body, userId });
    } catch (err) {
      console.error(err);
    }
    if (postRes) {
      window.setTimeout(() => {
        window.location.href = "http://localhost:8080/#/my-page";
      }, 1000);
      return;
    }
    // update access token
    try {
      const res = await service.refreshToken({ refreshToken, accessToken });
      await service.postArticle({ title, body, userId });
      window.setTimeout(() => {
        window.location.href = "http://localhost:8080/#/my-page";
      }, 1000);
    } catch (err) {
      service.logout();
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      Post page
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" onChange={(e) => setBody(e.target.value)} />
      <button onClick={postArticle}>Submit</button>
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </div>
  );
};

export default Post;
