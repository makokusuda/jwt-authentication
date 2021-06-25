import React, { useEffect, useState } from "react";
import service from "@/service/service";
import ArticleList from "@/frontend/common/ArticleList";

const Home = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(async () => {
    try {
      const offset = (currentPage - 1) * limit;
      const res = await service.getArticlesForPage(limit, offset);
      setArticlesData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [currentPage]);

  return (
    <div>
      Home
      <ArticleList
        articlesData={articlesData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        page={"home"}
      />
    </div>
  );
};

export default Home;
