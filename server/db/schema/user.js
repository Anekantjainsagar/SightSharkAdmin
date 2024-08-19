const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profile: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s",
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
