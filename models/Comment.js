const mongoose = require("mongoose");
const { contentSchema } = require("../utils/schemaValidation");
const { Schema } = mongoose;

// создать схему и модель для Комментария
// comment (text), author (default: Anonim), createdAt (default:now)

const commentSchema = new Schema();

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
