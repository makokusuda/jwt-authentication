const express = require("express");
const controller = require("../controllers/users.controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/users", controller.getAllUsers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
