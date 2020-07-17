const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spammerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  isSpammer: {
    type: Boolean,
    default: false,
  },
  blogId: {
    type: String,
  },
});

module.exports = Spammer = mongoose.model("spammers", spammerSchema);
