const Joi = require("joi");

exports.dictValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string().required(),
    term: Joi.string()
      .min(2)
      .message("ITTERMIN 1 TA DAN KO'P BO'LISHI K-K!")
      .required()
      .messages({
        // kelgan xatoliklarni terminalda korib uning nomini yozib ushlab olish mumkin
        "string.empty": "bosh bolishi mumkin emassss",
        "any.required": "albatta kiritilishi shartt",
      }),
  });
  return schema.validate(body);
};
