const bcrypt = require("bcryptjs");

const helpers = require("../helpers/helpers");
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
      .status(201)
      .send({ message: "User was registered successfully!" });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const signIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findAll({
      where: {
        userName,
      },
    });

    if (user.length === 0) {
      return res.status(401).send({ message: "User is not found" });
    }

    const passwordIsValid = await bcrypt.compareSync(
      password,
      user[0].password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    } else {
      const accessToken = helpers.generateAccessToken(user[0].id);
      const refreshToken = await helpers.generateRefreshToken(user[0].id);
      return res.status(201).send({
        accessToken,
        refreshToken,
      });
    }
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken === null) {
    return res.status(400).json({ message: "Refresh Token is required!" });
  }

  try {
    const token = await RefreshToken.findAll({
      where: {
        refreshToken,
      },
    });

    if (token.length === 0) {
      return res
        .status(404)
        .json({ message: "Refresh token is not in database!" });
    }
    if (helpers.verifyExpiration(token[0])) {
      return res.status(400).json({
        message: "Refresh token was expired. Please make a new sign in request",
      });
    }

    const accessToken = helpers.generateAccessToken(token[0].userId);
    return res.status(201).send({
      accessToken,
      refreshToken: token[0].refreshToken,
    });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

module.exports = { getAllUsers, createUser, signIn, refreshToken };
