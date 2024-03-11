const { Schema, model } = require("mongoose");
const timeStamps = require("mongoose-timestamp");

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
    type: Number,
  },
  videoURL: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

episodeSchema.plugin(timeStamps);

const Episode = model("Episode", episodeSchema);

module.exports = Episode;
