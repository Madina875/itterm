const { Schema, model } = require("mongoose");

const dictSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    email: { type: String, required: true },
    term: {
      type: String,
      required: true,
      trim: true,
    },
    letter: {
      type: String,
      uppercase: true,
    },
    refresh_token: { type: String },
    activation_link: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Dictionary", dictSchema);
