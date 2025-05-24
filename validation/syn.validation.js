const Joi = require("joi");

exports.synValidation = (body) => {
  const schema = Joi.object({
    desc_id: Joi.string(),
    dict_id: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
