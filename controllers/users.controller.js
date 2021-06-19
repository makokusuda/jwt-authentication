const bcrypt = require("bcryptjs");
const { User, RefreshToken } = require("../models/index");

const getAllUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const createUser = async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    await User.create({ userName, password: hashedPassword });
    return res
      .status(200)
      .send({ message: "User was registered successfully!" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = { getAllUsers, createUser };
