const { Schema, model } = require("mongoose");

let adminSchema = new Schema({
  name: { type: String, required: true, unique: true },
  is_creator: { type: Boolean, required: true },
  is_active: { type: Boolean, required: true },
  password: { type: String, required: true },
  refresh_token: { type: String },
  activation_link: { type: String },
  email: { type: String },
});

module.exports = model("Admin", adminSchema);
