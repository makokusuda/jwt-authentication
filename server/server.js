const cors = require("cors");
const express = require("express");
const helpers = require("../helpers/helpers");
const controller = require("../models/controller");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(serveStatic(path.join(__dirname, "../dist")));
app.use(cors());
app.use(express.json());

app.delete(
  "/api/articles/:id",
  helpers.authenticateToken,
  controller.deleteArticle
);
app.get("/api/users", helpers.authenticateToken, controller.getAllUsers);
app.get("/api/articles", controller.getAllArticles);
app.get("/api/articles/:id", controller.getAllArticleByArticleId);
app.get(
  "/api/users/:userId/articles",
  helpers.authenticateToken,
  controller.getAllArticlesByUserId
);
app.post("/api/articles", helpers.authenticateToken, controller.postArticle);
app.post("/api/auth/sign-up", controller.createUser);
app.post("/api/auth/sign-in", controller.signIn);
app.post("/api/auth/refresh-token", controller.refreshToken);
app.put("/api/articles/:id", helpers.authenticateToken, controller.putArticle);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
