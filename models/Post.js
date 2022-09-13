const mongoose = require("mongoose");
const { contentSchema, emailSchema } = require("../utils/schemaValidation");
const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: (v) => contentSchema.isValid(v),
      message: (props) => `${props.value} is not a valid content!`,
    },
  },
  author: {
    login: String,
    email: {
      type: String,
      validate: {
        validator: (v) => emailSchema.isValid(v),
        message: (props) => `${props.value} is not a valid content!`,
      },
    },
    rate: Number,
  },
  isCorrect: { type: Boolean, default: false },
  publishAt: { type: Date, default: Date.now },
},{
  versionKey: false,
  timestamps:true
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
