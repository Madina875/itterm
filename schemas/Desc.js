const { Schema, model } = require("mongoose");

const descSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
    trim: true,
    minLength: [3, "description name must be at least 3 characters"],
    maxLength: [200, "description name must be less than 50 characters"],
  },
  refresh_token: { type: String },
  activation_link: { type: String },
});

module.exports = model("Description", descSchema);
