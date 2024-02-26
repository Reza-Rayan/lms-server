const { Schema, model } = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  wallet: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(timeStamps);

const User = model("User", userSchema);

module.exports = User;
