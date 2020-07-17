const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spammerCounterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  spamCount: {
    type: Number,
  },
});

module.exports = SpammerCounter = mongoose.model(
  "spammer_counter",
  spammerCounterSchema
);
