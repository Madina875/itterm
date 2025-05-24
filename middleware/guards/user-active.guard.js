const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (!req.user.is_active) {
      return res.status(403).send({
        message: `you don't have permission.🫤🪽 you werent active last days`,
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
