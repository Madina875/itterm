const Joi = require("joi");

exports.catValidation = (body) => {
  const schema = Joi.object({
    category_name: Joi.string(),
    parent_category_id: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
