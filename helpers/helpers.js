const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.config");
const { RefreshToken } = require("../models/auth.model");

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

module.exports = { generateAccessToken, generateRefreshToken };
