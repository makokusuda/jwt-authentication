import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Modal = (props) => {
  const { deleteArticle, id, modal, setModal } = props;
  const [windowOffset, setWindowOffset] = useState(0);

  useEffect(() => {
    setWindowOffset(window.scrollY);
    if (modal) {
      document.body.setAttribute(
        "style",
        `position: fixed; top: -${window.scrollY}px; left: 0; right: 0`
      );
    } else {
      document.body.setAttribute(
        "style",
        `position: static; top: 0; left: auto; right: auto`
      );
      window.scrollTo(0, windowOffset);
    }
  }, [modal]);

  const onClickDelete = (id) => {
    setModal(false);
    deleteArticle(id);
  };
  return (
    <BackGround style={{ display: modal ? "block" : "none" }}>
      <Content>
        <div>
          <div>Delete</div>
          Are you sure you want to delete this story?
        </div>
        <div>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </button>
          <button onClick={() => onClickDelete(id)}>Delete</button>
        </div>
      </Content>
    </BackGround>
  );
};

export default Modal;

const BackGround = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  background-color: #fefefe;
  margin: calc((100vh - 68px) / 2 - 137px) auto 0;
  padding: 20px;
  border-radius: 4px;
`;
