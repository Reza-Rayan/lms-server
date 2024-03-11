const { Schema, model } = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 600,
  },
  banner: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Episode",
    },
  ],
});

courseSchema.plugin(timeStamps);

const Course = model("Course", courseSchema);

module.exports = Course;
