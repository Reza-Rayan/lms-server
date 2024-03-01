const Course = require("../../../models/Course")


class CourseControllers{
  // @GET all controllers
    async index(req, res) {
        try {
          const courses = await Course.find();
          console.log(courses);
          if (!courses) {
            return res.status(404).json({
              success: false,
              message: "هیچ دوره ای وجود ندارد",
            });
          }

          res.status(200).json({
            success: true,
            courses,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Internal Error in Server",
          });
        }
      }

      async signle(req,res){
        try {
          const courseId = req.params.id
          const course = await Course.findById(courseId)

          if(!course){
            return res.status(404).json({
              success: false,
              message:"دوره مورد نظر یافت نشد"
            })
          }


        return res.status(200).json({
          success: true,
          course
        })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
              success: false,
              message:"Internal Error in Server"
            })
        }
      }
}



module.exports = new CourseControllers()
