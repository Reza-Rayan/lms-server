const Episode = require(`${config.path.models}/Episode`);
const Course = require(`${config.path.models}/Course`);

class EpisodeController {
  //   Create New Episode
  async create(req, res) {
    try {
      const { title, description, number, videlURL, course } = req.body;

      //   Find Course
      const courseId = req.params.courseId;
      const RelatedCourse = await Course.findById(courseId);

      const newEpisode = new Episode({
        title,
        description,
        number,
        videlURL,
        course: RelatedCourse._id,
      });

      const episode = await newEpisode.save();

      if (!RelatedCourse) {
        return res.status(200).json({
          success: false,
          message: "دوره مورد نظر یافت نشد",
        });
      }
      // Push Episode to Course
      await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { episodes: episode._id } }
      );

      return res.status(200).json({
        success: true,
        episode,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Error in Server" });
    }
  }

  // Update Episode
  async update(req, res) {
    try {
      const { title, description, number, videlURL } = req.body;
      const episodeId = req.params.episodeId;
      console.log(episodeId);
      const episode = await Episode.findOneAndUpdate(episodeId, {
        title,
        description,
        number,
        videlURL,
      });
      return res.status(200).json({
        success: true,
        message: "آپدیت قسمت انجام شد",
        episode,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Error in Server" });
    }
  }
  async delete(req, res) {}
}
module.exports = new EpisodeController();
