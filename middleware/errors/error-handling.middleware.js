const ApiError = require("../../error/ApiError");
const logger = require("../../service/logger.service");

module.exports = function (err, req, res, next) {
  console.log(err);
  logger.error(err);
  if (err instanceof ApiError) {
    return res.status(err.status).send({ message: err.message });
  }
  //catching errors and returns answer for them
  if (err instanceof SyntaxError) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: "Nazarda tutilmagan xatolik" });
};
