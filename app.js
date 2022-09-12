const express = require("express");
const PostController = require('./controllers/post.controller')

const app = express();
app.use(express.json());
app.post("/", PostController.createPost);
app.get("/", PostController.getAllPosts);
app.patch("/:postId", PostController.updatePost);
app.delete("/:postId", PostController.deletePost);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send(error.message||'Server error');
});

module.exports = app;