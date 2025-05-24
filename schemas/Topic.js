const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  topic_text: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
  },
  is_checked: {
    type: Boolean,
  },
  is_approved: {
    type: Boolean,
  },
  export_id: {
    type: String,
  },
  refresh_token: { type: String },
  activation_link: { type: String },
});

module.exports = model("Topic", topicSchema);
