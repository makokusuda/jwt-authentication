import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "@/service/service";

const ArticleList = (props) => {
  const {
    articlesData,
    currentPage,
    deleteArticle,
    limit,
    page,
    setCurrentPage,
  } = props;
  const [articles, setArticles] = useState();
  const [pageSet, setPageSet] = useState();

  useEffect(() => {
    const count = articlesData.count;
    const page = Math.ceil(count / limit);
    const arr = service.getPageSet(currentPage, page);
    setArticles(articlesData.articles);
    setPageSet(arr);
  }, [articlesData]);

  return (
    <div>
      <div>
        {page === "home" &&
          articles &&
          articles.map((article, index) => {
            return (
              <div key={index}>
                <div>User name:{article.user.userName}</div>
                <div>Article id:{article.id}</div>
                <div>Title: {article.title}</div>
                <div>Body: {article.body}</div>
                <div>Created at: {article.createdAt}</div>
                <div>Updated at: {article.updatedAt}</div>
              </div>
            );
          })}
        {page === "myPage" &&
          articles &&
          articles.map((article, index) => {
            return (
              <div key={index}>
                <div>Article id:{article.id}</div>
                <div>User id:{article.userId}</div>
                <div>Title: {article.title}</div>
                <div>Body: {article.body}</div>
                <div>Created at: {article.createdAt}</div>
                <div>Updated at: {article.updatedAt}</div>
                <button onClick={() => deleteArticle(article.id)}>
                  Delete
                </button>
                <Link to={`/edit/${article.id}`}>
                  <div style={{ width: "100px" }}>Edit</div>
                </Link>
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
