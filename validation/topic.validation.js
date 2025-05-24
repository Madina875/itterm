const Joi = require("joi");

exports.topicValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
    author_id: Joi.string(),
    topic_title: Joi.string(),
    topic_text: Joi.string(),
    created_date: Joi.date(),
    updated_date: Joi.date(),
    is_checked: Joi.boolean().default(false),
    is_approved: Joi.boolean().default(false),
    expert_id: Joi.string(),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};
