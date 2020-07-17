const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: {
    type: String,
    require: true,
  },
  blogId: {
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
  upVote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  downVote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model("comment", commentSchema);
