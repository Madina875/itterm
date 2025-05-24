const Joi = require("joi");

exports.descValidation = (body) => {
  const schema = Joi.object({
    category_id: Joi.string(),
    description: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
