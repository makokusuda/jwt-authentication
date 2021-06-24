import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import service from "@/service/service";

const Post = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const userId = localStorage.getItem("userId");

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postArticle = async () => {
    let postRes;
    try {
      postRes = await service.postArticle({ title, body, userId });
    } catch (err) {
      console.error(err);
    }
    if (postRes) return;
    // update access token
    try {
      console.log("Refresh token");
      const res = await service.refreshToken({ refreshToken, accessToken });
      await service.postArticle({ title, body, userId });
    } catch (err) {
      console.log("Logout");
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
