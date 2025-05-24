const { sendErrorResponse } = require("../helpers/send_error_response");
const Topic = require("../schemas/Topic");
const { topicJwtService } = require("../service/jwt.service");
const { topicValidation } = require("../validation/topic.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const create = async (req, res) => {
  try {
    const { error, value } = topicValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const newTopic = await Topic.create({
      ...value,
      password: hashedPassword,
    });

    res.status(201).send({ message: "New topic added", newTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getAll = async (req, res) => {
  try {
    const topic = await Topic.find();
    res.status(200).send({ topic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const author = await Topic.findById(id).populate("author_id");
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.status(200).send({ message: "author deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAuthor = await Topic.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //ident
    const topic = await Topic.findOne({ email });
    console.log(topic);
    if (!topic) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const validPassword = bcrypt.compareSync(password, topic.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const payload = {
      id: topic._id,
      email: topic.email,
    };
    const tokens = topicJwtService.generateTokens(payload);
    topic.refresh_token = tokens.refreshToken;
    await topic.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_timeTopic"),
    });

    res.status(201).send({
      message: "welcome",
      id: topic.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    const topic = await Topic.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!topic) {
      return res.status(400).send({ message: "Token notogri" });
    }

    res.clearCookie("refreshToken");
    res.send({ topic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    // console.log(refreshToken);

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    //verify
    await topicJwtService.verifyRefreshToken(refreshToken);

    const topic = await Topic.findOne({ refresh_token: refreshToken });
    if (!topic) {
      return res
        .status(401)
        .send({ message: "bazada refresh token topilmadi" });
    }
    const payload = {
      id: topic._id,
      email: topic.email,
    };

    const tokens = topicJwtService.generateTokens(payload);
    topic.refresh_token = tokens.refreshToken;
    await topic.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_timeTopic"),
    });

    res.status(201).send({
      message: "tokenlar yangilandi",
      id: topic.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  login,
  logout,
  refresh,
};
