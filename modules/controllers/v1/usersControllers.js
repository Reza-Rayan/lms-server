const User = require("../../models/user");

class UsersControllers {
  async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({ username, email, password });

      // Check User Exist
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(401).json({
          success: false,
          message: "این ایمیل حساب  دارد",
        });
      }
      const user = await newUser.save();
      return res.status(200).json({
        success: true,
        message: "ثبت نام موفقیت آمیز بود",
        user,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "There is an Error in Server" });
    }
  }
}

module.exports = new UsersControllers();
