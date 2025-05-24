const { sendErrorResponse } = require("../helpers/send_error_response");
const Admin = require("../schemas/Admin");
const { adminValidation } = require("../validation/admin.validation");
const config = require("config"); //default jsonnning ichidan malumotni chiqarib olish un kk
const bcrypt = require("bcrypt");
const { adminJwtService } = require("../service/jwt.service");
const uuid = require("uuid");
const mailService = require("../service/mail.service");

const create = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();

    const newAdmin = await Admin.create({
      ...value,
      password: hashedPassword,
      activation_link,
    });

    const link = `${config.get(
      "api_url"
    )}/api/admin/activate/${activation_link}`;
    await mailService.sendMail(value.email, link);

    res.status(201).send({ message: "New admin added", newAdmin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).send(admin);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).send(admin);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).send({ message: "admin deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAdmin = await Admin.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAdmin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    //ident
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).send({ message: "name or password is incorrect" });
    }
    console.log(admin);

    //auth
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }

    //token kalit berib yuborish :
    const payload = {
      id: admin._id,
      is_creator: admin.is_creator,
      name: admin.name,
      // is_active: admin.is_active,
      // is_export: admin.is_export,
    };
    const tokens = adminJwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_timeAdmin"),
    });

    res.status(201).send({
      message: "welcome",
      id: admin.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    const admin = await Admin.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({ message: "Token notogri" });
    }

    res.clearCookie("refreshToken");
    res.send({ admin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    // console.log(refreshToken);

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    //verify
    await adminJwtService.verifyRefreshToken(refreshToken);

    const admin = await Admin.findOne({ refresh_token: refreshToken });
    if (!admin) {
      return res
        .status(401)
        .send({ message: "bazada refresh token topilmadi" });
    }
    const payload = {
      id: admin._id,
      is_creator: admin.is_creator,
      name: admin.name,
    };
    const tokens = adminJwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_timeAdmin"),
    });

    res.status(201).send({
      message: "tokenlar yangilandi",
      id: admin.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const adminActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const admin = await Admin.findOne({ activation_link: link });
    console.log(admin);
    if (!admin) {
      return res.status(400).send({ message: "Admin link noto'g'ri" });
    }
    if (admin.is_active) {
      return res
        .status(400)
        .send({ message: "admin avval faollashtirilgan noto'g'ri" });
    }

    admin.is_active = true;
    await admin.save();
    res.send({
      message: "helloooooooooooooooo this is from admin ",
      isActive: admin.is_active,
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
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  adminActivate,
};
