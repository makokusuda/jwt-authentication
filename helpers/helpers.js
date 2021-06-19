const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.config");
const { RefreshToken } = require("../models/auth.model");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(404).send("No token provided");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(404).send("Unauthorized");
    }
    req.user = user;
    next();
  });
};

const generateAccessToken = (userName) => {
  return jwt.sign({ userName }, process.env.TOKEN_SECRET, {
    expiresIn: `${authConfig.jwtExpiration}s`,
  });
};

const generateRefreshToken = async () => {
  try {
    const token = await RefreshToken.create({
      refreshToken: randomTokenString(),
      expirationDate: new Date(
        Date.now() + authConfig.jwtRefreshExpiration * 1000
      ),
    });
    return token.refreshToken;
  } catch (err) {
    return err;
  }
};

const randomTokenString = () => {
  return crypto.randomBytes(40).toString("hex");
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
};
