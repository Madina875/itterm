const Joi = require("joi");

exports.desctValidation = (body) => {
  const schema = Joi.object({
    desc_id: Joi.string(),
    topic_id: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
