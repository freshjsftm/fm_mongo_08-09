const createError = require("http-errors");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports.createComment = async (req, res, next) => {
  try {
    const {
      body,
      params: { postId },
    } = req;
    const comment = await Comment.create({ ...body, post: postId });
    if (!comment) {
      next(createError(400, "Try again!"));
    }
    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};
module.exports.getAllComments = async (req, res, next) => {
  try {
    //const comments = await Comment.find();
    //res.status(200).send(comments);
    Comment.find()
      .populate("post", "content")
      .exec((err, comments) => {
        if (err) {
          next(createError(400, "Try again!"));
        }
        res.status(200).send(comments);
      });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllCommentsByPost = async (req, res, next) => {
  try {
    const {
      params: { postId },
    } = req;
    Comment.find({post:postId})
      .populate("post", "_id")
      .exec((err, comments) => {
        if (err) {
          next(createError(400, "Try again!"));
        }
        res.status(200).send(comments);
      });
  } catch (error) {
    next(error);
  }
};
