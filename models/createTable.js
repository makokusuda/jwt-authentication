const { User } = require("./user.model");
const { RefreshToken } = require("./auth.model");

User.sync({ force: true });
RefreshToken.sync({ force: true });
