const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  is_active: { type: Boolean, required: true },
  password: { type: String, required: true },
  refresh_token: { type: String },
  activation_link: { type: String },
  email: { type: String, trim: true },
  refresh_token: { type: String },
  activation_link: { type: String },
});

module.exports = model("User", userSchema);
