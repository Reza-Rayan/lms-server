const Course = require("../../../models/Course");
const User = require("../../../models/User");

class CourseController {
  async create(req, res) {
    try {
      const { title, description, imageBanner, price, teacher } = req.body;

      const newCourse = new Course({
        title,
        description,
        imageBanner,
        price,
        teacher,
      });

      const course = await newCourse.save();
      console.log(course);
      return res.status(200).json({
        success: true,
        message: "دوره جدید ساخته شد",
        course,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal Error in Server.",
      });
    }
  }
}

module.exports = new CourseController();
