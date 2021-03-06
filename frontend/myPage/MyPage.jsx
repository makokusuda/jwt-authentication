import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import service from "../../service/service";
import ArticleList from "../common/ArticleList";

const MyPage = (props) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const [articlesData, setArticlesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updated, setUpdated] = useState(0);
  const limit = 3;

  useEffect(() => {
    setMode("myPage");
  }, []);

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

    try {
      await service.refreshToken({ refreshToken, accessToken });
    } catch (err) {
      service.logout();
      setIsLoggedIn(false);
      return;
    }

    try {
      await getArticles(res);
    } catch (err) {
      console.log("No record");
    }
  }, [currentPage, updated]);

  const deleteFunc = async (id) => {
    const res = await service.deleteArticlesId(id);
    setUpdated(updated + 1);
    return res;
  };

  const deleteArticle = async (id) => {
    let deleteRes;
    try {
      deleteRes = await deleteFunc(id);
    } catch (err) {
      console.error(err);
    }
    if (deleteRes) return;

    try {
      await service.refreshToken({ refreshToken, accessToken });
      await deleteFunc(id);
    } catch (err) {
      service.logout();
      setIsLoggedIn(false);
    }
  };

  return (
    <Container>
      {articlesData.count === 0 && <div>No record</div>}
      <ArticleList
        articlesData={articlesData}
        currentPage={currentPage}
        deleteArticle={deleteArticle}
        limit={limit}
        setCurrentPage={setCurrentPage}
        page={"myPage"}
      />
      <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  padding: 0 20px;
`;
