const { Schema, model } = require("mongoose");

const descTSchema = new Schema({
  desc_id: {
    type: Schema.Types.ObjectId,
    ref: "Description",
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
  refresh_token: { type: String },
  activation_link: { type: String },
});

module.exports = model("DescTopic", descTSchema);
