import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams } from "react-router-dom";
import service from "@/service/service";

const Edit = (props) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [article, setArticle] = useState();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setMode("edit");
  }, []);

  const getArticle = async () => {
    const res = await service.getAllArticleByArticleId(id);
    setArticle(res.data[0]);
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
    <div>
      Edit
      {article && (
        <div>
          <div>id{id}</div>
          <div>Article id:{article.id}</div>
          <div>
            Title:
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
            />
          </div>
          <div>
            Body:
            <input
              onChange={(e) => setBody(e.target.value)}
              type="text"
              value={body}
            />
          </div>
          <div>Created at: {article.createdAt}</div>
          <div>Updated at: {article.updatedAt}</div>
        </div>
      )}
      <button onClick={updateArticle}>Submit</button>
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </div>
  );
};

export default Edit;
