const Course = require(`${config.path.models}/Course`);
const { courseSchema } = require(`${config.path.validation}/courseValidation`);

class CourseController {
  // @POST create course
  async create(req, res) {
    try {
      const { title, description, price, teacher } = req.body;

      // Check if file was uploaded
      if (!req.file) {
        return res.status(404).json({
          success: false,
          message: "عکس دوره آپلود نشده است",
        });
      }

      // Validate input using yup schema
      try {
        await courseSchema.validate(
          {
            title,
            description,
            price,
            teacher,
          },
          { abortEarly: false }
        );
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.errors,
        });
      }

      const existCourse = await Course.findOne({ title });
      if (existCourse) {
        return res.status(400).json({
          success: false,
          message: "این دوره با این نام قبلا بارگذاری شده است",
        });
      }

      // Upload Banner
      const imageBannerURL = `http://localhost:5000/${req.file.path}`;
      const newCourse = new Course({
        title,
        description,
        price,
        teacher,
        banner: imageBannerURL,
      });

      const course = await newCourse.save();
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

  // @DELETE remove course
  async destroy(req, res) {
    try {
      const courseId = req.params.id;
      const course = await Course.findByIdAndDelete(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "دوره مورد نظر یافت نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "دوره مورد نظر حذف شد",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Error in Server",
      });
    }
  }

  async update(req, res) {
    try {
      const { title, description, imageBanner, price } = req.body;
      const courseId = req.params.id;
      await Course.findByIdAndUpdate(courseId, {
        title,
        description,
        imageBanner,
        price,
      });

      if (!courseId) {
        return res.status(404).json({
          success: false,
          message: "دوره مورد نظر یافت نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "دوره مورد نظر آپدیت شد",
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
