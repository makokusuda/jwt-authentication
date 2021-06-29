import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "@/frontend/common/modal";

const Article = (props) => {
  const { article, deleteArticle, page } = props;
  const [modal, setModal] = useState(false);

  const convertMonth = (num) => {
    if (num === "01") return "JAN";
    if (num === "02") return "FEB";
    if (num === "03") return "MAR";
    if (num === "04") return "APR";
    if (num === "05") return "MAY";
    if (num === "06") return "JUN";
    if (num === "07") return "JUL";
    if (num === "08") return "AUG";
    if (num === "09") return "SEP";
    if (num === "10") return "OCT";
    if (num === "11") return "NOV";
    if (num === "12") return "DEC";
  };

  const getLocalTime = (createdAt) => {
    const localTime = new Date(createdAt);
    localTime.setHours(localTime.getHours() + 9);
    const str = JSON.stringify(localTime);
    const arr = str.replace(/"/g, "").split("T")[0].split("-");
    return `${arr[2]} ${convertMonth(arr[1])} ${arr[0]}`;
  };

  return (
    <Container>
      {page === "home" && (
        <Card>
          <UserInfo>
            <Icon />
            <UserName>{article.user.userName}</UserName>
            <CreatedDate data-page={"home"}>
              {getLocalTime(article.createdAt)}
            </CreatedDate>
          </UserInfo>
          <Content>
            <Title>{article.title}</Title>
            <div>{article.body}</div>
          </Content>
        </Card>
      )}
      {page === "myPage" && (
        <Card>
          <ArticleInfo>
            <CreatedDate>{getLocalTime(article.createdAt)}</CreatedDate>
            <EditMenu>
              <Link to={`/edit/${article.id}`}>
                <EditButton>Edit</EditButton>
              </Link>
              <EditButton onClick={() => setModal(true)}>Delete</EditButton>
            </EditMenu>
          </ArticleInfo>
          <Title>{article.title}</Title>
          <div>{article.body}</div>
          <Modal
            deleteArticle={deleteArticle}
            id={article.id}
            modal={modal}
            setModal={setModal}
          />
        </Card>
      )}
    </Container>
  );
};

export default Article;

const Container = styled.div`
  border: solid 1px rgba(15, 15, 15, 0.1);
  border-radius: 3px;
  margin: 20px 0;
`;

const Card = styled.div`
  padding: 20px;
  overflow-wrap: break-word;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  background: gray;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const CreatedDate = styled.div`
  color: #969696;

  &[data-page="home"] {
    margin-left: 10px;
  }
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Title = styled.div`
  font-size: 20px;
`;

const ArticleInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.div`
  color: #969696;
  padding: 0 10px;
  margin: 0 5px;
  cursor: pointer;
  border: solid 1px rgba(15, 15, 15, 0.1);
`;

const EditMenu = styled.div`
  display: flex;
`;
