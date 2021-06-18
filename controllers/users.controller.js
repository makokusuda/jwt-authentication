const { User, RefreshToken } = require("../models/index");

const getAllUsers = async (req, res) => {
  const result = await User.findAll();
  await res.status(200).send(result);
};

module.exports = { getAllUsers };
