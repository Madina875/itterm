const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { aurValidation } = require("../validation/aur.validation");
const uuid = require("uuid");
const config = require("config"); //default jsonnning ichidan malumotni chiqarib olish un kk
const bcrypt = require("bcrypt");
const { authJwtService } = require("../service/jwt.service");
const mailService = require("../service/mail.service");

const create = async (req, res) => {
  try {
    const { error, value } = aurValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const activation_link = uuid.v4();
    const newAuthor = await Author.create({
      ...value,

      password: hashedPassword,
      activation_link,
    });

    const link = `${config.get(
      "api_url"
    )}/api/author/activate/${activation_link}`;
    await mailService.sendMail(value.email, link);

    res.status(201).send({ message: "New author added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const author = await Author.find();
    res.status(200).send({ authors: author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const author = await Author.findById(id);
    res.status(200).send(author);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "author deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAuthor = await Author.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    //ident
    const author = await Author.findOne({ email });
    if (!author) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }

    //auth
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }

    //token kalit berib yuborish :
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_export: author.is_export,
    };

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = authJwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    //-----------------------------test un error ---------------------------
    // //agar throw bolsa catch ushlab olmaydi
    // try {
    //   setTimeout(function () {
    //     throw new Error("UncaughtException example");
    //   }, 1000);
    // } catch (error) {
    //   console.log(error);
    // }

    // new Promise((_, reject) => {
    //   reject(new Error("UnHandledRejection example"));
    // });

    //-----------------------------test un error ---------------------------

    res
      .status(201)
      .send({
        message: "welcome",
        id: author.id,
        accessToken: tokens.accessToken,
      });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    const author = await Author.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!author) {
      return res.status(400).send({ message: "Token notogri" });
    }

    res.clearCookie("refreshToken");
    res.send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    //verify
    await authJwtService.verifyRefreshToken(refreshToken);

    const author = await Author.findOne({ refresh_token: refreshToken });
    if (!author) {
      return res
        .status(401)
        .send({ message: "bazada refresh token topilmadi" });
    }
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_export: author.is_export,
    };

    const tokens = authJwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(201).send({
      message: "tokenlar yangilandi",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const authorActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const author = await Author.findOne({ activation_link: link });
    if (!author) {
      return res.status(400).send({ message: "Author link noto'g'ri" });
    }
    if (author.is_active) {
      return res
        .status(400)
        .send({ message: "Author avval faollashtirilgan noto'g'ri" });
    }

    author.is_active = true;
    await author.save();
    res.send({ message: "avtor faollashtirildi", isActive: author.is_active });
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
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
};
