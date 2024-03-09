const Episode = require(`${config.path.models}/Episode`);

class EpisodeController {
  async single(req, res) {
    try {
      const episodeId = req.params.episodeId;

      const episode = await Episode.findById(episodeId);

      if (!episode) {
        return res.status(404).json({
          success: false,
          message: "اپیزود مورد نظر یافت نشد",
        });
      }

      return res.status().json({
        success: true,
        episode,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Error in Server",
      });
    }
  }
}

module.exports = new EpisodeController();
