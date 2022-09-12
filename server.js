const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect("mongodb://localhost:27017/fm_mongo_08-09")
  .catch((err) => console.log(err.message));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server started at port = " + PORT);
});
