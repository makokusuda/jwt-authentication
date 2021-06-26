import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/frontend/common/modal";

const Article = (props) => {
  const { article, deleteArticle, page } = props;
  const [modal, setModal] = useState(false);

  return (
    <div>
      {page === "home" && (
        <div>
          <div>
            <div>User name:{article.user.userName}</div>
            <div>Article id:{article.id}</div>
            <div>Title: {article.title}</div>
            <div>Body: {article.body}</div>
            <div>Created at: {article.createdAt}</div>
            <div>Updated at: {article.updatedAt}</div>
          </div>
        </div>
      )}
      {page === "myPage" && (
        <div>
          <div>Article id:{article.id}</div>
          <div>User id:{article.userId}</div>
          <div>Title: {article.title}</div>
          <div>Body: {article.body}</div>
          <div>Created at: {article.createdAt}</div>
          <div>Updated at: {article.updatedAt}</div>
          <button onClick={() => setModal(true)}>Delete</button>
          <Modal
            deleteArticle={deleteArticle}
            id={article.id}
            modal={modal}
            setModal={setModal}
          />
          <Link to={`/edit/${article.id}`}>
            <div style={{ width: "100px" }}>Edit</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Article;
