import React, { useEffect, useState } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import service from "@/service/service";

const MyPage = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [articles, setArticles] = useState([]);
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const tryAgain = async (func, arg) => {
    try {
      await service.refreshToken({ refreshToken, accessToken });
      await func(arg);
    } catch (err) {
      service.logout();
      setIsLoggedIn(false);
    }
  };

  const getArticles = async (res) => {
    res = await service.getAllArticlesByUserId(userId);
    setArticles(res.data);
    return res;
  };

  useEffect(async () => {
    let res;
    try {
      res = await getArticles(res);
    } catch (err) {
      console.error(err);
    }
    if (res) return;
    tryAgain(getArticles, res);
  }, []);

  const deleteArticle = async (id) => {
    let deleteRes;
    try {
      deleteRes = await service.deleteArticlesId(id);
    } catch (err) {
      console.error(err);
    }
    if (deleteRes) return;
    tryAgain(service.deleteArticlesId, id);
  };

  return (
    <div>
      My Page
      {articles.map((article, index) => {
        return (
          <div key={index}>
            <div>Article id:{article.id}</div>
            <div>Title: {article.title}</div>
            <div>Body: {article.body}</div>
            <div>Created at: {article.createdAt}</div>
            <div>Updated at: {article.updatedAt}</div>
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <Link to={`/edit/${article.id}`}>
              <div style={{ width: "100px" }}>Edit</div>
            </Link>
          </div>
        );
      })}
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </div>
  );
};

export default MyPage;
