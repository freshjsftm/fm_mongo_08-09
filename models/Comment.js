const mongoose = require("mongoose");
const { contentSchema } = require("../utils/schemaValidation");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
    validate: {
      validator: (v) => contentSchema.isValid(v),
      message: (props) => `${props.value} is not a valid comment!`,
    },
  },
  author: { type: String, default: "Anonim" },
  createdAt: { type: Date, default: Date.now },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
},{
  versionKey: false,
  timestamps:true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
