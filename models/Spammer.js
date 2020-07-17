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
});

module.exports = Spammer = mongoose.model("spammers", spammerSchema);
