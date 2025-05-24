const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwtService = require("../../service/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);

    if (!authorization) {
      return res.status(401).send({ message: "header token failed" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "bearer token failed" });
    }
    const decodedPayload = await jwtService.verifyAccessToken(token);
    req.topic = decodedPayload;
    console.log(req);

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
