const { sendErrorResponse } = require("../../helpers/send_error_response");

const config = require("config"); //default jsonnning ichidan malumotni chiqarib olish un kk
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization); // you can see the entered token in terminal

    if (!authorization) {
      return res.status(401).send({ message: "header token failed" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "bearer token failed" });
    }

    //decoded payload will be in console
    // const decodedPayload = jwt.verify(token, config.get("adminTokenKey"));
    const decodedPayload = await jwtService.verifyAccessToken(token);

    // console.log(decodedPayload);

    // if (!decodedPayload.is_active) {
    //   return res.status(403).send({ message: "you are not an active person 🫤🪽" });
    // }

    req.admin = decodedPayload;
    console.log(req);

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
