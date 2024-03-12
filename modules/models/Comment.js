const {Schema, model} = require("mongoose");
const timestamps = require("mongoose-timestamp");

const commentSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    user:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
})


commentSchema.plugin(timestamps);

const Comment = model("Comment", commentSchema);

module.exports = Comment;