const { Schema, model } = require("mongoose");

const synSchema = new Schema({
  desc_id: {
    type: Schema.Types.ObjectId,
    ref: "Description",
  },
  dict_id: {
    type: Schema.Types.ObjectId,
    ref: "Dictionary",
  },
  refresh_token: { type: String },
  activation_link: { type: String },
});

module.exports = model("Synonym", synSchema);
