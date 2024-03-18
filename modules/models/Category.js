const {Schema,model} = require("mongoose");
const timestamps = require("mongoose-timestamp");


const categorySchema = new Schema({
    title:{
        type: String,
        required: true
    },
    mother:{
        type: String,
        default:" "
    },
    courses:[{
        type: Schema.Types.ObjectId,
        ref:"Course"
    }]
});


categorySchema.plugin(timestamps);



const Category = model("Category", categorySchema);

module.exports = Category;