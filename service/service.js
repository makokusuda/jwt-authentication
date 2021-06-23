import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const authHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return { authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
};

const getAllArticles = () => {
  return axios.get("/api/articles");
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
};

const postArticle = async (items) => {
  const { title, body, userId } = items;
  return axios.post(
    "/api/articles",
    { title, body, userId },
    { headers: authHeader() }
  );
};

const refreshToken = async (items) => {
  const { refreshToken, accessToken } = items;
  try {
    const res = await axios.post("/api/auth/refresh-token", {
      refreshToken,
      accessToken,
    });
    const newAccessToken = res.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

const signIn = async (userName, password) => {
  try {
    const res = await axios.post("/api/auth/sign-in", { userName, password });
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    const userId = res.data.userId;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
    }
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getAllArticles,
  logout,
  postArticle,
  refreshToken,
  signIn,
};
