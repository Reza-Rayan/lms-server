const {Schema, model} = require("mongoose");
const timestamps = require("mongoose-timestamp");

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    User: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})


commentSchema.plugin(timestamps);

const Comment = model("Comment", commentSchema);

module.exports = Comment;