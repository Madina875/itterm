const Joi = require("joi");

exports.tagValidation = (body) => {
  const schema = Joi.object({
    topic_id: Joi.string(),
    category_id: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
