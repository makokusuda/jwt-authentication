import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import service from "@/service/service";
import ArticleList from "@/frontend/common/ArticleList";

const MyPage = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const [articlesData, setArticlesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

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
    const offset = (currentPage - 1) * limit;
    res = await service.getArticlesForPageByUserId(userId, limit, offset);
    setArticlesData(res.data);
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
  }, [currentPage]);

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
      <ArticleList
        articlesData={articlesData}
        currentPage={currentPage}
        deleteArticle={deleteArticle}
        limit={limit}
        setCurrentPage={setCurrentPage}
        page={"myPage"}
      />
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </div>
  );
};

export default MyPage;
