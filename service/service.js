import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://hibi-app.herokuapp.com:3000";
} else {
  axios.defaults.baseURL = "http://localhost:3000";
}

const authHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return { authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
};

const getPageSet = (currentPage, totalPage) => {
  // Array of all page number
  let arr = [];
  for (let i = 1; i < totalPage + 1; i++) {
    arr.push(i);
  }
  // Page number for page button
  const result = [];
  result.push(arr[0]);
  if (currentPage - 4 > 0) result.push("...");
  if (currentPage - 3 > 0) result.push(arr[currentPage - 3]);
  if (currentPage - 2 > 0) result.push(arr[currentPage - 2]);
  if (currentPage - 1 !== 0 && currentPage !== arr.length)
    result.push(arr[currentPage - 1]);
  if (currentPage + 1 < arr.length) result.push(arr[currentPage]);
  if (currentPage + 2 < arr.length) result.push(arr[currentPage + 1]);
  if (currentPage + 3 < arr.length) result.push("...");
  if (arr[0] !== arr[arr.length - 1]) result.push(arr[arr.length - 1]);
  return result;
};

const deleteArticlesId = (id) => {
  return axios.delete(`/api/articles/${id}`, { headers: authHeader() });
};

const getAllArticleByArticleId = (id) => {
  return axios.get(`/api/articles/${id}`, { headers: authHeader() });
};

const getArticlesForPage = async (limit, offset) => {
  return axios.get(`/api/articles?limit=${limit}&offset=${offset}`);
};

const getArticlesForPageByUserId = async (userId, limit, offset) => {
  return axios.get(
    `/api/users/${userId}/articles?limit=${limit}&offset=${offset}`,
    { headers: authHeader() }
  );
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

const putArticle = async (items) => {
  const { id, body, title } = items;
  try {
    await axios.put(
      `/api/articles/${id}`,
      {
        body,
        title,
      },
      { headers: authHeader() }
    );
  } catch (err) {
    throw new Error(err);
  }
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
  deleteArticlesId,
  getAllArticleByArticleId,
  getArticlesForPage,
  getArticlesForPageByUserId,
  getPageSet,
  logout,
  postArticle,
  putArticle,
  refreshToken,
  signIn,
};
