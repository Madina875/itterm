const Joi = require("joi");

// default value ni berilganlardan yasash : func
const authorFullname = (parent) => {
  return parent.first_name + " " + parent.last_name;
};

exports.aurValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    full_name: Joi.string().default(authorFullname), // defauilt ga funksiyani berib yuborish
    nick_name: Joi.string()
      .min(3)
      .message("nick qisqa")
      .max(5)
      .message("nick uzun"),
    email: Joi.string().email().lowercase(),
    phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
    info: Joi.string(),
    position: Joi.string(),
    photo: Joi.string().default("/author/avatar.png"),
    is_export: Joi.boolean().default(false),
    is_active: Joi.boolean().default(false),
    //enum = valid
    gender: Joi.string().valid("erkak", "ayol"),
    birth_date: Joi.date().max("2000-11-11"), // date
    port: Joi.number().port(), // port
    birth_year: Joi.number().integer().max(2020).min(2000), // to check and do
    //shart agar true bolsa details kirit deb:
    referred: Joi.boolean(),
    referredDetails: Joi.string().when("referred", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    colors: Joi.array().items(Joi.string(), Joi.number()),
    is_yes: Joi.boolean().truthy("Yes", "Ha").valid(true),
  });
  //   return schema.validate(body);
  return schema.validate(body, { abortEarly: false });
};




