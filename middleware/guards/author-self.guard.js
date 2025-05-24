//xar qanday middleware ning korinishi:
// const { sendErrorResponse } = require("../../helpers/send_error_response");

// module.exports = (req, res, next) => {
//   try {
//       // logika
//     next();
//   } catch (error) {
//     sendErrorResponse(error, res);
//   }
// };

const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (req.params.id != req.author.id) {
      return res.status(403).send({
        message: `you don't have permission.🫤🪽 \  here you can only see owners info`,
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
