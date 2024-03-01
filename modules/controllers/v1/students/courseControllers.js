class CourseControllers{
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
}



module.exports = new CourseControllers()
