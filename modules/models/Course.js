const { Schema, model } = require("mongoose");
const timeStamps = require("mongoose-timestamp");
const { courseSchema } = require("../validations/courseValidation");
const yup = require("yup");

const courseValidation = async (course) => {
  try {
    await courseSchema.validate(course, { abortEarly: false });
  } catch (error) {
    throw new Error(`Validation Error: ${error.errors.join(", ")}`);
  }
};

const courseSchemaMongoose = new Schema({
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
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Episode",
    },
  ],
});

courseSchemaMongoose.plugin(timeStamps);

const Course = model("Course", courseSchemaMongoose);

module.exports = Course;
