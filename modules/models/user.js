const { Schema, model } = require("mongoose");
const timeStamps = require("mongoose-timestamp");
const bcrypt = require("bcrypt");
const { validateUser } = require("../validations/userValidator");

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
    default: " ",
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  phone: {
    type: String,
  },
  wallet: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(timeStamps);

// Hashing password middleware
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// Validator middleware
userSchema.pre("save", function (next) {
  const validationResults = validateUser({
    username: this.username,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
    password: this.password,
    courses: this.courses,
    phone: this.phone,
    wallet: this.wallet,
  });

  if (validationResults !== true) {
    const errors = validationResults.map((error) => error.message);
    const errorString = errors.join(", ");
    return next(new Error(errorString));
  }

  next();
});

const User = model("User", userSchema);

module.exports = User;
