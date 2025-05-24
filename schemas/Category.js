const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "category name must be at least 3 characters"],
    maxLength: [50, "category name must be less than 50 characters"],
    validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid category name`,
    },
  },
  parent_category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  refresh_token: { type: String },
});

module.exports = model("Category", categorySchema);
