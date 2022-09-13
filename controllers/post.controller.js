const createError = require("http-errors");
const Post = require("../models/Post");

module.exports.createPost = async (req, res, next) => {
  try {
    const { body } = req;
    Post.create(body, (err, post) => {
      if (err) {
        next(createError(400, "Bad request. Try again!" + err.message));
      }
      res.status(201).send(post);
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const {
      body,
      params: { postId },
    } = req;
    // const post = await Post.findByIdAndUpdate(postId, body, { new: true });
    // if (!post) {
    //   next(createError(400, "Bad request. Try again!"));
    // }
    // res.status(200).send(post);
    Post.findByIdAndUpdate(postId, body, {new:true, runValidators:true}, (err, post)=>{
      if(err){
        next(createError(404, err.message));
      }
      res.status(200).send(post);
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const {
      params: { postId },
    } = req;
    // const post = await Post.findByIdAndDelete(postId);
    // if(!post){
    //   next(createError(404,'Post not found!'));
    // }
    // res.status(200).send(post);
    Post.findByIdAndDelete(postId, (err, post) => {
      if (err) {
        return next(createError(400, "Bad request."+err.message));
      }
      if (post) {
        return res.status(200).send(post);
      }
      return next(createError(404, "Post not found")); 
    });
  } catch (error) {
    next(error);
  }
};
