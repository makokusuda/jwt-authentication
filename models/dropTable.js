const { Article } = require("./article.model");
const { User } = require("./user.model");
const { RefreshToken } = require("./auth.model");

Article.drop();
User.drop();
RefreshToken.drop();
