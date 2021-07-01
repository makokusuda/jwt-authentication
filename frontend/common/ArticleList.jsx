import React, { useEffect, useState } from "react";
import styled from "styled-components";
import service from "../../service/service";
import Article from "./Article";

const ArticleList = (props) => {
  const {
    articlesData,
    currentPage,
    deleteArticle,
    limit,
    setCurrentPage,
    page,
  } = props;
  const [articles, setArticles] = useState();
  const [pageSet, setPageSet] = useState();

  useEffect(() => {
    const count = articlesData.count;
    const page = Math.ceil(count / limit);
    const arr = service.getPageSet(currentPage, page);
    setArticles(articlesData.articles);
    setPageSet(arr);
    if (currentPage > page) setCurrentPage(page);
  }, [articlesData]);

  const updateCurrentPage = (num) => {
    setCurrentPage(num);
    window.scroll({
      top: 0,
    });
  };

  return (
    <Container>
      <div>
        {articles &&
          articles.map((article, index) => {
            return (
              <Article
                key={index}
                article={article}
                deleteArticle={deleteArticle}
                page={page}
              />
            );
          })}
      </div>
      <PageNum>
        {pageSet &&
          pageSet.map((num, index) => {
            return num === "..." ? (
              <Number data-dot={"true"} key={index}>
                {num}
              </Number>
            ) : (
              <Number
                key={index}
                data-num={currentPage === num}
                onClick={() => updateCurrentPage(num)}
              >
                {num}
              </Number>
            );
          })}
      </PageNum>
    </Container>
  );
};

export default ArticleList;

const Container = styled.div`
  max-width: 1260px;
  margin: 0 auto;
`;

const PageNum = styled.div`
  display: flex;
  justify-content: center;
`;

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
  padding: 5px;
  border: solid 1px rgba(15, 15, 15, 0.1);
  min-width: 20px;
  cursor: pointer;

  &[data-num="true"] {
    color: #ffffff;
    background-color: #111111;
    font-weight: bold;
  }

  &[data-dot="true"] {
    border: none;
    cursor: auto;
  }
`;
