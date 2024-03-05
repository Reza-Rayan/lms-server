const { Schema, model } = require("mongoose");

const episodeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  number: {
    type: number,
  },
  videlURL: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

courseSchema.plugin(timeStamps);

const Episode = model("Episode", episodeSchema);

module.exports = Episode;
