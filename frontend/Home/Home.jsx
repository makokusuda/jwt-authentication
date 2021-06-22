import React, { useEffect, useState } from "react";
import service from "../../service/service";

const Home = () => {
  const [articles, setArticles] = useState([]);
  useEffect(async () => {
    try {
      const res = await service.getAllArticles();
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      Home
      <div>
        {articles.map((article, index) => {
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
      </div>
    </div>
  );
};

export default Home;
