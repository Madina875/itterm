const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (!req.author.is_export) {
      return res.status(403).send({
        message: `you don't have permission.🫤🪽 youarenot export`,
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
