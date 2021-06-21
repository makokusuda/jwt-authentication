const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.config");

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

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: `${authConfig.jwtExpiration}s`,
  });
};

const generateRefreshToken = () => {
  return {
    refreshToken: randomTokenString(),
    expirationDate: new Date(
      Date.now() + authConfig.jwtRefreshExpiration * 1000
    ),
  };
};

const randomTokenString = () => {
  return crypto.randomBytes(40).toString("hex");
};

const verifyExpiration = (token) => {
  return token.expirationDate.getTime() < new Date().getTime();
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyExpiration,
};
