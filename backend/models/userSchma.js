let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

let User = mongoose.model("Users", userSchema);

module.exports = User;
