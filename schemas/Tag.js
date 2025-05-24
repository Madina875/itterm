const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  refresh_token: { type: String },
  activation_link: { type: String },
});

module.exports = model("Tag", tagSchema);
