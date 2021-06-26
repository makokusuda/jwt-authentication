import React, { useEffect, useState } from "react";
import service from "@/service/service";
import Article from "@/frontend/common/Article";

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

  return (
    <div>
      <div>
        {articles &&
          articles.map((article, index) => {
            return (
              <div key={index}>
                <Article
                  article={article}
                  deleteArticle={deleteArticle}
                  page={page}
                />
              </div>
            );
          })}
      </div>
      <div>
        {pageSet &&
          pageSet.map((num, index) => {
            return num === "..." ? (
              <div key={index}>{num}</div>
            ) : (
              <div key={index} onClick={() => setCurrentPage(num)}>
                {num}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ArticleList;
