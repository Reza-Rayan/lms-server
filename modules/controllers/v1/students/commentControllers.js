const Comment = require(`${config.path.models}/Comment`);
const Course = require(`${config.path.models}/Course`);

class  CommentControllers{
    async create(req,res){
        try {
            const {name,description}= req.body
            const courseId = req.param.id;
            const course = await  Course.findOne({courseId});
            // Check course exists
            if(!course){
                return  res.status(404).json({
                    success: false,
                    message:"دوره مورد نظر یافت نشد"
                })
            }
            // Save Comment
            const comment  = new Comment({name,description});
            await  comment.save();
            // push comment in Course
            await  Course.findOneAndUpdate(
                { courseId },
                { $push: { comments: comment._id } }
            )

            return  res.status(200).json({
                success: true,
                message:"کامنت با موفقیت ارسال شد",
                comment
            })


        }catch (error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message:"Internal Error in Server"
            })
        }
    }
}


module.exports = new CommentControllers()