const { Article } = require("./article.model");
const { User } = require("./user.model");
const { RefreshToken } = require("./auth.model");

Article.sync({ force: true });
User.sync({ force: true });
RefreshToken.sync({ force: true });
