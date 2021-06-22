import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const getAllArticles = () => {
  return axios.get("/api/articles");
};

export default {
  getAllArticles,
};
