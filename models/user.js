const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String , required: true}
  },
  { timestamps: true }
);

mongoose.model("user", userSchema);

const user = mongoose.model("user", userSchema);

module.exports = user;