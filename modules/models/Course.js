const { Schema, model } = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    length: 300,
  },
  description: {
    type: String,
    required: true,
    min: 10,
    max: 600,
  },
  imageBanner: {
    type: String,
    required: true,
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
});

courseSchema.plugin(timeStamps);

const Course = model("Course", courseSchema);

module.exports = Course;
