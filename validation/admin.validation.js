const Joi = require("joi");

exports.adminValidation = (body) => {
  console.log(body);
  const schema = Joi.object({
    name: Joi.string(),
    is_creator: Joi.boolean(),
    is_active: Joi.boolean(),
    // parent_category_id: Joi.string(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
