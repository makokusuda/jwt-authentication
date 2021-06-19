const cors = require("cors");
const express = require("express");
const controller = require("../controllers/users.controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/users", controller.getAllUsers);
app.post("/api/auth/sign-up", controller.createUser);
app.post("/api/auth/sign-in", controller.signIn);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
