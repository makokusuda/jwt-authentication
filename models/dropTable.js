const { User } = require("./user.model");
const { RefreshToken } = require("./auth.model");

User.drop();
RefreshToken.drop();
