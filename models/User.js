const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema

const commenterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String, //blogger, commenter
    require: true,
  },
});

module.exports = Commenter = mongoose.model("users", commenterSchema);
