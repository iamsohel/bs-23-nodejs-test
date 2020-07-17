const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bannerCommentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "comment",
  },
});

module.exports = BannedComment = mongoose.model(
  "banned_comment",
  bannerCommentSchema
);
