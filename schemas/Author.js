const { Schema, model } = require("mongoose");

const aurSchema = new Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    nick_name: { type: String, trim: true, unique: true },
    full_name: { type: String, trim: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String },
    password: { type: String },
    confirm_password: { type: String },
    info: { type: String },
    position: { type: String },
    photo: { type: String },
    is_export: { type: Boolean },
    is_active: { type: Boolean },
    gender: { type: String },
    birth_date: { type: String },
    port: { type: String },
    birth_year: { type: String },
    referred: { type: Boolean },
    referredDetails: { type: String },
    colors: { type: Array },
    is_yes: { type: String },
    refresh_token: { type: String },
    activation_link: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Author", aurSchema);
