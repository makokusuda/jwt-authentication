const bcrypt = require("bcryptjs");
const db = require("./config");
const { DataTypes } = require("sequelize");

const helpers = require("../helpers/helpers");

const Article = db.define("article", {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
});

const RefreshToken = db.define("refresh_token", {
  refreshToken: {
    type: DataTypes.STRING,
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  accessToken: {
    type: DataTypes.STRING,
  },
});

const User = db.define("user", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Article);
Article.belongsTo(User);

User.hasOne(RefreshToken);
RefreshToken.belongsTo(User);

const createTable = async () => {
  await User.sync({ force: true });
  await RefreshToken.sync({ force: true });
  await Article.sync({ force: true });

  await User.create({ userName: "user1", password: "1234" });
  await Article.create({
    title: "test title1",
    body: "test body1",
    userId: 1,
  });
  await Article.create({
    title: "test title2",
    body: "test body2",
    userId: 1,
  });
};

// Users
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

// Articles
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await Article.destroy({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .send({ message: "Article was deleted successfully!" });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const getAllArticleByArticleId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Article.findAll({
      where: {
        id,
      },
    });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const getAllArticles = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const count = await Article.count();
    const articles = await Article.findAll({
      include: [{ model: User, attributes: ["userName"] }],
      attributes: ["body", "createdAt", "id", "title", "updatedAt"],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).send({ articles, count });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const getAllArticlesByUserId = async (req, res) => {
  const { userId } = req.params;
  const { limit, offset } = req.query;
  try {
    const count = await Article.count({
      where: {
        userId,
      },
    });
    const articles = await Article.findAll({
      where: {
        userId,
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).send({ articles, count });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const postArticle = async (req, res) => {
  const { title, body, userId } = req.body;
  try {
    await Article.create({ title, body, userId });
    return res.status(201).send({ message: "Article was added successfully!" });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const putArticle = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    await Article.update(
      { title, body },
      {
        where: {
          id,
        },
      }
    );
    return res
      .status(201)
      .send({ message: "Article was updated successfully!" });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

// Refresh tokens
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
      const refreshToken = await helpers.generateRefreshToken();
      await RefreshToken.destroy({
        where: {
          userId: user[0].id,
        },
      });
      // Save access token and refresh token in DB
      await RefreshToken.create({
        refreshToken: refreshToken.refreshToken,
        expirationDate: refreshToken.expirationDate,
        userId: user[0].id,
        accessToken,
      });

      return res.status(201).send({
        userId: user[0].id,
        accessToken,
        refreshToken: refreshToken.refreshToken,
      });
    }
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken, accessToken } = req.body;
  if (refreshToken === null || accessToken === null) {
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
    if (accessToken !== token[0].accessToken) {
      return res.status(404).json({ message: "Access token is wrong!" });
    }
    if (helpers.verifyExpiration(token[0])) {
      return res.status(400).json({
        message: "Refresh token was expired. Please make a new sign in request",
      });
    }

    const newAccessToken = helpers.generateAccessToken(token[0].userId);
    // Save new access token in DB
    await RefreshToken.update(
      { accessToken: newAccessToken },
      {
        where: {
          refreshToken,
        },
      }
    );

    return res.status(201).send({
      userId: token[0].userId,
      accessToken: newAccessToken,
      refreshToken: token[0].refreshToken,
    });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

module.exports = {
  createTable,
  createUser,
  deleteArticle,
  getAllArticleByArticleId,
  getAllArticles,
  getAllArticlesByUserId,
  getAllUsers,
  postArticle,
  putArticle,
  signIn,
  refreshToken,
};
