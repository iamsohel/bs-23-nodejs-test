const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentId: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model("comment", commentSchema);
