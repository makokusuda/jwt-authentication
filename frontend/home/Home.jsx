import React, { useEffect, useState } from "react";
import service from "../../service/service";
import styled from "styled-components";
import ArticleList from "../common/ArticleList";

const Home = (props) => {
  const { setMode } = props;
  const [articlesData, setArticlesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    setMode("home");
  }, []);

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
    <Container>
      {articlesData.count === 0 && <div>No record</div>}
      <ArticleList
        articlesData={articlesData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        page={"home"}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 0 20px;
`;
