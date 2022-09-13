const express = require("express");
const PostController = require('./controllers/post.controller')
const CommentController = require('./controllers/comment.controller')

const app = express();
app.use(express.json());
app.post("/", PostController.createPost);
app.get("/", PostController.getAllPosts);
app.patch("/:postId", PostController.updatePost);
app.delete("/:postId", PostController.deletePost);

app.post("/:postId/comments", CommentController.createComment);
app.get("/comments",CommentController.getAllComments );
app.get("/:postId/comments",CommentController.getAllCommentsByPost );

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send(error.message||'Server error');
});

module.exports = app;