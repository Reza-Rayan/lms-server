const Comment = require(`${config.path.models}/Comment`);
const Course = require(`${config.path.models}/Course`);
const User = require(`${config.path.models}/User`);

class  CommentControllers{
    async create(req,res){
        try {
            const {description}= req.body
            const courseId = req.param.selectedCourseid;
            const userId = req.param.selectedUserId;
            const course = await  Course.findOne({courseId});
            const user = await  User.findOne({userId});
            // Check course exists
            if(!course){
                return  res.status(404).json({
                    success: false,
                    message:"دوره مورد نظر یافت نشد"
                })
            }
            // Save Comment
            const comment  = new Comment({description,user:user._id});
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