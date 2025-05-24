const { sendErrorResponse } = require("../helpers/send_error_response");
const dictJwtGuard = require("../middleware/guards/dict-jwt.guard");
const Dict = require("../schemas/Dict");
const config = require("config"); //default jsonnning ichidan malumotni chiqarib olish un kk
const bcrypt = require("bcrypt");
const { dictValidation } = require("../validation/dict.validation");
const { dictJwtService } = require("../service/jwt.service");

const create = async (req, res) => {
  try {
    const { error, value } = dictValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    console.log({
      ...value,
      password: hashedPassword,
    });

    const newDict = await Dict.create({
      ...value,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New dict added", newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const dicts = await Dict.find();
    res.status(200).send({ dicts });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const dict = await Dict.findById(id);
    res.status(200).send({ dict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Dict.findByIdAndDelete(id);
    res.status(200).send({ message: "Dictionary deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateDict = await Dict.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

// --

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    //ident
    const dict = await Dict.findOne({ email });
    console.log(dict);
    if (!dict) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const validPassword = bcrypt.compareSync(password, dict.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const payload = {
      id: dict._id,
      email: dict.email,
    };
    const tokens = dictJwtService.generateTokens(payload);
    dict.refresh_token = tokens.refreshToken;
    await dict.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_timeDict"),
    });

    res.status(201).send({
      message: "welcome",
      id: dict.id,
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

    const dict = await Dict.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!dict) {
      return res.status(400).send({ message: "Token notogri" });
    }

    res.clearCookie("refreshToken");
    res.send({ dict });
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
    await dictJwtService.verifyRefreshToken(refreshToken);

    const dict = await Dict.findOne({ refresh_token: refreshToken });
    if (!dict) {
      return res
        .status(401)
        .send({ message: "bazada refresh token topilmadi" });
    }
    const payload = {
      id: dict._id,
      email: dict.email,
    };

    const tokens = dictJwtService.generateTokens(payload);
    dict.refresh_token = tokens.refreshToken;
    await dict.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_timeDict"),
    });

    res.status(201).send({
      message: "tokenlar yangilandi",
      id: dict.id,
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
  refresh,
  logout,
};
