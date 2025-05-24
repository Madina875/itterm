const Joi = require("joi");

exports.socValidation = (body) => {
  const schema = Joi.object({
    social_name: Joi.string(),
    social_icon_file: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
